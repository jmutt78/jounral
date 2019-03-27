import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { reset } from "redux-form";

class AddGreatForm extends React.Component {
  //Checks to see if the user has an error and displays the error
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="idea-error">
          <div
            id="standard-error"
            error={true}
            color={"red"}
            className="header"
          >
            {error}
          </div>
        </div>
      );
    }
  }

  //Renders the input field
  renderInput = ({ input, meta }) => {
    return (
      <div>
        <TextField
          placeholder={this.props.placeholder}
          multiline={true}
          variant="outlined"
          rows={1}
          style={{ width: 400, paddingBottom: "10px" }}
          {...input}
        />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  renderText = ({ input, meta }) => {
    return (
      <div>
        <TextField
          placeholder={this.props.daily}
          multiline={true}
          variant="outlined"
          multiline
          rows={4}
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
    dispatch(reset("great")); // requires form name
  };

  onReset = dispatch => {
    dispatch(reset("great")); // requires form name
  };
  render() {
    return (
      <div className="thank-content">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="add form error"
          name="great"
        >
          <div className="form-group" role="form">
            <Field
              name="great"
              component={this.renderInput}
              className="text-idea"
            />
            <Field
              name="daily"
              component={this.renderText}
              className="text-idea"
            />
          </div>
          <div className="buttons-together">
            <button style={{ padding: "10px" }} variant="outlined">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
//validates the form
const validate = formValues => {
  const errors = {};
  if (!formValues.great) {
    errors.great = "Please enter what would make today great";
  }
  if (!formValues.daily) {
    errors.daily = "Please enter a daily affirmation";
  }

  return errors;
};

//wrapper for the form and the com
export default reduxForm({
  form: "great",
  validate
})(AddGreatForm);
