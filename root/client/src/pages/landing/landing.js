import React, { Component } from "react";
import LazyHero from "react-lazy-hero";
import image from "../../assets/priscilla-du-preez-95313-unsplash.jpg";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

const styles = theme => ({
  content: {
    flexGrow: 1,

    padding: theme.spacing.unit * 3
  },

  paper: {
    padding: theme.spacing.unit
  }
});

const Landing = props => {
  const { classes } = props;
  return (
    <div className="landing-page">
      <LazyHero imageSrc={image}>
        <h1 class="display-4">Resist</h1>
        <h1 class="display-4">&</h1>
        <h1 class="display-4">Persist</h1>
      </LazyHero>
      <div>
        <Paper className={classes.paper}>
          <Typography component="p" align="center" gutterBottom gutterTop>
            This daily journal will help you write down whats most important and
            get your day started right!
          </Typography>
          <div className={classes.content}>
            <Grid
              container
              spacing={16}
              direction="column"
              alignItems="center"
              justify="center"
              className={classes.container}
            >
              <Grid item xs={12} />
              <Grid item xs={12}>
                <Button variant="raised" color="primary">
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} />
            </Grid>
          </div>
        </Paper>
      </div>
    </div>
  );
};

Landing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Landing);
