
class channel {

    constructor(name, id, userList) {
        this.setName(name);                           //a user shall have a username to differentiate themselves from other users
        this.createID();                              //a user shall have their own id which will be used by the program to sort through users
        this.userList = [];                        //a user shall have access to all the channels they are a in and shall see all joined channels
        addList(name)
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

    //a function that adds a new channel to the list of already created channels


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
            myJSON["Channels"].push(this);
            writeJSON(); //save new JSON list to the .json file

            console.log("Successfully added to JSON")
        }
        else
            console.log("User already exists!")         //Can be transformed to an error message

    }


}

//Global function that can and will be used multiple times
function readJSON (){
    var data=["a"];
    //var temp=require("./Channel.json");
    myJSON=fs.readFile("./Channel.json", (err, data) => {
        if (err) {
            console.error(err)
            return
        }
        data=JSON.parse(data);
        //console.log("Inside fs.readfile: ");
        data=JSON.stringify(data);
        for (i=0;i<data.length;i++){
            channelList.push(data[i]);
        }
    })

    console.log("After the fs.readfile:");


    // var temp=[];
    // for (var i=0; i<myJSON.length;i++){
    //     temp.push(myJSON[i]);
    // }
    // console.log(temp);

}

//Global Rewrite file with new JSON objects
function writeJSON() {
    fs.writeFile("Channel.json", JSON.stringify(channelList), function (err) {

        if (err) {
            return console.log(err);
        }


    });
}

function addList(channelName) {
    var found = false;
    try{
        for (var j = 0; j < channelList.length; j++) {
            if (channelList[j] === channelName) {
                //Channel Alerady Exists
                found = true;
                break;
            }
        }

        if (found === false) {
            channelList.push(channelName);
            console.log("channel created");
        }
    }
    catch (err) {
        channelList.push(channelName);
        console.log("channel created");
    }
    writeJSON();
    //this function shall must make sure that the channel exists, fetch its id, and add it to the user's channel list
};

const fs=require('fs');
var channelList=[];
var myJSON=new channel();


//readJSON();

testChannelList();


//channel list tester
function testChannelList() {
    temp = new channel(30);
    temp = new channel(40);
    console.log(channelList)
}
