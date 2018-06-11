import React, { Component } from 'react';
import { render } from 'react-dom';
import { Provider as AlertProvider } from 'react-alert'
import { Route, Router, Switch, Redirect } from 'react-router';
import Errors from './components/Errors';
import AlertTemplate from 'react-alert-template-basic'
import './index.css';
import App from './App';


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
let Transfer = Router.Redirect;

// Only way I could setup my routes the way I want,
// was to move them here. I think its because of the way I changed my 
// component rendering when I setup React alerts?


class Root extends Component  {
    render () {
      return ( // This component is handling my logged-in alerts.
        <AlertProvider template={AlertTemplate} {...options}>
          <App />
        </AlertProvider>
      )
    }
  }

  <Switch>
      <Route 
      path={`/`} // Currently the page goes straight to team which shows twice. Need to show only title first arrgghhh!
      />
    <Route // When the app loads, I want to first go to the manager Route
     name="Manager" path={`/manager`}
    />
     <Route 
    name="Team" exact path={`/team`}
    />
    <Transfer from="/*" to="Errors" /> 
    </Switch> // I need to switch any invalid route to my error page.

render(<Root />, document.getElementById('root'));

