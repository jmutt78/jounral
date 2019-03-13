import _ from "lodash";
import React from "react";
import { connect } from "react-redux";
import history from "../history";
import { Link } from "react-router-dom";
import * as actions from "../actions";
import AddGoal from "../forms/addGoalForm.js";

import Card from "@material-ui/core/Card";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  card: {
    minWidth: 420,
    margin: "25px",
    padding: "15px",
    width: "50px"
  },
  page: {
    minWidth: 420
  }
};

class EditGoal extends React.Component {
  componentDidMount() {
    this.props.fetchGoal(this.props.match.params.id);
  }

  onSubmit = formValues => {
    this.props.editGoal(this.props.match.params.id, formValues);
  };

  render() {
    const { classes } = this.props;
    if (!this.props.goal) {
      return (
        <React.Fragment>
          <div className="edit-content">
            <h1>loading...</h1>
          </div>
        </React.Fragment>
      );
    }
    return (
      <div className={classes.page}>
        <Card align="center" className={classes.card}>
          <AddGoal
            initialValues={_.pick(this.props.goal, "goal", "type")}
            onSubmit={this.onSubmit}
          />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { goal: state.goal[ownProps.match.params.id] };
};

EditGoal.propTypes = {
  classes: PropTypes.object.isRequired
};
const wrapper = withStyles(styles)(EditGoal);

export default connect(
  mapStateToProps,
  actions
)(wrapper);
