import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { reset } from "redux-form";

class AddForm extends React.Component {
  //Checks to see if the user has an error and displays the error
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="idea-error">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  //Renders the input field
  renderInput = ({ input, meta }) => {
    return (
      <div>
        <TextField
          variant="outlined"
          placeholder={this.props.placeholder}
          multiline={true}
          rows={1}
          style={{ width: 400 }}
          {...input}
        />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  //Submits the form
  onSubmit = (formValues, dispatch) => {
    this.props.onSubmit(formValues);
    dispatch(reset("thankForm")); // requires form name
  };

  onReset = dispatch => {
    dispatch(reset("thankForm")); // requires form name
  };
  render() {
    return (
      <div className="thank-content">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="add form error"
          name="thankForm"
        >
          <div className="form-group" role="form">
            <Field
              name="thankful"
              component={this.renderInput}
              className="text-idea"
            />
          </div>
          <div className="buttons-together">
            <Button style={{ padding: "10px" }} variant="outlined">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}
//validates the form
const validate = formValues => {
  const errors = {};
  if (!formValues.thankful) {
    errors.thankful = "Please enter what you are thankful for";
  }

  return errors;
};

//wrapper for the form and the com
export default reduxForm({
  form: "thankForm",
  validate
})(AddForm);
