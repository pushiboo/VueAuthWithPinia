import http from '../http-axios.js'

class UserServices {
  getAll() {
    return http.get('/users')
  }
  findByEmail(email) {
    return http.get('/users/email')
    // return http.get(`/users/${email}`)
  }
  // get(email) {
  //   return http.get(`/users/${email}`)
  // }
  create(data) {
    return http.post("/users", data)
  }
  update(id, data) {
    return http.put(`/users/${id}`, data)
  }
  delete(id) {
    return http.delete(`/users/${id}`)
  }
  // findByUsername(username) {
  //   return http.get(`/users/search?username=${username}`)
  // }
  // findById(id) {
  //   return http.get(`/users/${id}`)
  // }

}

export default UserServices