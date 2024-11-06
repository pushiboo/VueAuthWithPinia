/* eslint-disable no-undef */
const db = require("../models/index.cjs")
const Users = db.users
const jose = require('jose')
const maxAge = 3 * 60 * 60;
const cookieName = 'andreasplichta'
const websiteName = `www.${cookieName}.de`
const mySecret = process.env.JWT_SECRET
const secret = new TextEncoder().encode(mySecret)
const alg = 'HS256'


const handleErrors = (err) => {
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
  const token = await new jose.SignJWT(data)
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer(`urn:${data.site}:${data.email}`)
  .setExpirationTime('2h')
  .sign(secret)
  
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
    let userCookie = ''
    req.rawHeaders.map(cookie => {
      if(cookie.includes(cookieName) ) {
        userCookie = cookie.split(";")
          .filter(ent => ent.includes(cookieName))
          .toString()
          .replace(cookieName + "=", "")
          .trim()

        const decodetToken = jose.decodeJwt(userCookie)
        if(decodetToken) {
          console.log("auth.controller.login_get() | SUCCESS: valid user token")
        }
        res.status(200).json({ decodetToken })
        res.end()
      } 
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
    const token = await createToken({site: websiteName, email: user.email})
    res.cookie('andreasplichta', token, { httpOnly: true, maxAge: maxAge * 1000 })
    res.status(200).json({ id: user._id,  user: user.name, email: user.email, role: user.role, "api-token": token })
    res.end()
    console.log("auth.controller.login_post() | SUCCESS: User login successfull")
  } catch (err) {
    
    const errors = handleErrors(err)
    if (err.message.includes('Incorrect password')) {
      errors.password = 'that password is incorrect';
      console.log("errors.password", errors.password)
    }
    res.status(400).json({ errors })
    console.log("auth.controller.login_post() | ERROR: Put into handleErrors", errors)
    res.end()
  }
}
module.exports.signin_post = async (req, res) => {
  const token = await createToken({site: websiteName, email: req.body.email})
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
      user["api-token"] = token
      res.cookie(cookieName, token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(200).json({ name: user.name, email: user.email, role: user.role, "api-token": token })
      console.log("auth.controller.signin_post() | SUCCESS: User signed in successfully: data",data)
      res.end()
    })
    .catch(err => {
      const errors = handleErrors(err)
      res.status(500).json({ errors })
      console.log("auth.controller.signin_post() | ERROR: During create cookie process", errors)
      res.end()
    })
}
module.exports.logout_delete = (req, res) => {
  if(!req.rawHeaders.includes("Cookie")) {
    console.log("auth.controller.logout_delete() | INFO: No cookies in rawHeaders!") 
    return res.end()
  }
  try {
    req.rawHeaders.map(cookie => {
      if( cookie.includes(cookieName) ) {
        userCookie = cookie.split(";")
          .filter(ent => ent.includes(cookieName))
          .toString()
          .trim()

        res.clearCookie(cookieName)
        res.send('cookie cleared')
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