import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.jsx';
import Manager from './components/Manager.jsx';
import io from 'socket.io-client';
import Questions from './components/Questions.jsx';
import { toast } from 'react-toastify';


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
  componentDidMount() {
    const socketUrl = (import.meta && import.meta.env && import.meta.env.VITE_SOCKET_URL) || 'http://localhost:8083';
    const socket = io(socketUrl);
    this.socket = socket;
    socket.on('connect', this.connect);
    socket.on('disconnect', this.disconnect);
    socket.on('welcome', this.isLoggedIn);
    this.setState({ socket });
  }

  componentWillUnmount() {
    if (this.socket) {
      this.socket.off('connect', this.connect);
      this.socket.off('disconnect', this.disconnect);
      this.socket.off('welcome', this.isLoggedIn);
      this.socket.disconnect();
    }
  }




  connect = () => { // Function to handle initial connection.
    const socketId = this.socket ? this.socket.id : 'unknown';
    toast.success(`Connection Successful: ${socketId}`);
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
    this.setState({ // Trying to get the pageTitle I set in the server
      users: fromServer.users,
      title: fromServer.title,
      questions: fromServer.questions


    })

  }

  render() {

    return (
      <div className="container">
        <h2 id="live-members" className="navbar navbar-primary bg-primary">Live Members: {this.state.users ? this.state.users.length : "connecting..."}</h2>

        {/*The below should be rendering my page title but does not... why!!!*/}
        <Header
          title={this.state.title}
          status={this.state.status}
        />

        <Manager {...this.state} />


        <Questions {...this.state} />



      </div>
    );
  }
}

export default App;
