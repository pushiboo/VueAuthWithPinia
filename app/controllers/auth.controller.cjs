/* eslint-disable no-undef */
const db = require("../models/index.cjs")
const Users = db.users
const jwt = require('jsonwebtoken'); 
const jose = require('jose')
const fs = require('fs');
const path = require('path');
// const { data } = require("autoprefixer");
const maxAge = 3 * 60 * 60;
const privateKeyPath = path.join(__dirname, '..' , 'config/', 'private.key')
const privateKey = fs.readFileSync( privateKeyPath, { encoding: 'utf8', flag: 'r' });
const cookieName = 'andreasplichta'
const mySecret = process.env.JWT_SECRET
const secret = new TextEncoder().encode(mySecret)
// const data = {}
const alg = 'HS256'

// data.push({site: 'andreasplichta.de'})
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
const createToken = async (data) => {
  // jwt.sign({user id / Payload}, 'the secret we are adding to the token', { additional condition like here a expire date})
  // const token = jwt.sign({ id: id }, privateKey )
  // const token = jwt.sign({ id: id }, privateKey )
  // console.log("JWT_SECRET", secret);
  
  const token = await new jose.SignJWT(data)
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer(`urn:${data.site}:${data.email}`)
  .setExpirationTime('2h')
  .sign(secret)
  console.log("token:", token);
  

  return token
}

// callback functions
// Check if user
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
  
  const { email, password } = req.body  
  try {
    const user = await Users.login(email, password)
    console.log("Await User ID:", user._id)
    console.log("Await User EMAIL:", user.email)
    
    const token = createToken({email: user.email})
    res.cookie('andreasplichta', token, { httpOnly: true, maxAge: maxAge * 1000 })
    // Https settings
    // res.cookie('andreasplichta', token, { httpOnly: true, secure: true, maxAge: maxAge * 1000 })
    res.status(200).json({ id: user._id,  user: user.name, email: user.email, role: user.role, "api-token": token })
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
  console.log("request::", req.body.email)
  // const token = createToken(req.body.email)
  // console.log("token::", token)
  
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: 'Dev',
    "api-token": ''
  })

  user
    .save(user)
    .then(data => {
      /* Create a secure version of the token */
      const token = createToken({email: user.email})
      user["api-token"] = token
      // res.cookie()
      res.cookie(cookieName, token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(200).json({ name: user.name, email: user.email, role: user.role, "api-token": token })
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