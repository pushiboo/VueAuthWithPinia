const path = require('node:path');
const jwt = require('jsonwebtoken'); 
const mySecret = process.env.JWT_SECRET
const secret = new TextEncoder().encode(
  mySecret,
)
const data = {
  name: 'hummel',
  email: 'hi@hi.de'
}
const token = ''
const createToken = (data) => {
  // jwt.sign({user id / Payload}, 'the secret we are adding to the token', { additional condition like here a expire date})
  // const token = jwt.sign({ id: id }, privateKey )
  console.log("data", data.email);
  // var token = jwt.sign({ foo: 'bar' }, 'shhhhh');
  const token = jwt.sign({ email: data.email }, 'privateKey' )
  console.log("TOKEN:", token);
  
  return token
}

createToken(data)

console.log("secret",secret);


console.log(path.basename(__filename));
