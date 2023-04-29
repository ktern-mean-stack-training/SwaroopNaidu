
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


// Looping through the array using for loop
for (let i = 0; i < userdetails.length; i++) {
  console.log("Name: " + userdetails[i].name + ", English: " + userdetails[i].english );
}



// Looping through the array using for...in loop
for (let i in userdetails) {    // loop through the array using for...in loop
  console.log("Name: " + userdetails[i].name + ", English: " + userdetails[i].english + ", Physics: " + userdetails[i].physics );
  // Output the user details for each iteration of the loop, where i is the index of the current object being looped over.
  // Access the properties of the current object using dot notation and concatenate them with the relevant strings.
}

//------------------------------------------

// Looping through the array using while lopp

let i = 0;            // initialize a variable `i` to 0
while (i < userdetails.length) {      // while `i` is less than the length of `userdetails` array
  // log the details of the current user to the console
  console.log("Name: " + userdetails[i].name + ", English: " + userdetails[i].english + ", Physics: " + userdetails[i].physics + ", Maths: " + userdetails[i].maths + ", Chemistry: " + userdetails[i].chemistry);
  i++;              // increment the value of `i` to move to the next user in the array
}



//-------------------------------


//writing a simple function
function add(a,b){
  return (a+b);
}

console.log(add(3,4));

//---------------------------
// function addNumbers(){
//   let num1 = parseInt(prompt("enter the first number"));
//   let num2 = parseInt(prompt("enter the second number"));
//   let sum = (num1+num2);
//   return sum;
// }

// let result = addNumbers();
// console.log(result);


//--------------------------------------------

// Example JSON object
const myObj = {
  name: "John",
  age: 30,
  city: "Chennai"
};

for (const key in myObj) {                // Iterate through the key-value pairs of the object using a for...in loop

  console.log(`${key}: ${myObj[key]}`);       // Access the value of each key-value pair using bracket notation
}

// Change the value of a specific key
myObj.age = 35;

// Print the updated object to the console
console.log(myObj);


//--------------------------------------------


async function consoleHere(){    // Define an asynchronous function called consoleHere
 await new Promise(resolve => setTimeout(resolve, 3000));
  // Wait for a Promise that resolves after 3 seconds using setTimeout method
 console.log("Ravi is a boy")  // After the Promise(setimeout) is resolved, log "Ravi is a boy" to the console

} 

(async()=>{
  console.log("1");        //log 1 to console
  consoleHere();           //consolHere function called but, didnt wait for it to finish
  console.log("2");        //log 2 to console
})();                      

//Output will be
// 1
// 2
// print after 3 seconds
//--------------------------------------------------------------

async function consoleHereAlso(){
  await new Promise(resolve => setTimeout(resolve, 3000));
  console.log("Ravi is a boy")
 }
 
 (async()=>{
   console.log("1");        
   await consoleHereAlso();       //   we added await here
   console.log("2");        
 })();     


// Output will be
// 1
// Ravi is a boy
// 2

// the await keyword is used before calling the consoleHereAlso function inside 
// the async function. so  that the program will wait for the consoleHereAlso
//  function to complete before moving on to the next line, which is logging "2" to the console.