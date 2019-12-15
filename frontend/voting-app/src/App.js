import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header';
//import Team from './components/Team';
import Manager from './components/Manager';
import Errors from './components/Errors';
import HStyle from './components/HStyle.css';
import { withAlert } from 'react-alert'
import io from 'socket.io-client';
import Join from './components/Join';
import Questions from './components/Questions';
import Graph from './components/Graph';

const BarChart = require("react-chartjs-2").Bar;


class App extends Component {

  state = {
    status: 'disconnected',
    //The initial state is disconnected(so there is only initially a user when the page loads), then when the app is rendered,
    //it switches to connected.
    title: '',
    manager: {},
    users: null,
    questions: [],
    socket: null
   

  }



  componentWillMount() {
    this.state.socket = io('http://localhost:8083');
    this.state.socket.on('connect', this.connect);
    this.state.socket.on('disconnect', this.disconnect);
    this.state.socket.on('welcome', this.isLoggedIn);
  
   
    
  }



  

  connect = () => { // Function to handle initial connection.
    this.props.alert.show(`Connection Successful: ${this.state.socket.id}`);
    this.setState({
      status: 'connected'
      
    });
    // When the user loads the page, connection status is changed.
    // this alert method uses React alerts to replace the ugly Chrome one.
    // On connection, I recieve a unique socket ID.
  }

  joined = (manager) => {
    sessionStorage.manager = JSON.stringify(manager)
    console.log(manager)
    this.setState({
      manager: manager
    });
  }

  

  disconnect = () => { 
    console.log()// This will be the state when someone disconnects.
    this.setState({
      status: 'disconnected'
    })
  }
  
  isLoggedIn = (fromServer) => {
    console.log(fromServer)
    this.setState ({ // Trying to get the pageTitle I set in the server
      users: fromServer.users,
      title: fromServer.title,
      questions: fromServer.questions
     
      
    })
    
  }

  render() {

    return (
      <div className="container">
        <h2 id="live-members" class="navbar navbar-primary bg-primary">Live Members: {this.state.users ? this.state.users.length : "connecting..."}</h2>
       
        {/*The below should be rendering my page title but does not... why!!!*/}
        <Header 
        title={this.state.title} 
        status={this.state.status} 
        />

        <Manager 
        {...this.state} 
        />

  
        <Questions 
        {...this.state}
        />

       

      </div>
    );
  }
}

export default withAlert(App);
