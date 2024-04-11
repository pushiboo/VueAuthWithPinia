import http from '../http-axios.js'

class UserServices {
  getAll() {
    return http.get('/users')
  }
}

export default UserServices