import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider as AlertProvider } from 'react-alert'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import {ErrorsPage} from './components/Errors';
import AlertTemplate from 'react-alert-template-basic'
import './index.css';
import App from './App';
import Graph from './components/Graph';


if (module.hot) {
    module.hot.accept();
}

const options = {
    position: "top right",
    timeout: 5000,
    offset: '30px',
    transition: 'fade'
}

// let NotFoundRoute = Router.Errors;


// Only way I could setup my routes the way I want,
// was to move them here. I think its because of the way I changed my 
// component rendering when I setup React alerts?


class Root extends Component  {
    render () {
      return ( // This component is handling my logged-in alerts.
        <div>
            <BrowserRouter>
            <Switch>
            <Route exact path="/" render={
            () => (<AlertProvider template={AlertTemplate} {...options}>
                <App />
            </AlertProvider>)} />

            <Route path="/" component={ ErrorsPage } />
            <Route path="/Graph" render={props => <Graph {...props} />}/>
            </ Switch>
            </BrowserRouter>
        </div>
      )
    }
  }

render(<Root />, document.getElementById('root'));

