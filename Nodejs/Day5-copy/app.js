
const express = require("express");
const app = express();
app.use(express.json())

const database =[
//Parent Object
    {//first task
    id: 1,
    startedon: "2022-03-03", //yyyy-mm-dd
    completedon: "2022-05-15",
    weightage: 90,
    milestone: 90,
    },
    //Child Objects
    {
        //First task L2
        id: 2,
        refid: 1,
        startedon: "2022-04-05",  //april-05
        completedon: "2019-05-15", //may-15
        weightage: 40,
        milestone: 70,
    },
    {
        //Second task L2
        id: 6,
        refid: 1,
        startedon: "2023-03-05", //mar5
        completedon: "2022-04-25", //apr25
        weightage: 60,
        milestone: 30,
    },
    {
        //third task L3
        id: 12,
        refid: 1,
        startedon: "2022-01-14", //jan-14
        completedon: "2022-01-24", //jan 24
        weightage: 40,
        milestone: 20
  
    },
    //Childest Objects
    {
        //First task L3
        id: 3,
        refid: 2,
        startedon: "2022-03-01", //march-01
        completedon: "2019-04-10", //apr-10
        weightage: 15,
        milestone: 10,
      },
      {
        //Second task L3
        id: 4,
        refid: 2,
        startedon: "2020-02-02", //feb-2
        completedon: "2022-04-15", //april-15
        weightage: 10,
        milestone: 100,
      },
      {
        //third task L3
        id: 5,
        refid: 2,
        startedon: "2022-03-05", //march-5
        completedon: "2022-03-24", //march-24
        weightage: 5,
        milestone: 10,
      },
      {
        //First Second task L3
        id: 7,
        refid: 6,
        startedon: "2022-02-04", //feb-4
        completedon: "2022-04-25", //april-25
        weightage: 60,
        milestone: 30,
      },

    //Childest Objects
    {
        //Childest task1
        id: 8,
        refid: 7,
        startedon: "2022-02-01", //feb-1
        completedon: "2020-april-25", //apr-25
        weightage: 20,
        milestone: 7.5,
      },
      {
        //Childest task2
        id: 9,
        refid: 7,
        startedon: "2022-04-05", //apr-05
        completedon: "2023-04-20", //apr-25
        weightage: 10,
        milestone: 7.5,
      },
      {
        //Childest task3
        id: 10,
        refid: 7,
        startedon: "2022-03-25", //mar-25
        completedon: "2022-04-05", //apr-05
        weightage: 10,
        milestone: 7.5,
      },
      {
        //Childest task4
        id: 11,
        refid: 7,
        startedon: "2022-03-05", //mar-05
        completedon: "2022-06-12", //may-12
        weightage: 10,
        milestone: 7.5,
      } 
]

// This function takes a nested array as input and returns a flattened array
function flattenArray(nestedArray) {
  // The reduce() method is used to iterate over each element in the nestedArray.
  // a) a "result" variable which is an array that accumulates values 
  return nestedArray.reduce((result, item) => {
    if (Array.isArray(item)) {
      result.push(...flattenArray(item));
    } else {       // If the current item is not an array, it is added to the result array using the push() method. 
      result.push(item);
    }             // The result array is returned for the next iteration of the reduce() method.
    return result;
  }, []);
}
//----------------------------------------------------------------------------------------
// Recursive function to find all child tasks of a given parent task
function getChild(parentId) {
    const child = [];           // Create an empty array to store the child tasks
    for (let task of data) {
    // Loop through each task in the data array
     // If the task's refid matches the given parentId, then it is a child task
        if (task.refid === parseInt(parentId)) {
        // Extract the task information such as id, refid, startedon, completedon, weightage, milestone
        let id = task.id;
        let refid = task.refid;
        let startedon = task.startedon;
        let completedon = task.completedon;
        let weightage = task.weightage;
        let milestone =  task.milestone;
        // Store the task information in an object
        const date = {
            id, refid,startedon, completedon,weightage,milestone 
        }
        // Use recursion to get the grand child tasks
        const grandChildTasks = getChild(task.id);  
        // Push the current task and its grand child tasks into the child array
        child.push(date,grandChildTasks);
      }
      
    }
      const flatchild = flattenArray(child); // Flatten the child array so that all nested arrays are merged into a single array

      return flatchild; // Return the flattened child array which contains all child tasks of the given parent task

    
  }
//---------------------------------------------------------------------------------------
// A function to find the minimum date among the child tasks of a parent task
  function getmin(childtasks){
  console.log("to get minimum date- inside getmin function")

// Initialize the minimum date with the first child task's startedon date
  let mindate = childtasks[0].startedon;
// Loop through all the child tasks to find the minimum startedon date
  for (i=1;i < childtasks.length;i++){
    if (childtasks[i].startedon<mindate){
      mindate= childtasks[i].startedon
    }
  }
// Log the minimum date to console for debugging purposes
  console.log(mindate);

  return (mindate) //return the minimum date of parent ID
}

//-------------------------------------------------------------------------------------

//To get maximun date among the child tasks
function getmax(childtasks){
  console.log("to get maximum date- inside getmax function")

  maxdate = childtasks[0].completedon;
  // Initialize maxdate to the completedon value of the first task in the array
  for (i=1; i<childtasks.length;i++){
  // Loop through the remaining tasks in the array
    if (childtasks[i].completedon>maxdate){
      // If a task's completedon value is greater than the current maxdate value
      maxdate = childtasks[i].completedon;
      // Set maxdate to the task's completedon value
    }
  }

  console.log(maxdate)

  return (maxdate) //returns the maximum date of the parent
}

//---------------------------------------------------------------------

//function to add the weights of the child tasks
function getadd(childtasks){      //function takes an array of child tasks as input

  let weight =0;                   //Initialize the variable weight to 0
  for (i=0;i<(childtasks.length);i++){ //Iterate over each child task
    weight+= childtasks[i].weightage  //Add the weightage of the current child task to the variable weight
  }

  console.log(weight,{msg:"weight of the parent id"})  //Print the value of the variable weight

  return weight; //returns the weightage of the parent
}

//------------------------------------------------------------------------


//To divide the milestone of parent among all the childs
function getmile(childtasks,id,parId){
  
  console.log("==");
  console.log("at getmile, first get");

  let parentId = parId

  console.log("==");
  console.log("this is the id of the parent:");
  console.log(parentId)


  parent= data[id];    // Get the parent task object from the data array using the given ID
  console.log("==");
  console.log("this is your parent:");
  console.log(parent);

  let parentmile = parent.milestone;   // Get the milestone value of the parent task
  console.log("milestone of the parent:");
  console.log(parentmile);
  console.log("==");
  
  let childrens = [];    // Initialize an empty array to store the child tasks

  let childesttasks=[];    // Initialize an empty array to store the grandchild tasks
  for (let child of childtasks) {    // Loop through the child tasks and find the ones that belong to the parent task
    if (child.refid === parseInt(parentId)) {
      childrens.push(child);
    }
  }

  console.log("these are childrens of the parent");
  console.log(childrens);

  // If there are child tasks, divide the parent's milestone value among them
  if (childrens.length>0){
    // Calculate the share of the parent's milestone value for each child task
    let share = parseFloat((parentmile / childrens.length).toFixed(2));
    console.log("share given by the parent to each of its child:");
    console.log(share);
    console.log("==")

    // Loop through the child tasks and set their milestone value to the share
    for (let child of childrens){
      child.milestone=share;
      // Use recursion to get the grandchild tasks and add them to the array
      let childest = getmilechild(childtasks,child.id,child.milestone)

      childesttasks.push(childest);
      console.log("updated childesttasks:");
      console.log(childesttasks);

      console.log("these are childest task shared by recursive:");
      console.log(childesttasks);//we want this
      

    }

  }
  console.log("Children of the parent with refid", parentId, "in childtasks:");
  console.log(childrens); //we want this
  // Concatenate the child tasks and grandchild tasks into a single array and return it
  let mergechild = childrens.concat(childesttasks);
  console.log("these are final output that should be returned:")
  console.log(mergechild);

  return mergechild; // along with child tasks of parent, here grand child tasks are also included[ie from getmilechild also]
  
}

//--------------------------------------------------------------------------------

//consider this as a sub function to run a recursive loop on childest tasks of parent [ie child of (child of parent tasks)]
function getmilechild(childtasks,childid,milestone){

  console.log("at getmilechild, second get")

  let parentmile = milestone
  console.log("childest tasks of",childid,"are:");
  let childrens = [];
  for (let child of childtasks) {
    if (child.refid === parseInt(childid)) {
      childrens.push(child);
    }
  }

  console.log(childrens);

  let childmilestone=[];
  if (childrens.length>0){
    
    let share = parseFloat((parentmile / childrens.length).toFixed(2));
    console.log("share given by the parent to each of its child:");
    console.log(share);
    console.log("==")

    
    for (let child of childrens){
      
      child.milestone=share;
      console.log("pushing into getmilechild")
      console.log(child)
      childmilestone.push(child);
      console.log("updated childmilestone:");
      console.log(childmilestone);
      console.log("getmilechild calling")
      let grandchildren= getmilechild(childtasks,child.id,child.milestone)
      childmilestone = childmilestone.concat(grandchildren);
    }

  }

  console.log("these are chldmilestone :");
  console.log(childmilestone); //here we need this


  
  // return childrens
  return childmilestone // [updating the milestone of childest tasks of parent and sharing it to child tasks array]
  
}


// To show all child objects and grand childs of the parent task
app.get("/getchild/:id", (req, res) => {
  const parentId = req.params.id;
  const childObj = getChild(parentId);
  // console.log(childObj,"at app")
  console.log(childObj)
  res.send(childObj);
});


//--------------------------------------------------------------------
//roll up approach 
//To Update Started date, completed date and weightage of the parent components based on the child components
app.put("/updates/:id",(req,res)=>{


  const parentId = req.params.id;

  childtasks = getChild(parentId);

  console.log(childtasks.length,{msg:"length of the childtask"})

  console.log(childtasks,{msg:"child objects of the ParentId"});

  //now we have child and childest objects of the parentId

  if(childtasks.length>1){   //if and only if there is a child task to the parent

//------------------------------------------------------------

  //to find the index of the item in data array
  const parentIndex = data.findIndex(task => task.id === parseInt(parentId));

  console.log(parentIndex, {msg:"index of the parent in data"})
  if (parentIndex === -1) {
    return res.status(404).send("Parent task not found");
  }


  //to call functions
  mindate = getmin(childtasks);
  maxdate = getmax(childtasks);
  addweight = getadd(childtasks);


  //to replace the updated data
  data[parentIndex].startedon=mindate;
  data[parentIndex].completedon=maxdate;
  data[parentIndex].weightage=addweight;
  


  DATA = {id:data[parentIndex].id,
          refid:data[parentIndex].refid,
          startedon:data[parentIndex].startedon,
          completedon:data[parentIndex].completedon}
        
  // res.send(data[parentIndex]) //sending the updated data of the parent wrt its child tasks

  res.send(DATA)
  }

  // if there is no child task for the parent then,
  else{
    const parentIndex = data.findIndex(task => task.id === parseInt(parentId));
    console.log(parentIndex, {msg:"index of the parent in data"})
    if (parentIndex === -1) {
      return res.status(404).send("Parent task not found");
    }
    res.send(data[parentIndex]) //sending the data of the parent itself, since there are no child tasks
  }

});
//---------------------------------------------------------------------------
//roll Down approach
//To Distribute the milestones of the parent object to their childrens.
app.put("/milestones/:id",(req,res)=>{

const parentId = req.params.id;

childtasks = getChild(parentId);

//to find the index of the item in data array
const parentIndex = data.findIndex(task => task.id === parseInt(parentId));

console.log("index of the parent in data")
console.log(parentIndex)


if (parentIndex === -1) {
  return res.status(404).send("Parent task not found");
}

//To get the child tasks of the parent in the console[for comparision only]
console.log("length of the childtasks of parentId:");
console.log(childtasks.length);

if(childtasks.length>1){

  console.log("yes! length of child tasks for id:",parentId,"are >1:")

  mile= getmile(childtasks,parentIndex,parentId) //child tasks along with their parent id of data array

  let parent = data[parentIndex]

  family =[parent,mile]

  res.send(family)

}

else{
  res.send(data[parentIndex])
}

});

app.listen(4001,()=>{
  console.log("app running at port 4001")
});