import React, { Component } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "./history";
import Landing from "./pages/landing/landing.js";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Landing} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
