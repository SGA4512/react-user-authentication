import React from 'react';
import {BrowserRouter, Link, Switch, Route} from "react-router-dom";

import Register from "./Register";
import Login from "./LoginForm";
import Account from './Account';
import Logout from "./Logout";

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isAuth: false
    }
  }

  handleAuth = (bool) => {
    this.setState({ isAuth: bool })
  }

  componentDidMount() {
    if(localStorage.getItem("userAuthToken")) {
      this.setState({ isAuth: true })
    }
  }

  render() {
    console.log(this.state.isAuth)
    return (
    <BrowserRouter>
      <div>
        { !this.state.isAuth && (
          <>
            <Link to="/users/register">Register</Link>
            <Link to="/users/login">Login</Link>
          </>
        )}
        { this.state.isAuth && (
          <>
            <Link to="/users/account">Account</Link>
            <Link to="/users/logout">Logout</Link>
          </>
        )}
      </div>
      <Switch>
        <Route exact path="/users/register" component={Register}/>
        <Route exact path="/users/login" render={(props) => {
          return <Login {...props} handleAuth={this.handleAuth}/>
        }}/>
        <Route exact path="/users/account" component={Account}/>
        <Route exact path="/users/logout" render={(props) => {
          return <Logout {...props} handleAuth={this.handleAuth}/>
        }}/>
      </Switch>
    </BrowserRouter>
    );
  }
}
