import React from 'react';
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";

import Register from "./Register";
import Login from "./LoginForm";
import Account from './Account';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Link to="/users/register">Register</Link>
        <Link to="/users/login">Login</Link>
      </div>
      <Switch>
        <Route exact path="/users/register" component={Register}/>
        <Route exact path="/users/login" component={Login}/>
        <Route exact path="/users/account" component={Account}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
