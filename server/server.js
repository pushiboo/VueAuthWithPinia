// 1) Import required modules
const express = require('express')
const bodyParser = require('bodyParser')
const cors = require('cors')

// 2) Create am instance of express
const app = express()

// 3) Middleware setup
app.use(bodyParser.json())
app.use(cors())

// 4) Server port 
const port = process.env.PORT || 3001 

// 5) Start the server
app.listen(port, () => {
  console.log(`Server is up and uses port ${port}`)
})