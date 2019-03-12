import React from "react";
import ReactDOM from "react-dom";
import "./modal.css";

const Modal = props => {
  return ReactDOM.createPortal(
    <div
      onClick={props.onDismiss}
      id="modal"
      className="ui dimmer modals visible active center"
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active "
      >
        <div className="actions">{props.actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
