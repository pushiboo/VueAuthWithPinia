// 1) Import required modules
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require("../app/models/index.cjs")
// 2) Create am instance of express
const app = express()

// 3) Middleware setup
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

let corsOptions = {
  origin: "http://localhost:5173",
/*   credentials: true, */
  exposedHeaders: ["set-cookie"],
}


app.use(cors(corsOptions))

db.mongoose
  .connect(db.url)
  .then(() => {
    console.log("Connected to the database!")
  })
  .catch(err => {
    console.log("cannot connected to the database!", err)
    process.exit()
  })

require("../app/routes/users.routes.cjs")(app)
require("../app/routes/auth.routes.cjs")(app)
/* var httpServer = http.createServer(app); */
/* var httpServer = http.createServer(app); */

// set port, listen for requests
const PORT = process.env.PORT || 3002
app.listen(PORT, () => {
  console.log(`Server is up and uses port ${PORT}.`)
})

// 4) Server port 
/* const port = process.env.PORT || 3002 
 */
// 6) Import the users routes
/* const usersRoutes = require('../app/routes/users.routes.cjs') */

// 7) Use the user routes
/* app.use('/api', usersRoutes) */

// 5) Start the server
/* app.listen(port, () => {
  console.log(`Server is up and uses port ${port}`)
}) */