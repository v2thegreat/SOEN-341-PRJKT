import React from 'react';
import logo from './logo.svg';
import './App.css';

class Channel{
  constructor(id = null, name = null, userLst= null) {
    this.id = id;
    this.name = name;
    this.userLst = userLst;
  }
  set cname(name){
    this.name = name;
  }
  get cname(){
    return this.name;
  }
  add_user(userID){
    this.userLst.push(userID);
  }
  remove_user(userIDToRemove){
    for (var i = 0; i < this.userLst.length; i++){
      if (this.userLst[i] === userIDToRemove){
        this.userLst.splice(i, 1);
        break;
      }
    }
  }
}

function App() {
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
          >
            Testing Hello World
          </a>
        </header>
      </div>
  );
}
function test_Channels() {
  var myCar = new Channel(12, 34, [333]);
  myCar.add_user(124);
  for (var i = 0; i < myCar.userLst.length; i++) {
    console.log(myCar.userLst[i]);
  }
  console.log("Finished adding, trying removing");
  myCar.remove_user(124);
  for (i = 0; i < myCar.userLst.length; i++) {
    console.log(myCar.userLst[i]);
  }
}
console.log("Running tests for channels");
test_Channels();
export default App;
