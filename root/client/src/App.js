import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Landing from "./landing/landing.js";
import NavBar from "./nav/nav.js";
import Signout from "./auth/signout.js";
import Signup from "./auth/signup.js";
import Login from "./auth/login.js";
import Home from "./home/homePage.js";
import EditGoal from "./goals/editGoal.js";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/journal" component={Home} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/edit-goal/:id" component={EditGoal} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
