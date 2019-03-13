import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import EditGoal from "../goals/editGoal.js";

class EditModal extends React.Component {
  render() {
    const { closeModal } = this.props;
    const goals = this.props.goals;
    return (
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="close-button"
            aria-label="Close"
            onClick={closeModal}
          >
            <span aria-hidden="true">&times;</span>
          </button>
          <EditGoal goals={goals} />
        </div>
      </div>
    );
  }
}

export default EditModal;
