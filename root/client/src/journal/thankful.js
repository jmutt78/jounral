import React, { Component } from "react";
import { connect } from "react-redux";
import AddForm from "../forms/addForm.js";

import * as actions from "../actions";

class Thankful extends React.Component {
  //Submits the form
  onSubmit = formValues => {
    this.props.addThankful(formValues);
  };

  render() {
    return (
      <div>
        <AddForm onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Thankful);
