/* eslint-disable no-undef */
const jwt = require('jsonwebtoken')
const User = require('../models/users.model.cjs')

// check if the user token is valid
const requireAuth = ( req, res, next ) => {
  const token = req.cookies.jwt
  if(token) {
    jwt.verify(token, 'andreasplichta', (err, decodeToken) => {
      if(err) {
        console.log("authMiddleWare.js requireAuth | ERROR: occured during verification of the jwt token", err.message)
        res.redirect('/login')
      } else {
        console.log("decodedToken", decodeToken)
        next()
      }
    })
  }
  else {
    res.redirect('/login')
  }
}

// check the current user
const checkUser = ( req, res, next ) => {
  const token = req.cookie.jwt

  if(token) {
    /* jwt.verify(token, 'Pus#HardC0r3Tok3n', async (err, decodeToken) => { */
    jwt.verify(token, 'andreasplichta', async (err, decodeToken) => {
      if(err) {
        console.log("authMiddleWare.js checkUser | ERROR: occured during verification of the jwt token!", err.message)
        res.locals.user = null
        next()
      } else {
        console.log("authMiddleWare.js checkUser | INFO: Validating decodedToken.", decodeToken)
        let user = await User.findById(decodeToken.id)
        res.locals.user = user
        console.log('authMiddleWare.js checkUser | SUCCESS: User toke was successfully validated.:', res.locals.user.email)
        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

/* export { requireAuth, checkUser } */
module.exports = { requireAuth, checkUser }