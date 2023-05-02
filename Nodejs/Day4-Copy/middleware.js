
// Importing the 'jsonwebtoken' library
const jwt = require('jsonwebtoken')

const secret = 'mysecret'  // Set the secret key used for signing and verifying tokens

// function to verify JWT token
verifyToken = (req, res, next)=>{
  // Check if the Authorization header is present in the request
  if (!req.headers['authorization']) 
    return next(createError(401, 'Unauthorized'))
  
  // Extract the token from the Authorization header
  const token = req.headers.authorization
  // Verify the token using the 'jwt.verify' method
  jwt.verify(token, secret, (err, user)=>{
    if (err){   // If there is an error verifying the token, return an error
      return next(createError(createError, 'Unauthorized'))
    }
    // If the token is valid, set the 'req.user' property to the decoded user object and call the next middleware function
    req.user = user
    next()
  })
}


// function to verify JWT token and set 'req.user' property
module.exports.verifyToken = (req, res, next)=>{
  const authheader = req.headers.authorization;
  if (authheader){
    // Extract the token from the Authorization header
    //const token = authheader.split(' ')[1]
    // Verify the token using the 'jwt.verify' method
    jwt.verify(authheader, secretkey, (err, user)=>{
        // If there is an error verifying the token, return an error
      if (err){
        return res.sendStatus(403)
      }
      // If the token is valid, set the 'req.user' property to the decoded user object and call the next middleware function
      req.user = user
      next()
    })
  } else {
    // If there is no Authorization header in the request, return an error
    res.sendStatus(401)
  }
}