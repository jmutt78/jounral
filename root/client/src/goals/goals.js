import React, { Component } from "react";
import { connect } from "react-redux";
import AddGoal from "../forms/addGoalForm.js";

import * as actions from "../actions";

class Goals extends React.Component {
  //Submits the form
  onSubmit = formValues => {
    this.props.addGoal(formValues);
  };

  render() {
    return (
      <div>
        <AddGoal onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Goals);
