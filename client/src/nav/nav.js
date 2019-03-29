import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { connect } from "react-redux";
import { compose } from "redux";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  button: {
    margin: 10
  }
};

const NavBar = props => {
  const { classes } = props;

  function renderLinks() {
    if (props.authenticated) {
      return (
        <div>
          <div>
            <Link to="/signout">
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                style={{ textDecoration: "none" }}
              >
                Signout
              </Button>
            </Link>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
            >
              Signup
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              className={classes.button}
              variant="outlined"
              color="secondary"
            >
              Login
            </Button>
          </Link>
        </div>
      );
    }
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.grow}
            style={{ textDecoration: "none" }}
          >
            <Link to="/journal" style={{ textDecoration: "none" }}>
              My Journal
            </Link>
          </Typography>

          {renderLinks()}
        </Toolbar>
      </AppBar>
    </div>
  );
};

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(NavBar);
