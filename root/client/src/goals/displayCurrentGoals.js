import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import * as actions from "../actions";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import IGoal from "./indyGoal.js";
import EditGoal from "./editGoal";
import DeleteGoal from "./deleteGoal";

const styles = {
  goalCard: {
    paddingLeft: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    width: "500px",
    marginTop: "5px",
    marginBottom: "5px"
  }
};

export class DisplayGoal extends React.Component {
  state = {
    isModalOpen: false,
    goalId: null
  };

  componentDidMount() {
    this.props.fetchGoals();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log(this.props);
  //   console.log(prevProps);
  //   if (prevProps.goal !== this.props.goal) {
  //   }
  //   // this.props.fetchGoals();
  // }

  handleModalOpen = goalId => {
    this.setState({
      isModalOpen: true,
      goalId
    });
  };

  handleModalClose = () => {
    this.setState({
      isModalOpen: false,
      goalId: null
    });
  };

  //---------------Render functions--------------------//
  renderGoalToday(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "today") {
        return (
          <div className="idea" key={index}>
            <Table className={classes.table}>
              <TableHead />
              <TableBody>
                <TableCell align="left">
                  <IGoal goal={goal} openModal={this.handleModalOpen} />
                </TableCell>
              </TableBody>
            </Table>
          </div>
        );
      }
    });
  }

  renderGoalMonthly(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "monthly") {
        return (
          <div className="idea" key={index}>
            <Table className={classes.table}>
              <TableHead />
              <TableBody>
                <TableCell align="left">
                  <IGoal goal={goal} openModal={this.handleModalOpen} />
                </TableCell>
              </TableBody>
            </Table>
          </div>
        );
      }
    });
  }

  renderGoalQuarterly(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "quarterly") {
        return (
          <div className="idea" key={index}>
            <Table className={classes.table}>
              <TableHead />
              <TableBody>
                <TableCell align="left">
                  <IGoal goal={goal} openModal={this.handleModalOpen} />
                </TableCell>
              </TableBody>
            </Table>
          </div>
        );
      }
    });
  }

  renderGoalYearly(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "year") {
        return (
          <div className="idea" key={index}>
            <Table className={classes.table}>
              <TableHead />
              <TableBody>
                <TableCell align="left">
                  <IGoal goal={goal} onClose={this.handleModalClose} />
                </TableCell>
              </TableBody>
            </Table>
          </div>
        );
      }
    });
  }

  render() {
    const { classes } = this.props;
    const { isModalOpen } = this.state;
    return (
      <div>
        <Card className={classes.goalCard}>
          <h4 align="center">Current Goals</h4>
          <div>{this.renderGoalToday(classes)}</div>
        </Card>
        <Card className={classes.goalCard}>
          <h4 align="center">Monhtly Goals</h4>
          <div>{this.renderGoalMonthly(classes)}</div>
        </Card>
        <Card className={classes.goalCard}>
          <h4 align="center">Quarterly Goals</h4>
          <div>{this.renderGoalQuarterly(classes)}</div>
        </Card>
        <Card className={classes.goalCard}>
          <h4 align="center">Yearly Goals</h4>
          <div>{this.renderGoalYearly(classes)}</div>
        </Card>
        <Modal open={isModalOpen} onClose={this.handleModalClose}>
          <EditGoal
            goalId={this.state.goalId}
            onClose={this.handleModalClose}
          />
        </Modal>
        <Modal open={isModalOpen} onClose={this.handleModalClose}>
          <DeleteGoal
            goalId={this.state.goalId}
            onClose={this.handleModalClose}
          />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { goal: Object.values(state.goal) };
};

const styleWrapper = withStyles(styles)(DisplayGoal);

export default connect(
  mapStateToProps,
  actions
)(styleWrapper);
