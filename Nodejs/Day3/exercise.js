// Define the user ID to start with
const userid = "5";

// Define the data set as an array of objects with properties id, refif and name
const data = [
{ id: "1", refid: "6", name: "first" },
{ id: "2", refid: "3", name: "second" },
{ id: "3", refid: "1", name: "third" },
{ id: "4", refid: "4", name: "fourth" },
{ id: "5", refid: "2", name: "fifth" },
{ id: "6", refid: "", name: "sixth" }
];

// define  empty array to store the output and initialize a reference ID with the starting user ID
let output = [];
let refid = userid;

// Loop through the data set until there is no more refif to follow
while (refid) {
// Find the object with the current id that matches the current ref
let obj = data.find(ele => ele.id === refid);

// If such object exists, push its name into the output array and update the reference ID with its refif
if (obj) {
output.push(obj.name);
refid = obj.refid;
}
// If such object does not exist, log an error message and break out of the loop
else {
console.log("refid is not available");
break;
}
}

// Log the final output array containing the names in the correct order
console.log(output);





