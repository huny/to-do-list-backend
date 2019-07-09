const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const secretKey = 'someVeryRandomStringThatNobodyCanGuess';
const logger = require('./loggerLib')


let generateToken = (data, cb) => {

  try {
    let claims = {
      jwtid: shortid.generate(),
      iat: Date.now(),
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      sub: 'authToken',
      iss: 'edChat',
      data: data
    }
    let tokenDetails = {
      token: jwt.sign(claims, secretKey),
      tokenSecret: secretKey
    }
    cb(null, tokenDetails)
  } catch (err) {
    cb(err, null)
  }
}// end generate token 

let verifyClaim = (token, secretKey, cb) => {
  // verify a token symmetric
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      logger.error('error while verify token', 'tokenLib: verifyClaim', 10);
      cb(err, null)
    }
    else {
      cb(null, decoded);
    }


  });


}// end verify claim 

let verifyClaimWithoutSecret = (token, cb) => {
  // verify a token symmetric
  jwt.verify(token, secretKey, function (err, decoded) {
    if (err) {
      logger.error('error while verify token', 'tokenLib: verifyClaimWithoutSecret', 10);
      cb(err, null)
    }
    else {
      cb(null, decoded)
    }


  });

}// end verify claim without secret

module.exports = {
  generateToken: generateToken,
  verifyToken: verifyClaim,
  verifyClaimWithoutSecret: verifyClaimWithoutSecret
}
