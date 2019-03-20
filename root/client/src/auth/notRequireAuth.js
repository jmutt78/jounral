import React, { Component } from "react";
import { connect } from "react-redux";

export default ChildComponent => {
  class NotComposedComponent extends Component {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }
    shouldNavigateAway() {
      if (this.props.auth) {
        this.props.history.push("/journal");
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { auth: state.auth.authenticated };
  }
  return connect(mapStateToProps)(NotComposedComponent);
};
