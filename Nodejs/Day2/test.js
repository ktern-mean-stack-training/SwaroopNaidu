
let userdetails = [
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
];      //  array of objects that contains user details


// Looping through the array using for...in loop
for (let i in userdetails) {    // loop through the array using for...in loop
  console.log("Name: " + userdetails[i].name + ", English: " + userdetails[i].english + ", Physics: " + userdetails[i].physics );
  // Output the user details for each iteration of the loop, where i is the index of the current object being looped over.
  // Access the properties of the current object using dot notation and concatenate them with the relevant strings.
}