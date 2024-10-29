const db = require("../models/index.cjs")
const path = require('node:path');
const Users = db.users
const filename = path.basename(__filename)
console.log("filename", filename);

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if(!req.body.email) {
    res.status(407).send({ message: "user.controller.create() | ERROR: Content can not be empty!"})
    console.log("res", res.body, "req", req.body)
    return
  }

  // Create a User
  const user = new Users({
    name: req.body.name,
    age: req.body.age,
    email: req.body.email,
    password: req.body.password,
    created: req.body.created,
    lastActiveAt: req.body.lastActiveAt
  })

  // Save Users in the database
  user
    .save(user)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        /* message: `Oh no! ${err}` */
        message:
        err.message || "user.controller.create() | ERROR: occured while creating the Users!"
      })
      console.log("user.controller.create() | ERROR: Something went wrong!", err.message)
    })
}

// Retrieve all Userss from the database
exports.findAll = (req, res) => {
  const username = req.query.username
  let condition = username ? { username: { $regex: new RegExp(username), $options: "i"} } : {}
  
  Users.find(condition)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "user.controller.findAll() | ERROR: occured while retrieving users."
      })
    })
}

// Find a single Users with an id
exports.findOne = (req, res) => {
  const id = req.params.id
  console.log("findOne id:", id);
  

  // Users.findById(id)
  Users.find({email: id})
    .then(data => {
      if(!data)
        res.status(404).send({ message: "user.controller.findOne() | INFO: Users with id:" + id + "not found!"})
      else res.send(data)
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "user.controller.findOne() | ERROR: retrieving Users with id=" + id })
      console.log("user.controller.findOne() | ERROR: err.message:", err)
    })
}

// Find a single Users with an email
exports.findEmail = (req, res) => {
  const email = req.params.email
  console.log("req.params", req.params.email);

  // Users.find({email: email})
  //   .then(data => {
  //     res.send(data)
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: 
  //         err.message || "user.controller.findAllPublished() | Error: occured while retrieving users"
  //     })
  //   })
  // Users.findByEmail()
  //   .then(data => {
  //     if(!data)
  //       res.status(404).send({ message: "user.controller.findOne() | INFO: Users with email:" + email + "not found!"})
  //     else 
  //       console.log("data___",data);
  //       res.send(data)
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .send({ message: "user.controller.findOne() | ERROR: retrieving Users with email=" + email })
  //     console.log("user.controller.findOne() | ERROR: err.message:", err)
  //   })
}

// Update a Users by the id in the request
exports.update = (req, res) => {
  if(!req.body){
    return res.status(400).send({
      message: "user.controller.update() | ERROR: Data to update can not be empty!"
    })
  }

  const id = req.params.id

  Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if(!data) {
        res.status(404).send({
          messsage: `user.controller.update() | ERROR: Cannot update Users with id=${id}. Maybe Users was not found! `
        })
      } else res.send({ message: "user.controller.update() | INFO: Users was updated successfully."})
    })
    .catch(err => {
      res.status(500).send({
        message: "user.controller.update() | ERROR: updating Users with id=" + id
      })
      console.log("user.controller.update() | ERROR: err.message:", err)
    })
}

// Delete a Users with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id

  Users.findByIdAndDelete(id)
    .then(data => {
      if(!data){
        res.status(404).send({
          message: `user.controller.delete() | ERROR: Cannot delete Users with id=${id}. Maybe Users was not found!`
        })
      }else {
        res.send({
          message: "user.controller.delete() | SUCCESS: Users was delete successfully!"
        })
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "user.controller.delete() | ERROR: Could not delete Users with id=" + id
      })
      console.log("user.controller.delete() | ERROR: err.message:", err)
    })
}

// Delete all Users from the database
exports.deleteAll = (req, res) => {
  Users.deleteMany({})
    .then(data => {
      res.send({
        message: `user.controller.deleteAll() | SUCCESS: ${data.deletedCount} Userss were deleted successfully!`
      })
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "user.controller.deleteAll() | ERROR: occured while removing all users."
      })
    })
}

// Find all published Userss
exports.findAllPublished = (req, res) => {
  Users.find({ published: true })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: 
          err.message || "user.controller.findAllPublished() | Error: occured while retrieving users"
      })
    })
}
