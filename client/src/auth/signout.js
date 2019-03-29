import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import Card from "@material-ui/core/Card";

class Signout extends Component {
  componentDidMount() {
    this.props.signout();
  }
  render() {
    return (
      <div
        className="card"
        style={{ width: "40%", margin: "0 auto", padding: "50px" }}
      >
        <Card align="center" style={{ padding: "5px" }}>
          <h2 align={"center"}>Sorry to see you go!</h2>
        </Card>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Signout);
