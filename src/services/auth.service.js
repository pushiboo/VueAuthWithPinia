import http from '../http-axios.js'

class AuthServices {
  login_get() {
    return http.get('/auth' , { withCredentials: true } )
  }
  login_post(data) {
    // return http.post('/auth/login', data)
    return http.post('/auth/login', data, { withCredentials: true }) 
  }
  signin_post(data) {
    return http.post('/auth/signin ', data , { withCredentials: true })
  }
  logout_delete() {
    return http.get('/auth/logout', { withCredentials: true })
  }
}

export default AuthServices