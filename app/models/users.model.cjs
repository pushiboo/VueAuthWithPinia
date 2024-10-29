/* eslint-disable no-undef */
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

// Create your Schema for your User, and how it should look like and which properties it should have
module.exports = mongoose => {
  const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please enter an username'],
      unique: [true, 'This username is already in use, please try again']
    },
    email: {
      type: String,
      required: [true, 'Please enter an email'],
      unique: true,
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']
    },
    password: {
      type: String,
      required: [ true, 'Please enter an password' ],
      minlength: [ 6, 'Minimum password length is 6 charaters' ]
    },
    created: Date,
    lastActiveAt: Date,
    lastUpdated: Date,
    lastValidated: Date
  })
  // mongoose hooks II
  // fire a function before doc saved to db
  // To hash the password we need here bcrypt 
  userSchema.pre('save', async function (next) {

    // creating the hash before we saving the password to the database with a mongoose hook
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
  })
  // mongoose hook I
  // fire a function after doc saved to db
  userSchema.post('save', function (doc, next) {
    console.log("users.model.js UserSchema.post | INFO: New user created & saved to db")
    next()
  })
  // static method to login user
  userSchema.statics.login = async function( email, password ) {
    console.log("users.model.js | INFO: Checking validate login date:", email, password)
    const user = await this.findOne({email})
    // console.log("users.model.js UserSchema.login | SUCCESS: User data matched successfully")
    if (user) {
      console.log("users.model.js UserSchema.login | user:", user)
      const auth = await bcrypt.compare( password, user.password)
      console.log("users.model.js UserSchema.login | SUCCESS: User data matched successfully")
      if (auth) {
        return user
      }
      throw Error('users.model.js UserSchema.login | ERROR: Incorrect password')
    }
    throw Error('users.model.js UserSchema.login | ERROR: Incorrect email')
  }

  // The the 'user# is important, because mongoose makes under the hood automatically a plural out of the user to users.
  // This mean if our document in the db is called cars then we have to use 'car' the singular
  const User = mongoose.model('user', userSchema)

  return User 
}
