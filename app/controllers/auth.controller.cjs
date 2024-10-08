/* eslint-disable no-undef */
const db = require("../models/index.cjs")
const Users = db.users
const jwt = require('jsonwebtoken'); 
const fs = require('fs');
const path = require('path');
const maxAge = 3 * 60 * 60;
const privateKeyPath = path.join(__dirname, '..' , 'config/', 'private.key')
const privateKey = fs.readFileSync( privateKeyPath, { encoding: 'utf8', flag: 'r' });
const cookieName = 'andreasplichta'


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email

  if (err.message.includes('Incorrect email')) {
    errors.email = 'This user does not exist';
    console.log("auth.contorller.js | handleErrors errors.email", errors.email)
  } 
  // incorrect password
  if (err.message.includes('Incorrect password')) {
    errors.password = 'Mismatch with your stored password';
    console.log("auth.contorller.js | handleErrors errors.password", errors.password)
  } 
  // duplicate email or username error validated by error code 11000
  if (err.code === 11000) {
    if(err.keyValue.email) {
      console.log("err.Dublicate EMail", err.keyValue.email )
      errors.email = "This E-Mail is already registered"
      console.log("auth.contorller.js | handleErrors err.keyValue.email", err.keyValue.email)
    } else if (err.keyValue.username) {
      console.log("err.Dublicate Username", err.keyValue.username )
      errors.email = "This Username is already in use"
      console.log("auth.contorller.js | handleErrors err.keyValue.email", err.keyValue.username)
    } else {
      errors.email = "Some unexpected required input is missing"
      console.log("auth.contorller.js | handleErrors err.keyValue.email", err.keyValue.email)
    }
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {

      errors[properties.path] = properties.message;
    });
  } 
  if (err.message.includes('invalid signature')) {
    Object.values(err.errors).forEach(({ properties }) => {

      errors[properties.path] = properties.message;
    });
  }

  return errors;
}

// create json web token
const createToken = (id) => {
  // jwt.sign({user id / Payload}, 'the secret we are adding to the token', { additional condition like here a expire date})
  const token = jwt.sign({ id: id }, privateKey )

  return token
}

// callback functions
module.exports.login_get = (req, res, next) => {
  if(!req.rawHeaders.includes("Cookie")) {
    console.log("auth.controller.login_get() | INFO: No cookies in rawHeaders!")
    res.status(200).json({ userCookie: null })
    res.end()
  }
  try {
    let acctualCookieName = 'andreasplichta'
    let userCookie = null
    
    req.rawHeaders.map(cookie => {
      
      if( cookie.includes("andreasplichta") ) {
        userCookie = cookie.split(";")
          .filter(ent => ent.includes(acctualCookieName))
          .toString()
          .replace(acctualCookieName + "=", "")
          .trim()
        
        jwt.verify(userCookie, privateKey, (err, decodedToken) => {
          if(err) {
            console.log("auth.controller.login_get() | ERROR: occured during verification of the jwt token:", err.message)
            return next()
          } else {
            console.log("auth.controller.login_get() | SUCCESS: Cookie transmitted")
            console.log("auth.controller.login_get() | SUCCESS:  userCookie, user: decodedToken.id, timestamp: decodedToken.iat", userCookie, decodedToken.id, decodedToken.iat)
            res.status(200).json({ userCookie, user: decodedToken.id, timestamp: decodedToken.iat })
            res.end()
          }
        })
      }
      /* return res.end() */
    })
  }
  catch (err) {
    console.log("auth.controller.login_get() | ERROR: put into handleErrors()")
    const errors = handleErrors(err)
    res.status(401).json({ errors });
    res.end()
  }
}
module.exports.login_post = async (req, res) => {
  if(!req.body.email) {
    res.status(407).send({ message: "auth.controller.login_post() | ERROR: Content can not be empty!"})
    res.end()
  }
  
  const { username, password } = req.body;
  try {
    const user = await Users.login(username, password)
    const token = createToken(user._id)

    res.cookie('andreasplichta', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 })
    res.status(200).json({ user: user._id, username: user.username, role: user.role, token })
    res.end()
    console.log("auth.controller.login_post() | SUCCESS: User login successfull")
  } catch (err) {
    
    const errors = handleErrors(err)
    console.log("err.message", err)
    res.status(400).json({ errors });
/*     if (err.message.includes('Incorrect password')) {
      errors.password = 'that password is incorrect';
      console.log("errors.password", errors.password)
    }  */
    console.log("auth.controller.login_post() | ERROR: Put into handleErrors", errors)
    
    res.end()
  }
}
module.exports.signin_post = async (req, res) => {
  
  const token = createToken(req.body.email)
  
  const user = new Users({
    username: req.body.username,
    forename: req.body.forename,
    surname: req.body.surname,
    email: req.body.email,
    password: req.body.password,
    active: req.body.active,
    "ad-account": req.body['ad-account'],
    role: req.body.role,
    "function-role": req.body['function-role'],
    "api-token": token,
    additional: req.body.additional,
    created: req.body.created,
    lastActiveAt: req.body.lastActiveAt
  })

  user
    .save(user)
    .then(data => {
      /* Create a secure version of the token */
      const token = createToken(data._id)

      res.cookie('andreasplichta', token, { httpOnly: true, maxAge: maxAge * 1000 }) 
      res.status(200).json({ user: user._id, username: user.username, role: user.role, token })
      console.log("auth.controller.signin_post() | SUCCESS: User signed in successfully: data",data)
      res.end()
    })
    .catch(err => {
      const errors = handleErrors(err)
      res.status(500).json({ errors })
      console.log("auth.controller.signin_post() | ERROR: During create cookie process", errors)
    })
}
module.exports.logout_delete = (req, res) => {
  if(!req.rawHeaders.includes("Cookie")) {
    /* console.log("auth.controller.logout_delete() | INFO: No cookies in rawHeaders!") */

    return res.end()
  }
  try {
    req.rawHeaders.map(cookie => {
      if( cookie.includes(cookieName) ) {
        userCookie = cookie.split(";")
          .filter(ent => ent.includes(cookieName))
          .toString()
          .trim()
      
        res.clearCookie(userCookie)
        res.end()
        console.log("auth.controller.logout_delete() | SUCCESS: User logout successfully")
      }
    })
  } catch (err) {
    console.log("auth.controller.logout_delete() | ERROR: Put into handleErrors")
    const errors = handleErrors(err)
    res.status(400).json({ errors })
    res.end()
  }
}