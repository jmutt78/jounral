import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import notRequireAuth from "./notRequireAuth.js";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import * as actions from "../actions";

const validate = values => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Password has to be at least 8 characters";
  }
  return errors;
};

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <div>
    <TextField
      style={{ width: "85%" }}
      className="form-control"
      {...input}
      placeholder={label}
      type={type}
    />
    {touched &&
      ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </div>
);

class Login extends React.Component {
  onSubmit = formProps => {
    this.props.signin(formProps);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div
        className="card"
        style={{ width: "40%", margin: "0 auto", padding: "50px" }}
      >
        <Card align="center" style={{ padding: "5px" }}>
          <h2>Please Login</h2>
          <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="login-input">
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
              />
              <Field
                name="password"
                type="password"
                component={renderField}
                label="Password"
              />
            </div>
            <div>
              <div>{this.props.errorMessage}</div>
              <div>
                <br />

                <button
                  class="btn btn-primary"
                  type="submit"
                  style={{ padding: "10px" }}
                  variant="outlined"
                >
                  Signin!
                </button>
              </div>
            </div>
          </form>
          <Link to="/forgot">forgot password?</Link>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

const wrapper = notRequireAuth(Login);

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signin", validate })
)(wrapper);
