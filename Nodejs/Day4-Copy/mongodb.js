const MongoClient = require("mongodb").MongoClient; // Importing the MongoClient module from the "mongodb" package
const ObjectId = require("mongodb").ObjectId;

// to register
module.exports.addUserDetails = async (url, dbName, userData) => { 
  const client = await MongoClient.connect(url);   //connecting to the MongoDB server using the provided URL
  const postuser = client    // We then select the database and collection where we want to insert the user data
  .db(dbName)
  .collection("users")
  .insertOne(userData)
  return postuser;                 // Returning the result
};

//function to give marks to student
module.exports.addmarks = async (url, dbName, userData , userId) => { 
  const client = await MongoClient.connect(url);   //connecting to the MongoDB server using the provided URL
  const addmarks = client
  .db(dbName)
  .collection("marks")
  //.insertOne(userData)
  .insertOne({refid: new ObjectId(userId), userData})
  return addmarks;                 // Returning the result
};


//to authenticate and give student token

module.exports.getUserDetails = async(url, dbName, usermail, password)=>{
  const client = await MongoClient.connect(url)
  const getUser = client  
      .db(dbName)
      .collection("users")
      .findOne({email: usermail, password: password})
      return (getUser)
      
}


//To find ID of the students & to give marks 
module.exports.findid= async(url,dbName, userId)=>{
  const client = await MongoClient.connect(url)
  // console.log(userId,"at mongo before calling")
  console.log({_id: new ObjectId(userId)},"before calling at mongodb")
  const findid = await client
      .db(dbName)
      .collection('users')
      // .findOne({_id: new ObjectId(userId).toString()})
      .findOne({_id:new ObjectId(userId) })

  console.log(findid,"at mong after calling at mongodb")

  return findid
}
