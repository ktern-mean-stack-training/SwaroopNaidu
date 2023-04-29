const express = require ("express");  
//importing express framework and assigning it to a constant variable named express, 
// that holds a refrenece to the actual express framework

const app=express();  //intitating express framework
app.use(express.json()) //help to acess incoming j-son objects as a readable input

let userdetails = [                 // storing user details in an array "userdetails"
{
  id: 1,
  name: 'Swaroop',
  english: 90,
  physics: 60,
  maths: 75,
  chemistry: 60,
},
{
  
  id: 2,
  name: 'Ravi',
  english: 90,
  physics: 80,
  maths: 70,
  chemistry: 60,
},

{
  
  id: 3,
  name: 'Madhan',
  english: 90,
  physics: 68,
  maths: 70,
  chemistry: 60,
} 
]


// 1.to post student details -- Done
app.post('/adduser', (req, res) => {
  let user = req.body; // getting the student details from the request body
  user.id = userdetails.length + 1; // generate new ID based on current length of array
  userdetails.push(user); // adding the new student to the array
  res.send(user); // sending the new student details back to the client
});



//2.to update student details 


app.put("/updateuser/:userid",(req,res)=>{       //defining route to handle get request
let userid = parseInt(req.params.userid);      //converting user id from url to integer using parseInt
let updateUser =req.body;  
let updater                      //taking updated fields from the request body &storing it variable
for (let user of userdetails){                  //looping through array of userdetails
  if(user.id===userid){                      // if user id matches with the id present in the url
    console.log("user found",user.name)      // Logging a message with the name of the student found
    console.log(user)                          // Logging the details of the student found
    user.name = updateUser.name;
    user.maths = updateUser.maths;
    user.physics = updateUser.physics;
    user.chemistry = updateUser.chemistry;
    user.english = updateUser.english;
        res.send(user);                               //to send the updated details back to the client
  //return;                                         //exiting the loop
}
}
})

//to delete user

app.delete('/userdelete/:userid', (req, res) => {
  let userid = parseInt(req.params.userid);
  
  for (let i = 0; i < userdetails.length; i++) {
    if (userdetails[i].id === userid) {
      userdetails.splice(i, 1);
      // here a nested loop is kept that iterates over the remaining users 
      //in the array after a user is deleted and decrements their IDs by 1. 
      for (let j = i; j < userdetails.length; j++) {
        userdetails[j].id--;
      }
      
      break;
    }
  }
  
  res.send(userdetails);
});


//4.to get a single user data using id -- Done

app.get("/userdata/:userid", (req,res)=>{     //defining route to handle get request
  let   id =  parseInt(req.params.userid);   //converting user ID from url to an integer using parseInt
  let result;                                  //assigning an empty variable to store the requested userdata
  console.log(typeof id)
  for (let user of userdetails){               //using loop to check user details array and look for a match with the requested user ID
    console.log(typeof user.id)            //Checking the type of the user ID and the user ID property of each user 
    if(user.id===id){                  //if userid in request matches with user id in userdata

      result = user;                            //Assign the user object to the result variable

    }
  }

  res.send({                                    // Sending a responseto client with the requested user's details.
    user:result
  })
})
 


//5.To get all the student details --Done

app.get("/userdata",(req,res)=>{                 //defining route to andle the get request
  res.send(userdetails)                           //sending a response to client with all the userdetails
})


//to get total marks of the user
app.get("/userdata/total/:userid",(req,res)=>{
  let id = parseInt(req.params.userid);
  let user = userdetails.find((user) => user.id === id);  // find the user with the specified ID
  if (!user) {   // return error response if user not found
    res.status(404).send("User not found");
  } else {
    const totalMarks = user.english + user.maths + user.physics + user.chemistry;
    console.log(totalMarks);  // display the total marks in the console
    res.send(`Total marks of user with ID ${id}: ${totalMarks}`);  // send the total marks as the response
  }
});

  //to get total marks of the user including all th e details
  app.get("/userdata/total/:userid", (req, res) => {
    let id = parseInt(req.params.userid);
    let user = userdetails.find((user) => user.id === id); // find the user with the specified ID
    if (!user) {
      // return error response if user not found
      res.status(404).send("User not found");
    } else {
      const totalMarks =
        user.english + user.maths + user.physics + user.chemistry;
      // add the totalMarks property to the user object
      const userWithTotalMarks = { ...user, totalMarks };
      // here above we created a new object called userWithTotalMarks by copying all the properties of the user object 
      //using the spread operator ..., and adding a new property called totalMarks.
      console.log(userWithTotalMarks); // display the user details and total marks in the console
      res.json(userWithTotalMarks); // send the user details and total marks as the response
    }
  });
  


//6. To get all user details along with the percentage of marks
app.get("/userdata/percentage/:userid", (req, res) => {
  let id = parseInt(req.params.userid);                 //same as done for the total marks with userdetails
  let user = userdetails.find((user) => user.id === id);
  if (!user) {
    res.status(404).send("User not found");
  } else {
    const totalMarks =
      user.english + user.maths + user.physics + user.chemistry;
    const percentage = (totalMarks / 400) * 100;       // additionally we added percentage formula
    const userWithTotalMarksAndPercentage = { ...user, totalMarks, percentage };
    console.log(userWithTotalMarksAndPercentage);
    res.json(userWithTotalMarksAndPercentage);
  }
});

//7.users who got above 80%

app.get("/userdata/above80",(req,res)=>{
  let usersAbove80 = userdetails.filter((user) => { // loop through all the users and filter out the users who got above 80%
  const totalMarks = user.english + user.maths + user.physics + user.chemistry; // calculate the total marks
  const percentage = (totalMarks / 4); // calculate the percentage
  return percentage > 80; // check if percentage is above 80% or not
  });
  console.log(usersAbove80);
  res.json(usersAbove80); // send the response back to the client with users who got above 80% marks
  })


//8. To get the student details who got cutoff value greater than 80

app.get("/userdata/cutoff80-percentage", (req, res) => {
  const usersAboveCutoff = userdetails.filter((user) => {
    const cutoff = (user.maths * 0.5) + (user.physics * 0.25) + (user.chemistry * 0.25);
    return cutoff > 80;
  });
  console.log(usersAboveCutoff);
  res.json(usersAboveCutoff);
});


app.listen(3002, () => {
  console.log("app running on port 3002");
});