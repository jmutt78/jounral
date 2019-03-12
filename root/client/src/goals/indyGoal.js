import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Modal from "../modal/modal.js";

import * as actions from "../actions";

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class IGoal extends React.Component {
  render(goal) {
    const { classes } = this.props.goal;
    const igoal = this.props.goal;

    return (
      <div>
        <div className="idea-body" key={igoal.id} id={igoal.id}>
          <p className="title">{igoal.answer}</p>
          <Link to={`/edit-goal/${igoal.id}`}>
            <button className="add-button">Edit</button>
          </Link>
        </div>
      </div>
    );
  }
}

IGoal.propTypes = {
  classes: PropTypes.object.isRequired
};

const wrapper = withStyles(styles)(IGoal);

export default connect(
  null,
  actions
)(wrapper);
