import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import LoginComponent from './login/login';
import SignupComponent from './signup/signup';
import DashboardComponent from './dashboard/dashboard';

const firebase = require("firebase");
require("firebase/firestore"); // Required for side-effects?????

firebase.initializeApp({
    apiKey: "AIzaSyCNgJUPndiG4RGvbyAXI6VybK4yw52mrkg",
    authDomain: "soen341project-58a44.firebaseapp.com",
    databaseURL: "https://soen341project-58a44.firebaseio.com",
    projectId: "soen341project-58a44",
    storageBucket: "soen341project-58a44.appspot.com",
    messagingSenderId: "871528591072",
    appId: "1:871528591072:web:ff4cefa8f1ca0d9212aa85",  
});

const routing = (
  <Router>
    <div id='routing-container'>
      <Route path='/login' component={LoginComponent}></Route>
      <Route path='/signup' component={SignupComponent}></Route>
      <Route path='/dashboard' component={DashboardComponent}></Route>
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById('root'));