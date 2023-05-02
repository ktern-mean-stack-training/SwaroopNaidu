//Using database instead of array 
const express = require ("express");  
//importing express framework and assigning it to a constant variable named express, 
// that holds a refrenece to the actual express framework

const UserModel = require("./mongodb");

const app=express();  //intitating express framework
app.use(express.json()) //help to acess incoming j-son objects as a readable input

// 1.API to store userdata in database
app.post("/2adduser",async (req,res)=>{
   dbURL = "mongodb://localhost:27017";
   dbName = "userdb"
  const userdetails = req.body;
  const adduser = await UserModel.addUserdetails(dbURL,dbName , userdetails);
  res.send(adduser)
})



// 2.API to update user data in the database
app.put("/2updateuser/:id", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userId = req.params.id;
  const userdetails = req.body;
  const updateUser = await userModel.updateUserDetails(dbURL, dbName, userId, userdetails);
  res.send(updateUser);
  });

  //3. API to delete a user from the database
app.delete("/2deleteuser/:id", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userId = req.params.id;
  const deleteUser = await userModel.deleteUser(dbURL, dbName, userId);
  res.send(deleteUser);
  });



//4. API to get a single user data using id
app.get("/2user/:id", async (req, res) => {
const dbURL = "mongodb://localhost:27017";
const dbName = "userdb";
const userId = req.params.id;
const user = await userModel.getUserById(dbURL, dbName, userId);
res.send(user);
});


// 5.API to get all users from the database
app.get("/2users", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userdetails = req.body;
  const users = await userModel.getAllUsers(dbURL, dbName);
  res.send(users);
});

//6. API to get total marks of the user
app.get("/2totalmarks/:id", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userId = req.params.id;
  const totalMarks = await userModel.getTotalMarks(dbURL, dbName, userId);
  res.send(totalMarks);
  });

   //7. API to get total marks of the user including all the details
app.get("/2totalmarkswithdetails/:id", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userId = req.params.id;
  const totalMarksWithDetails = await userModel.getTotalMarksWithDetails(dbURL, dbName, userId);
  res.send(totalMarksWithDetails);
  });

//   //8. API to get all user details along with the percentage of marks
// app.get("/userswithpercentage", async (req, res) => {
//   const dbURL = "mongodb://localhost:27017";
//   const dbName = "userdb";
//   const usersWithPercentage = await userModel.getUsersWithPercentage(dbURL, dbName);
//   res.send(usersWithPercentage);
//   });
  


app.listen(4000, () => {
  console.log("app running on port 4000");
});
