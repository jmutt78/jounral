import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";
import notRequireAuth from "./notRequireAuth.js";

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
    <label>{label}</label>
    <div>
      <input
        className="form-control"
        {...input}
        placeholder={label}
        type={type}
      />
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

class Login extends React.Component {
  onSubmit = formProps => {
    this.props.signin(formProps);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div class="card">
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
              <button class="btn btn-primary" type="submit">
                Signin!
              </button>
            </div>
          </div>
        </form>
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
