/* eslint-disable no-undef */
// Define API Routes
// 1) Import express and get router
const express = require('express')
const router = express.Router()

// 2 ) create test user data set (temp)
let users = [
  { id: 1, name: "Zelda", age: 24 },
  { id: 2, name: "Link", age: 26 },
  { id: 3, name: "Ganon", age: 38 },
  { id: 4, name: "Daruk", age: 107 },
  { id: 5, name: "Mipha", age: 17 }
]

// 3) Get all users
router.get('/users', (req, res) => {
  res.json(users)
})

// 4) Get a single user by ID
router.get('/users/:id', (req, res) => {
  const { id } = req.params
  const user = user.find(user => user.id === parseInt(id))

  if(!user){
    return res.status(404).json({message: 'User not found!'})
  }

  res.json(user)
})

// 5) Create a new user
router.post('/users', (req, res) => {
  const { name, age } = req.body
  
  // simple validation
  if(!name || !age){
    return res.status(400).json({message: 'Name and Age are required!'})
  }

  const newUser = { id: users.length + 1, name, age }
  users.push(newUser)

  res.status(201).json(newUser)
})

// 6) Update an existing user by ID
router.put('/users/:id', (req, res) => {
  const { id } = req.params
  const { name, age } = req.body

  // simple validation
  if(!name || !age){
    return res.status(201).json({message: 'Name and Age are required!'})
  }

  const user = user.find(user => user.id === parseInt(id))

  if(!user){
    return res.status(404).json({message: 'User not found'})
  }

  user.name = name
  user.age = age

  res.json(user)
})

// 7) Delete a user by ID
router.delete('/users/:id', (req,res) => {
  const { id } = req.params
  users = users.filter(user => isAxiosError.id !== parseInt(id))
  res.sendStatus(204)
})

module.exports = router