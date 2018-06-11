import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './components/Header';
import Team from './components/Team';
import Manager from './components/Manager';
import Errors from './components/Errors';
import HStyle from './components/HStyle.css';
import Display from './components/Display';
import { withAlert } from 'react-alert'
import io from 'socket.io-client';
import Join from './components/Join';

class App extends Component {

  state = {
    status: 'disconnected',
    //The initial state is disconnected(so there is only initially a user when the page loads), then when the app is rendered,
    //it switches to connected.
    title: '',
    manager: {}

  }

  componentWillMount() {
    this.socket = io('http://localhost:8083');
    this.socket.on('connect', this.connect);
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('welcome', this.isLoggedIn)
  }

  

  connect = () => { // Function to handle initial connection.
    this.props.alert.show(`Connection Successful: ${this.socket.id}`);
    this.setState({
      status: 'connected'
      
    });
    // When the user loads the page, connection status is changed.
    // this alert method uses React alerts to replace the ugly Chrome one.
    // On connection, I recieve a unique socket ID.
  }

  joined = (manager) => {
    sessionStorage.manager = JSON.stringify(manager)
    this.setState({
      manager: manager
    });
  }

  

  disconnect = () => { // This will be the state when someone disconnects.
    this.setState({
      status: 'disconnected'
    })
  }
  
  isLoggedIn = (fromServer) => {
    this.setState ({ // Trying to get the pageTitle I set in the server
      title: fromServer.title
      
    })
    
  }

  render() {
   


    return (
      <div className="container">
      
        {/*The below should be rendering my page title but does not... why!!!*/}
        <Header 
        title={this.state.title} 
        status={this.state.status} 
        />
         
        <Team 
        {...this.state} //spread operator will pass whatever I got in state
         // emit fn passed down as properties to the children
         
        />
        <Manager 
        {...this.state} 
        />
        
        <Display
        {...this.state}
        
        />
        

      </div>
    );
  }
}

export default withAlert(App);
