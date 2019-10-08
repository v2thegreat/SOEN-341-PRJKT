class user {

    constructor(name, id, channelList) {
        this.setName(name);                           //a user shall have a username to differentiate themself from other users
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

    //Function that generates a unique id for the user
    createID() {
        //this function shall make sure that the user has a UNIQUE id before associating it to the user
        //the user id will be created as the user is created and will be equal to their order based on previous users
        if (myJSON.length == null) {
            //start the user count at 1, if no other users exist
            this.id = 1;
            totalUsers++;
        }
        else {
            let loc = myJSON.length
            this.id = myJSON[loc - 1].id + 1;
            totalUsers++;
        }
    }

    //a function that adds a new channel to the list of already joined channels (Can ve UPDATED)
    addChannel(channelName) {
        var found = false;
        for (var j = 0; j < this.channelList.length; j++) {
            if (this.channelList[i] == channelName) {
                found = true;
                break;
            }
        }

        if (found == false) {
            this.channelList.push(channelName);
        }
        //this function shall must make sure that the channel exists, fetch its id, and add it to the user's channel list
    }


    //Function to Search specific IDs to make sure there are no repeats
    searchJSON() {
        var found = false;
        for (var i = 0; i < myJSON.length; i++) {
            if (myJSON[i].id == this.id) {
                found = true;
                break;
            }
        }
        return found;
    }


    //Function that will add ther user to the JSON file
    addToJson() {
        //this function must only add the user if the id is non-identical to a previous one, otherwise it should display an error
        if (this.searchJSON() == false) {
            myJSON.push(this)
        }
        else
            console.log("User already exists!")         //Can be transformed to an error message

    }


}


//TESTS
var myJSON = [{ name: 'Admin', id: 1, channelList: ['channel'] }]         //this starts the JSON with a pre-made object
//const fs = require('fs');

//Tests
var temp = new user;
var totalUsers = 0;
temp.setName('asd');
//console.log(temp.name);
temp.addChannel('channel 1');
temp.addChannel('CHANNEL 2');
//for (i = 0; i < temp.channelList.length; i++) {
//    console.log(temp.channelList[i]);
//}
//console.log(temp.id);

temp.addToJson();

//id reader tester
for (var i = 0; i < myJSON.length; i++) {
    console.log(myJSON[i].id);
}

//channel reader tester
//for (var i = 0; i < myJSON.length; i++) {
//    for (var j = 0; j < myJSON[i].channelList.length; j++) {
//        console.log(myJSON[i].channelList[j]);
//    }
//}




//Add to file
//fs.writeFile("Users.json", JSON.stringify(myJSON), function (err) {

//    if (err) {
//        return console.log(err);
//    }

//    console.log("The file was saved!");
//});