
class user {

    constructor(name, id, channelList) {
        this.setName(name);                           //a user shall have a username to differentiate themselves from other users
        this.createID();                              //a user shall have their own id which will be used by the program to sort through users
        this.channelList = [];                        //a user shall have access to all the channels they are a in and shall see all joined channels
    }

    //Getter function to find the user's name
    getName() {
        return this.name;
        //might be redundant since we can simply do user.name
    }

    //Getter function to find the user's id
    getId() {
        return this.id;
        //might be redundant since we can simply do user.id
    }

    //Setter function to change a user's name
    setName(newName) {
        this.name = newName;
    }

    setID(newID) {
        this.id = newID;
    }

    //Function that generates a unique id for the user
    createID() {
        //this function shall make sure that the user has a UNIQUE id before associating it to the user
        //the user id will be created as the user is created and will be equal to their order based on previous users
        try {
            if (myJSON["users"].length == null) {
                //start the user count at 1, if no other users exist
                this.id = 1;
                totalUsers++;
            } else {
                let loc = myJSON["users"].length
                this.id = myJSON["users"][loc - 1].id + 1;
                totalUsers++;
            }
        }catch(err){
            this.id=0;
        }
    }

    //a function that adds a new channel to the list of already joined channels (Can ve UPDATED)
    JoinChannel(channelName) {
        var found = false;
        for (var j = 0; j < this.channelList.length; j++) {
            if (this.channelList[j] === channelName) {
                found = true;
                break;
            }
        }

        if (found === false) {
            this.channelList.push(channelName);
        }
        //this function shall must make sure that the channel exists, fetch its id, and add it to the user's channel list
    }

    //Function to Search specific IDs to make sure there are no repeats
    searchJSONId() {
        var found = false;
        for (var i = 0; i < myJSON["users"].length; i++) {
            if (myJSON["users"][i].id == this.id) {
                found = true;
                break;
            }
        }
        return found;
    }

    //Function that will add the user to the JSON file
    addToJson() {
        //this function must only add the user if the id is non-identical to a previous one, otherwise it should display an error
        if (this.searchJSONId() == false) {
            myJSON["users"].push(this);
            writeJSON(); //save new JSON list to the .json file
            console.log("Successfully added to JSON")
        }
        else
            console.log("User already exists!")         //Can be transformed to an error message

    }


}

//Global function that can and will be used multiple times
  function readJSON (){

    myJSON=require("./Users.json");
}

//Global Rewrite file with new JSON objects
function writeJSON() {
    fs.writeFile("Users.json", JSON.stringify(myJSON), function (err) {

        if (err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    });
}

//TESTS
const fs=require('fs');//  needed to access the readFile and WriteFile functions
var myJSON=new user();
var totalUsers=0

console.log("myJSON before read");
console.log(myJSON)

readJSON();
console.log("myJSON after read");
console.log(myJSON)

//Tests
//  var temp = myJSON["users"][1];
// console.log("Taking an element from the .json file and storing user as variable ");
// //console.log(temp);
//  //temp.name='asd';
// console.log(temp.channelList);
// temp.JoinChannel("channel");
// // temp.JoinChannel('CHANNEL 2');
// for (i = 0; i < temp.channelList.length; i++) {
//    console.log(temp.channelList[i]);
// }


//temp.addToJson();

// console.log("JSON after addToJSON:")
// console.log(myJSON)


// //id reader tester
// for (var i = 0; i < myJSON.length; i++) {
//     console.log(myJSON[i].id);
// }

//channel reader tester
// for (var i = 0; i < myJSON.length; i++) {
//    for (var j = 0; j < myJSON[i].channelList.length; j++) {
//        console.log(myJSON[i].channelList[j]);
//    }
// }
