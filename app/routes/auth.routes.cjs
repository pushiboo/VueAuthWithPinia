/* eslint-disable no-undef */
module.exports = app => {
  const auth = require("../controllers/auth.controller")


  let router = require("express").Router()
  // Get User information
 /*  router.get('/signin', auth.signin_get); */
  // Get and validate User
  router.get('/', auth.login_get);
  // Signin User 
  router.post('/', auth.signin_post);
  // Login User 
  router.post('/login', auth.login_post)
  // Logout User and delete cookies
  router.delete('/logout', auth.logout_delete);
/*   router.delete('/:token', auth.logout_get)  */
  
  // app use router
  app.use('/api/auth', router)
}