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
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
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
      <TextField
        style={{ width: "85%" }}
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

class Forgot extends React.Component {
  onSubmit = formProps => {
    this.props.forgortPassword(formProps);
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <div
        className="card"
        style={{ width: "40%", margin: "0 auto", padding: "50px" }}
      >
        <Card align="center" style={{ padding: "5px" }}>
          <h2>Enter Your Email</h2>
          <form className="form-group" onSubmit={handleSubmit(this.onSubmit)}>
            <div className="login-input">
              <Field
                name="email"
                type="email"
                component={renderField}
                label="Email"
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
                  Submit!
                </button>
              </div>
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

const wrapper = notRequireAuth(Forgot);

export default compose(
  connect(
    mapStateToProps,
    actions
  ),
  reduxForm({ form: "forgot", validate })
)(wrapper);
