import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import * as actions from "../actions";
import { Link } from "react-router-dom";

export class DisplayGoal extends React.Component {
  componentDidMount() {
    this.props.fetchGoals();
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.goal);
    console.log(prevProps.goal);
    if (this.props.goal !== prevProps.goal) {
      //this.props.fetchGoals();
    }

    // this.props.fetchGoals(goal);
    // this.renderGoal();
  }
  //---------------Render functions--------------------//
  renderGoalToday() {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "today") {
        return (
          <Card>
            <div className="idea" key={index}>
              <div className="idea-body" key={goal.id} id={goal.id}>
                <p className="title">{goal.answer}</p>
                <div className="rendered-idea-button" />
              </div>
            </div>
          </Card>
        );
      }
    });
  }

  renderGoalMonthly() {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "monthly") {
        return (
          <Card>
            <div className="idea" key={index}>
              <div className="idea-body" key={goal.id} id={goal.id}>
                <p className="title">{goal.answer}</p>
                <div className="rendered-idea-button" />
              </div>
            </div>
          </Card>
        );
      }
    });
  }

  renderGoalQuarterly() {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "quarterly") {
        return (
          <Card>
            <div className="idea" key={index}>
              <div className="idea-body" key={goal.id} id={goal.id}>
                <p className="title">{goal.answer}</p>
                <div className="rendered-idea-button" />
              </div>
            </div>
          </Card>
        );
      }
    });
  }

  renderGoalYearly() {
    return this.props.goal.map((goal, index) => {
      if (goal.type === "year") {
        return (
          <Card>
            <div className="idea" key={index}>
              <div className="idea-body" key={goal.id} id={goal.id}>
                <p className="title">{goal.answer}</p>
                <div className="rendered-idea-button" />
              </div>
            </div>
          </Card>
        );
      }
    });
  }

  renderButtons(goal) {
    return (
      <div className="render-edit">
        <Link to={`/edit/${goal.id}`}>
          <button className="add-button">Edit</button>
        </Link>
        <Link to={`/delete/${goal.id}`}>
          <button className="delete-button">Delete</button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>
          <h4>Current Goals</h4>
          <div>{this.renderGoalToday()}</div>
        </div>
        <div>
          <h4>Monhtly Goals</h4>
          <div>{this.renderGoalMonthly()}</div>
        </div>
        <div>
          <h4>Quarterly Goals</h4>
          <div>{this.renderGoalQuarterly()}</div>
        </div>
        <div>
          <h4>Yearly Goals</h4>
          <div>{this.renderGoalYearly()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { goal: Object.values(state.goal) };
};

export default connect(
  mapStateToProps,
  actions
)(DisplayGoal);
