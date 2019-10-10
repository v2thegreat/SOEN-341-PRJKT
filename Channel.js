
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

//Global function that creates a new Channel that will be called by the html code
function createChannel(name){
    var ch=new channel(name);
}

//Global function that Reads the json file. (BUG: Reading works, but can only store the data locally??)
function readJSON (){
    var temp= {"Channels":[]};
    //Reads the contents of the json file and stores it as a string in var: data
    fs.readFile('Channel.json', 'utf8', function read(err, data){
        if (err){
            console.log(err);
        } else {
            data=JSON.parse(data);  //data is now an object
            console.log("Inside fs.readfile: ");
            console.log(data);

            for(var i=0;i<data["Channels"].length;i++){
                temp["Channels"].push(data["Channels"][i]);
            }
            console.log("ChannelList after for loop")
            console.log(temp);
            return temp;
        }

    });

    console.log("After the fs.readfile:");
    console.log(channelList)



}

//Global Rewrite file with new JSON objects (UPDATE: Make it create Channel.json if it doesnt already exist)
function writeJSON() {

    var json=JSON.stringify(channelList);
    fs.readFile('Channel.json', 'utf8', function read(err, data){
        if (err){
            console.log(err);
        } else {
            data = JSON.parse(data); //now it an object
            // console.log("Data extracted from Channel.json")
            // console.log(data);
            // console.log("Channel List BEFORE addition")
             console.log(data.length)

            for(var i=0;i<data["Channels"].length;i++)  //adds the readData to the channelLIst
            channelList["Channels"].push(data["Channels"][i]);
            //console.log("channelList after addition")
            //console.log(channelList);
            //convert it back to json
            //Replace the data inside the .json file with the new channelList
           fs.writeFile ("Channel.json", JSON.stringify(channelList), function(err) {
                if (err) throw err;
                //console.log('complete');
            });
        }
    })


}

//Global function that adds the name of the new channel to channelList (NEEDS UPDATE: Check the json file if channel already exists)
function addList(channelName) {
    var found = false;
    try{
        //Go through each channel in the channel list to make sure there are no duplicates
        for (var j = 0; j < channelList.length; j++) {
            if (channelList["Channels"][j] === channelName) {
                //Channel Alerady Exists, don't add
                found = true;
                break;
            }
        }

        //Channel was not found. add to the list
        if (found === false) {
            channelList["Channels"].push(channelName);
            console.log("channel created");
        }
    }
    catch (err) {
        channelList["Channels"][0]=channelName;
        console.log("First Channel Created");
    }

    //this function shall must make sure that the channel exists, fetch its id, and add it to the user's channel list
};

const fs=require('fs');
let channelList={Channels:[]};

//Tests
//var myJSON=new channel();

testChannelList();
//TestRead();

//channel list tester
function testChannelList() {
    temp = new channel("Channel 1");
    temp = new channel("Temporary Channel");
    console.log(channelList)
    writeJSON();
}
//Readfile tester
function testRead(){
    channelList=readJSON();
    console.log("Out")
    console.log(channelList);
}