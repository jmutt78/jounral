import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../actions";

export class DisplayThankful extends React.Component {
  componentDidMount(thankful) {
    this.props.fetchThankful(thankful);
    this.renderThankful();
  }

  renderThankful() {
    return this.props.idea.map((thankful, index) => {
      return (
        <div className="idea" key={index}>
          <div className="idea-body" key={thankful.id} id={thankful.id}>
            <h2 className="title">{thankful.idea}</h2>
            <div className="rendered-idea-button" />
            {this.renderButtons(thankful)}
          </div>
        </div>
      );
    });
  }
  renderButtons(thankful) {
    return (
      <div className="render-edit">
        <Link to={`/edit/${thankful.id}`}>
          <button className="add-button">Edit</button>
        </Link>
        <Link to={`/delete/${thankful.id}`}>
          <button className="delete-button">Delete</button>
        </Link>
      </div>
    );
  }

  render() {
    return (
      <div className="idea-app-page">
        <div>{this.renderThankful()}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { thankful: Object.values(state.thankful) };
};

export default connect(
  mapStateToProps,
  actions
)(DisplayThankful);
