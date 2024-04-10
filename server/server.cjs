// 1) Import required modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// 2) Create am instance of express
const app = express()

// 3) Middleware setup
app.use(bodyParser.json())
app.use(cors())

// 4) Server port 
const port = process.env.PORT || 3002 

// 6) Import the users routes
const usersRoutes = require('../app/routes/users.routes.cjs')

// 7) Use the user routes
app.use('/api', usersRoutes)

// 5) Start the server
app.listen(port, () => {
  console.log(`Server is up and uses port ${port}`)
})