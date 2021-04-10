import React, { Component } from 'react'
import './App.css';
import {Route, BrowserRouter as Router, Switch} from "react-router-dom"
import Welcome from './Components/Welcome';
import UserDashboard from './Components/UserDashboard';
import AdminDashboard from './Components/AdminDashboard';


export class App extends Component {
  render() {
    return (
      <Router>
       <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/userdashboard" component={UserDashboard}/>
          <Route path="/admindashboard" component={AdminDashboard}/>
       </Switch>
      </Router>
    );
  }
}

export default App

