import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import PopupState, {
  bindTrigger,
  bindMenu
} from "material-ui-popup-state/index";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

import * as actions from "../actions";

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
  renderGoals = igoal => {
    if (this.props.goal.completed !== true) {
      return (
        <div>
          <div>
            <PopupState variant="popover" popupId="demo-popup-menu">
              {popupState => (
                <React.Fragment>
                  <IconButton {...bindTrigger(popupState)}>
                    <MoreVertIcon />
                  </IconButton>
                  {igoal.answer}
                  <Menu {...bindMenu(popupState)}>
                    <MenuItem
                      onClick={() =>
                        this.props.openModal("complete", { goalId: igoal.id })
                      }
                    >
                      Complete
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        this.props.openModal("delete", { goalId: igoal.id })
                      }
                    >
                      Delete
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        this.props.openModal("edit", { goalId: igoal.id })
                      }
                    >
                      Edit
                    </MenuItem>
                  </Menu>
                </React.Fragment>
              )}
            </PopupState>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="idea-body" key={igoal.id} id={igoal.id}>
            <p className="title">{igoal.answer}</p>
          </div>
        </div>
      );
    }
  };

  render(goal) {
    const { classes } = this.props.goal;
    const igoal = this.props.goal;

    return <div>{this.renderGoals(igoal)}</div>;
  }
}

IGoal.propTypes = {
  classes: PropTypes.object.isRequired
};

const wrapper = withStyles(styles)(IGoal);

export default connect(
  null,
  actions
)(wrapper);
