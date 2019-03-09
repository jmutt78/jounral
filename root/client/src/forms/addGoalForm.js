import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";

class AddGoal extends React.Component {
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
          placeholder="Enter Your Goal"
          multiline={true}
          rows={1}
          style={{ width: 400 }}
          {...input}
        />
        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  renderGoals = ({ input, meta, ...rest }) => {
    return (
      <div>
        <RadioGroup
          {...input}
          {...rest}
          valueSelected={input.value}
          style={{ padding: "10px", marginRight: "30px" }}
          row
        />

        <div>{this.renderError(meta)}</div>
      </div>
    );
  };

  //Submits the form
  onSubmit = formValues => {
    this.props.onSubmit(formValues);
  };

  render() {
    return (
      <div className="goal-content">
        <form
          onSubmit={this.props.handleSubmit(this.onSubmit)}
          className="add form error"
        >
          <div className="form-group" role="form">
            <Field
              name="goal"
              component={this.renderInput}
              className="text-goal"
            />

            <Field name="type" component={this.renderGoals}>
              <FormControlLabel
                value="today"
                control={<Radio selected color="primary" />}
                label="Today"
                labelPlacement="start"
              />
              <FormControlLabel
                value="monthly"
                control={<Radio color="primary" />}
                label="Monthly"
                labelPlacement="start"
              />
              <FormControlLabel
                value="quarterly"
                control={<Radio color="primary" />}
                label="Quarterly"
                labelPlacement="start"
              />
              <FormControlLabel
                value="year"
                control={<Radio color="primary" />}
                label="This Year"
                labelPlacement="start"
              />
            </Field>
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
  if (!formValues.goal) {
    errors.goal = "Please enter your goals";
  }
  if (!formValues.type) {
    errors.type = "Select a Type";
  }

  return errors;
};

//wrapper for the form and the com
export default reduxForm({
  form: "goalForm",
  validate
})(AddGoal);
