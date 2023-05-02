//Using database instead of array 
const express = require ("express");  
//importing express framework and assigning it to a constant variable named express, 
// that holds a refrenece to the actual express framework

const UserModel = require("./mongodb");

const app=express();  //intitating express framework
app.use(express.json()) //help to acess incoming j-son objects as a readable input

// 1.API to store userdata in database
app.post("/2adduser",async (req,res)=>{
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb"
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
  const updateUser = await UserModel.updateUserDetails(dbURL, dbName, userId, userdetails);
  res.send(updateUser);
  });

  //3. API to delete a user from the database
app.delete("/2deleteuser/:id", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userId = req.params.id;
  const deleteUser = await UserModel.deleteUser(dbURL, dbName, userId);
  res.send(deleteUser);
  });



//4. API to get a single user data using id
app.get("/2user/:id", async (req, res) => {
const dbURL = "mongodb://localhost:27017";
const dbName = "userdb";
const userId = req.params.id;
const user = await UserModel.getUserById(dbURL, dbName, userId);
res.send(user);
});


// 5.API to get all users from the database
app.get("/2users", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userdetails = req.body;
  const users = await UserModel.getAllUsers(dbURL, dbName);
  res.send(users);
});

//*. API to get total marks of the user
app.get("/2totalmarks/:id", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userId = req.params.id;
  const totalMarks = await UserModel.getTotalMarks(dbURL, dbName, userId);
  res.send(totalMarks);
  });

  //*. API to get total marks of the user including all the details
app.get("/2totalmarkswithdetails/:id", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const userId = req.params.id;
  const totalMarksWithDetails = await UserModel.getTotalMarksWithDetails(dbURL, dbName, userId);
  res.send(totalMarksWithDetails);
  });

// 6. API to get all user details along with the percentage of marks
app.get("/2userdetailspercentage", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const usersDetailsPercentage = await UserModel.getUserDetailsPercentage(dbURL, dbName);
  res.send(usersDetailsPercentage);
  });
  
  // 7. API to get users who got above 80%
  app.get("/2usersabove80", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const usersAbove80 = await UserModel.getUsersAbove80(dbURL, dbName);
  res.send(usersAbove80);
  });
  
  // 8. API to get the student details who got cutoff value greater than 80
  app.get("/2userscutoffabove80", async (req, res) => {
  const dbURL = "mongodb://localhost:27017";
  const dbName = "userdb";
  const usersCutoffAbove80 = await UserModel.getUsersCutoffAbove80(dbURL, dbName);
  res.send(usersCutoffAbove80);
  });
  


app.listen(4000, () => {
  console.log("app running on port 4000");
});
