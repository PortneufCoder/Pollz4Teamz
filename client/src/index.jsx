import React from 'react';
import { createRoot } from 'react-dom/client';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import { ErrorsPage } from './components/Errors.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// let NotFoundRoute = Router.Errors;


// Only way I could setup my routes the way I want,
// was to move them here. I think its because of the way I changed my
// component rendering when I setup React alerts?


const Root = () => (
  <BrowserRouter>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <>
            <App />
            <ToastContainer position="top-right" autoClose={5000} />
          </>
        )}
      />
      <Route component={ErrorsPage} />
    </Switch>
  </BrowserRouter>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Root />);
