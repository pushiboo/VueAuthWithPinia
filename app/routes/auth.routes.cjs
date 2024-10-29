/* eslint-disable no-undef */
module.exports = app => {
  const auth = require("../controllers/auth.controller.cjs")


  let router = require("express").Router()
  // Get and validate User
  router.get('/', auth.login_get);
  // Login User 
  router.post('/login', auth.login_post)
  // Signin User 
  router.post('/signin', auth.signin_post);
  // Logout User and delete cookies
  router.delete('/logout', auth.logout_delete);

  // app use router
  app.use('/api/auth', router)
}