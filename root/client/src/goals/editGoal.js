import _ from "lodash";
import React from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import AddGoal from "../forms/addGoalForm.js";

class EditGoal extends React.Component {
  componentDidMount() {
    this.props.fetchGoal(this.props.goals.id);
  }

  //Submits the form
  onSubmit = formValues => {
    this.props.editGoal(this.props.goals.id, formValues);
  };

  render() {
    if (!this.props.goal) {
      return (
        <div className="edit-content">
          <h1>loading...</h1>
        </div>
      );
    }
    return (
      <div className="new">
        <AddGoal
          initialValues={_.pick(this.props.goals, "answer", "type")}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { goal: state.goal };
};

export default connect(
  mapStateToProps,
  actions
)(EditGoal);
