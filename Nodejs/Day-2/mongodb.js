const MongoClient = require("mongodb").MongoClient; // Importing the MongoClient module from the "mongodb" package
const ObjectId = require("mongodb").ObjectId;

// 1.Function to add a user to the database
module.exports.addUserdetails = async (url, dbName, userData) => { 
  const client = await MongoClient.connect(url);   //connecting to the MongoDB server using the provided URL
  const addUser = await client
    .db(dbName)
    .collection("users")
    .insertOne(userData);
  return addUser;                 // Returning the result
};

// 2.Function to update user details
module.exports.updateUserDetails = async (url, dbName, userId, userData) => {
  const client = await MongoClient.connect(url);
  const updateUser = await client
    .db(dbName)
    .collection("users")
    .updateOne({ _id: ObjectId(userId) }, { $set: userData });
  return updateUser;
};

// 3. Function to delete a user from the database
module.exports.deleteUser = async (url, dbName, userId) => {
  const client = await MongoClient.connect(url);
  const deleteUser = await client
    .db(dbName)
    .collection("users")
    .deleteOne({ _id: ObjectId(userId) });
  return deleteUser;
};

// 4.Function to get a user by ID
module.exports.getUserById = async (url, dbName, userId) => {
  const client = await MongoClient.connect(url);
  const user = await client
    .db(dbName)
    .collection("users")
    .findOne({ _id: ObjectId(userId) });
  return user;
};

// 5.Function to get all users
module.exports.getAllUsers = async (url, dbName) => {
  const client = await MongoClient.connect(url);
  const users = await client
    .db(dbName)
    .collection("users")
    .find()
    .toArray();
  return users;
};

// *.Function to get total marks of a user
module.exports.getTotalMarks = async (url, dbName, userId) => {
  const client = await MongoClient.connect(url);
  const user = await client
    .db(dbName)
    .collection("users")
    .findOne({ _id: ObjectId(userId) });
  const totalMarks =
    user.english + user.physics + user.maths + user.chemistry;
  return { totalMarks };
};

// *.Function to get total marks with details of a user
module.exports.getTotalMarksWithDetails = async (url, dbName, userId) => {
  const client = await MongoClient.connect(url);
  const user = await client
    .db(dbName)
    .collection("users")
    .findOne({ _id: ObjectId(userId) });
  const totalMarks =
    user.english + user.physics + user.maths + user.chemistry;
  return {
    id: user.id,
    name: user.name,
    english: user.english,
    physics: user.physics,
    maths: user.maths,
    chemistry: user.chemistry,
    totalMarks,
  };
};

// 6. Function to get all user details along with the percentage of marks
module.exports.getUserDetailsPercentage = async (url, dbName) => {
  const client = await MongoClient.connect(url);
  const users = await client
  .db(dbName)
  .collection("users")
  .find()
  .toArray();
  const usersDetailsPercentage = users.map((user) => {
  const totalMarks = user.english + user.physics + user.maths + user.chemistry;
  const percentage = ((totalMarks / 400) * 100).toFixed(2);
  return {
  id: user.id,
  name: user.name,
  english: user.english,
  physics: user.physics,
  maths: user.maths,
  chemistry: user.chemistry,
  totalMarks,
  percentage,
  };
  });
  return usersDetailsPercentage;
  };

// 7. Function to get users who got above 80%
module.exports.getUsersAbove80 = async (url, dbName) => {
  // connect to the MongoDB server using the provided URL
  const client = await MongoClient.connect(url);

  // query the "users" collection in the specified database for users whose total marks are greater than 320 (out of a possible 400)
  const usersAbove80 = await client
    .db(dbName)
    .collection("users")
    .find({
      $expr: {               //$expr operator allows the use of aggregation expressions within the query language.
        $gt: [              //  $gt operator returns true if the value on the left is greater than the value on the right,
          { $sum: ["$english", "$physics", "$maths", "$chemistry"] }, // calculate the sum of the marks for each subject and compare it to the threshold of 320
          320,
    ],
      },
  })
    .toArray();

  // return the resulting users as an array
  return usersAbove80;
};  




// define the function to get users who got above 80% in all subjects
module.exports.getUsersAbove80InAllSubjects = async (url, dbName) => {
  // connect to the MongoDB server using the provided URL
  const client = await MongoClient.connect(url);

  // query the "users" collection in the specified database for users who scored above 80% in all subjects
  const usersAbove80InAllSubjects = await client
    .db(dbName)
    .collection("users")
    .aggregate([
      // add a new field "totalMarks" that calculates the sum of marks for each user
      {
        $addFields: {
          totalMarks: {
            $sum: ["$english", "$physics", "$maths", "$chemistry"],
          },
        },
      },
      // match the users who scored above 80% in all subjects
      {
        $match: {
          english: { $gt: 80 },
          physics: { $gt: 80 },
          maths: { $gt: 80 },
          chemistry: { $gt: 80 },
        },
      },
      // project only the required fields and exclude the _id field
      {
        $project: {
          _id: 0,
          id: 1,
          name: 1,
          english: 1,
          physics: 1,
          maths: 1,
          chemistry: 1,
          totalMarks: 1,
        },
      },
    ])
    .toArray();

  // return the results
  return usersAbove80InAllSubjects;
};

