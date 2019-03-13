import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import ModalRoot from "../modalRoot.js";
import { showModal, hideModal } from "../actions/modal.js";

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal()),
  showModal: (modalProps, modalType) => {
    dispatch(showModal({ modalProps, modalType }));
  }
});

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  }
});

class IGoal extends React.Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.openEditModal = this.openEditModal.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  closeModal(event) {
    this.props.hideModal();
  }

  onInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  showInput(event) {
    console.log(this.state);
  }

  openEditModal(event) {
    const goals = this.props.goal;
    this.props.showModal(
      {
        open: true,
        closeModal: this.closeModal,
        goals: goals
      },
      "edit"
    );
  }

  render() {
    const igoal = this.props.goal;

    return (
      <div>
        <div className="idea-body">
          <p className="title">{igoal.answer}</p>

          <button className="add-button" onClick={this.openEditModal}>
            Edit
          </button>
        </div>

        <ModalRoot />
      </div>
    );
  }
}

IGoal.propTypes = {
  classes: PropTypes.object.isRequired
};

const wrapper = withStyles(styles)(IGoal);

export default connect(
  null,
  mapDispatchToProps
)(wrapper);
