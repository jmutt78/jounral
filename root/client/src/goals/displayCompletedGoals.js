import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";
import { withStyles } from "@material-ui/core/styles";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Check from "@material-ui/icons/Check";
import Paper from "@material-ui/core/Paper";
import Modal from "@material-ui/core/Modal";
import IGoal from "./indyGoal.js";

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

export class DisplayCompletedGoal extends React.Component {
  // state = {
  //   isModalOpen: false,
  //   modalType: null,
  //   modalProps: {},
  //   goalId: null
  // };

  componentDidMount() {
    this.props.fetchGoals();
  }

  // handleModalOpen = (modalType, modalProps) => {
  //   this.setState({
  //     isModalOpen: true,
  //     modalType,
  //     modalProps
  //   });
  // };
  //
  // handleModalClose = () => {
  //   this.setState({
  //     isModalOpen: false,
  //     modalType: null,
  //     modalProps: {},
  //     goalId: null
  //   });
  // };

  //---------------Render functions--------------------//
  renderGoalToday(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "today" && goal.completed !== false) {
        return (
          <div className="idea" key={index}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <IGoal goal={goal} openModal={this.handleModalOpen} />
              </ListItem>
            </List>
          </div>
        );
      }
    });
  }

  renderGoalMonthly(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "monthly" && goal.completed !== false) {
        return (
          <div className="idea" key={index}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <IGoal goal={goal} openModal={this.handleModalOpen} />
              </ListItem>
            </List>
          </div>
        );
      }
    });
  }

  renderGoalQuarterly(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "quarterly" && goal.completed !== false) {
        return (
          <div className="idea" key={index}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <IGoal goal={goal} openModal={this.handleModalOpen} />
              </ListItem>
            </List>
          </div>
        );
      }
    });
  }

  renderGoalYearly(classes) {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "year" && goal.completed !== false) {
        return (
          <div className="idea" key={index}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <Check />
                </ListItemIcon>
                <IGoal goal={goal} openModal={this.handleModalOpen} />
              </ListItem>
            </List>
          </div>
        );
      }
    });
  }

  // renderModalChild = (modalType, modalProps) => {
  //   const props = {
  //     ...modalProps,
  //     onClose: this.handleModalClose,
  //     closeModal: this.handleModalClose
  //   };
  //   const modalChildren = {
  //     edit: <EditGoal {...props} />,
  //     delete: <DeleteGoal {...props} />,
  //     complete: <CompleteGoal {...props} />
  //   };
  //   return modalChildren[modalType] ? modalChildren[modalType] : null;
  // };

  render() {
    const { classes } = this.props;
    //const { isModalOpen, modalType, modalProps } = this.state;
    return (
      <div className={classes.goalCard}>
        <Paper>
          <List
            component="nav"
            subheader={<ListSubheader component="div">Goals</ListSubheader>}
            className={classes.root}
          >
            <ListItem>
              <ListItemText
                disableSticky={true}
                primary={<h5>Current Goals</h5>}
              />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderGoalToday(classes)}</div>
            </List>
            <ListItem>
              <ListItemText primary={<h5>Monhtly Goals</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderGoalMonthly(classes)}</div>
            </List>
            <ListItem>
              <ListItemText primary={<h5>Quarterly Goals</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderGoalQuarterly(classes)}</div>
            </List>
            <ListItem>
              <ListItemText primary={<h5>Yearly Goals</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderGoalYearly(classes)}</div>
            </List>
          </List>
        </Paper>

        {/*----------Modal feature-----------------
        <Modal open={isModalOpen} onClose={this.handleModalClose}>
          {this.renderModalChild(modalType, modalProps)}
        </Modal>*/}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { goal: Object.values(state.goal) };
};

const styleWrapper = withStyles(styles)(DisplayCompletedGoal);

export default connect(
  mapStateToProps,
  actions
)(styleWrapper);
