import React from "react";
import { Field, reduxForm } from "redux-form";

import { connect } from "react-redux";
import { compose } from "redux";
import notRequireAuth from "./notRequireAuth.js";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

import * as actions from "../actions";

const validate = values => {
  const errors = {};
  if (!values.firstname) {
    errors.firstname = "Required";
  }
  if (!values.lastname) {
    errors.lastname = "Required";
  }
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 10) {
    errors.password = "Password has to be at least 10 characters";
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

class Signup extends React.Component {
  onSubmit = formProps => {
    this.props.signup(formProps, () => {});
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div
        className="card"
        style={{ width: "40%", margin: "0 auto", padding: "50px" }}
      >
        <Card align="center" style={{ padding: "5px" }}>
          <h2>Please Signup</h2>
          <form onSubmit={handleSubmit(this.onSubmit)}>
            <Field
              name="firstname"
              type="text"
              component={renderField}
              label="First Name"
            />
            <Field
              name="lastname"
              type="text"
              component={renderField}
              label="Last Name"
            />
            <Field
              name="email"
              type="email"
              component={renderField}
              label="Email"
            />
            <Field
              name="password"
              type="text"
              component={renderField}
              label="Password"
            />
            <div>
              <div>{this.props.errorMessage}</div>
              <br />
              <button
                class="btn btn-primary"
                type="submit"
                style={{ padding: "10px" }}
                variant="outlined"
              >
                Signup!
              </button>
            </div>
          </form>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

const wrapper = notRequireAuth(Signup);

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "signsup", validate })
)(wrapper);
