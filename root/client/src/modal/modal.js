import React from "react";
import ReactDOM from "react-dom";
import Modal from "@material-ui/core/Modal";

const Modals = props => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss}
      id="modal"
      className="ui dimmer modals visible active center"
      align="center"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui modal visible active "
        align="center"
      >
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modals;
