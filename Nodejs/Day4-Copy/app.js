const express = require ("express");  
//importing express framework and assigning it to a constant variable named express, 
// that holds a refrenece to the actual express framework

const userModel = require("./mongodb");
const { MongoClient, ObjectId } = require("mongodb");

const app=express();  //intitating express framework
app.use(express.json()) //help to acess incoming j-son objects as a readable input


const jwt = require('jsonwebtoken')
const secretkey = 'mysecret'   //constant variable secretkey is defined and assigned a string value 'mysecret'. 


// Defining middleware function to verify token
const verifyToken = (req,res,next)=>{
  const authorHeader = req.headers.authorization; //Check if authorization header is present in request

  if (authorHeader) {                       // If authorization header is present, extract token from it
    const token = authorHeader.split(" ")[1];
    jwt.verify(token, secretkey, (err,user)=>{   // Verify token using the secret key
      if (err){
        return res.send("Token Invalid");       // If there an error in verifying token send "Token Invalid" response
      }
      req.user = user;        // If token is valid, set the user property on the request object
      next();
    });
  } else {           // If authorization header is not present in request, send "Give token in authorization Header" response
    res.send("Give token in authorization Header")
  }
};


// login API (to authenticate the user by checking their email and password)
app.get("/login", async (req, res, next) => {

  // Seting the URL and database name for the MongoDB connection
  const dbURL = "mongodb://127.0.0.1:27017";
  const dbName = "Data";

  // get the user details (email and password) from the request body
  const userdetails = req.body;
  const usermail = req.body.email;
  const password = req.body.password;

  // Get user details from the database using the userModel and the userdetails extracted from the request
  const getUser = await userModel.getUserDetails(dbURL, dbName, usermail, password)

  // If the user exists in the database, issue an authorization token with an expiry of 1 hour
  if (getUser !== null) {
    console.log(getUser.password)
    const token = jwt.sign(getUser, secretkey, { expiresIn: '1h' });

    //to route object id of the user with the refid of marks collection
    const client = await MongoClient.connect(dbURL);

    Obj = getUser._id.toString()

    const marks = await client
        .db(dbName)
        .collection("marks")
        .findOne({refid: getUser._id})

    if (marks !== null){
        res.send({
            token, msg:"keep this in showmarks router to get yout marks",Obj
        })
    }

    else{
        res.send({token,msg: "Logged in successfully, add your marks in [postmarks]router, Thank You","this is your user id":Obj})
    }
    
    
}

else {
    res.status(401).send({error: "invalid email or password"})

}
});

//api to register
app.post("/register",async(req,res)=>{
   dbURL = "mongodb://127.0.0.1:27017";
   dbName = "Data";
   const userdetails = req.body;
  const adduser = await userModel.addUserDetails(dbURL,dbName,userdetails)
res.send({
  msg:"Student Registered"
})
})



//to post the marks of student

app.post("/postmarks/:id",verifyToken, async(req,res)=>{
  const dbURL = "mongodb://127.0.0.1:27017";
  dbName = "Data";
  const userdetails = req.body;
  const userId= req.params.id
  const id = new ObjectId((userId))
  const postmarks = await userModel.addmarks(dbURL,dbName, userdetails,userId)

  res.send({
      msg: "Marks added."
})
})




//api to display marks of the authenticated user

app.get("/showmarks", verifyToken, async (req, res) => {
  const dbURL = "mongodb://127.0.0.1:27017";
  const dbName = "Data";
  const client = await MongoClient.connect(dbURL);
  console.log({refid:new ObjectId(req.user._id)})

  const marks = await client
    .db(dbName)
    .collection("marks")
    //.findOne({ refid: req.user._id.toString() });
    .findOne({refid:new ObjectId(req.user._id) })

    obj= req.user._id

  if (marks !== null) {
    res.send(marks)}

 else (res.send({msg:"please add your marks using [addmarks] router", obj}))
    })

app.listen(4001, () => {
  console.log("app running on port 4001");
});


