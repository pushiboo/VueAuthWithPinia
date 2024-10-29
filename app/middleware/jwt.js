import * as jose from 'jose'
import * as db from '../models/index.cjs'

const Users = db.users
console.log("Users");

const data = {
  site: 'andreasplichta.de',
  name: 'tam',
  email: 'tam@tam.de',
  password: 'tamtam'
}

const getUser = async (user, passwd) => {
  try { 
    const us = await Users.login(user, passwd)
    console.log("us:", us)
  }
  catch (error) {
    console.log('Error:', error)
  }
}
const res = await getUser(data.email, data.password)
console.log("RES:", res);

const createToken = async (data) => {

  const secret = new TextEncoder().encode(data.email)
  const alg = 'HS256'
  
  const jwt = await new jose.SignJWT(data)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer(`urn:${data.site}:${data.email}`)
    .setExpirationTime('2h')
    .sign(secret)
    // console.log(jwt);
    
    return jwt
}



createToken(data)

const toke = await createToken(data)
console.log('toke:',toke)
const sec = jose.decodeJwt(toke)
console.log('secret:',sec)
