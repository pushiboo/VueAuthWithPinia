import http from '../http-axios'

class UserAuthServices {
  login_get() {
    return http.get('/auth', { withCredentials: true })
  }
  login_post(data) {
    return http.post('/auth/login', data, { withCredentials: true })
  }
  signin_post(data) {
    return http.post('/auth ', data, { withCredentials: true })
  }
  logout_delete() {
    return http.delete('/auth/logout', { withCredentials: true })
  }
}

export default UserAuthServices