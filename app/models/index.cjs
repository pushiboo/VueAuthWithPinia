const dbConfig = require("../config/db.config.cjs")
const mongoose = require("mongoose")

mongoose.Promise = global.Promise

const db = {};
db.mongoose = mongoose
db.url = dbConfig.url
db.users = require("./users.model.cjs")(mongoose)

module.exports = db