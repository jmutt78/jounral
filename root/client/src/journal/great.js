import React, { Component } from "react";
import { connect } from "react-redux";
import AddGreatForm from "../forms/addGreatForm.js";

import * as actions from "../actions";

class Great extends React.Component {
  //Submits the form
  onSubmit = formValues => {
    this.props.addJournal(formValues);
  };

  render() {
    const placeholder = "What would make today great?";
    const daily = "Enter a daily affirmation";
    return (
      <div>
        <AddGreatForm
          onSubmit={this.onSubmit}
          placeholder={placeholder}
          daily={daily}
        />
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Great);
