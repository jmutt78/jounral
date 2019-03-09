import React, { Component } from "react";
//----------------material ui----------------//
import Card from "@material-ui/core/Card";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
//---------------components-----------------//

import Thankful from "../journal/thankful.js";
import Goals from "../goals/goals.js";
import requireAuth from "../auth/requireAuth.js";
import DisplayGoal from "../goals/displayCurrentGoals.js";

const styles = {
  card: {
    minWidth: 275,
    margin: "25px",
    padding: "15px"
  }
};

class Home extends Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props;
    return (
      <Paper square>
        <Tabs
          value={this.state.value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
          centered
        >
          <Tab label="New Journal" />

          <Tab label="Past Jounral" />
          <Tab label="Current Goals" />
          <Tab label="Completed Goals" />
        </Tabs>
        {/*<------Add Jounral Component Dispaly------------>*/}
        {value === 0 && (
          <Grid
            container
            spacing={16}
            direction="column"
            alignItems="center"
            justify="center"
            className={classes.container}
          >
            <Grid item xs={12}>
              <Card className={classes.card}>
                <Thankful />
              </Card>
            </Grid>
          </Grid>
        )}
        {/*<------Add Goal Component Dispaly------------>*/}
        {value === 2 && (
          <Grid container spacing={24} className={classes.container}>
            <Grid item xs={6} sm={6}>
              <Card className={classes.card}>
                <Goals />
              </Card>
            </Grid>
            <Grid item xs={6} sm={6}>
              <DisplayGoal />
            </Grid>
          </Grid>
        )}
      </Paper>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

const wrapper = requireAuth(Home);

export default withStyles(styles)(wrapper);
