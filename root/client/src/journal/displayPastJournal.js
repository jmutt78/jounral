import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "@material-ui/core/Card";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from "@material-ui/icons/StarBorder";
import Paper from "@material-ui/core/Paper";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";

import * as actions from "../actions";

const styles = {
  goalCard: {
    paddingLeft: "15px",
    paddingTop: "15px",
    paddingBottom: "15px",
    width: "500px",
    marginTop: "5px",
    marginBottom: "5px"
  },
  grid: {
    width: "60%"
  }
};

export class DisplayPast extends React.Component {
  state = {
    // The first commit of Material-UI
    selectedDate: new Date()
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  componentDidMount() {
    this.props.fetchJournals();
    this.props.fetchThankfuls();
  }

  //---------------Render functions--------------------//
  renderGreatPast(classes, selectedDate, journal) {
    return this.props.journal.map((journal, index) => {
      //-------------Format Date---------------//
      let d = selectedDate,
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let newDates = [year, month, day].join("-");
      let formatedDate = newDates + "T07:00:00.000Z";
      //--------------map the jounrals-----------//
      if (formatedDate === journal.created) {
        return (
          <div className="idea" key={index}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <div className="idea-body" key={journal.id} id={journal.id}>
                  <p className="title">{journal.great}</p>
                </div>
              </ListItem>
            </List>
          </div>
        );
      }
    });
  }

  renderDailyPast(classes, selectedDate, journal) {
    return this.props.journal.map((journal, index) => {
      //-------------Format Date---------------//
      let d = selectedDate,
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let newDates = [year, month, day].join("-");
      let formatedDate = newDates + "T07:00:00.000Z";

      //--------------map the jounrals-----------//
      if (formatedDate === journal.created) {
        return (
          <div key={index}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <div className="idea-body" key={journal.id} id={journal.id}>
                  <p className="title">{journal.daily}</p>
                </div>
              </ListItem>
            </List>
          </div>
        );
      }
    });
  }

  renderThankulPast(classes, selectedDate, journal) {
    return this.props.thankful.map((thankful, index) => {
      //-------------Format Date---------------//
      let d = selectedDate,
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let newDates = [year, month, day].join("-");
      let formatedDate = newDates + "T07:00:00.000Z";

      //--------------map the jounrals-----------//
      if (formatedDate === thankful.created) {
        return (
          <div key={index}>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <div className="idea-body" key={thankful.id} id={thankful.id}>
                  <p className="title">{thankful.answer}</p>
                </div>
              </ListItem>
            </List>
          </div>
        );
      }
    });
  }

  renderDatePicker(selectedDate, classes) {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container className={classes.grid} justify="space-around">
          <form>
            <DatePicker
              margin="normal"
              label="Date picker"
              value={selectedDate}
              onChange={this.handleDateChange}
            />
          </form>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }

  render() {
    console.log(this.state);
    const { selectedDate } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <div className={classes.goalCard} align="center">
          {this.renderDatePicker(selectedDate, classes)}
        </div>
        <Paper>
          <List
            component="nav"
            subheader={<ListSubheader component="div">Journals</ListSubheader>}
            className={classes.root}
          >
            <ListItem>
              <ListItemText primary={<h5>Thankful For</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderThankulPast(classes, selectedDate)}</div>
            </List>
            <ListItem>
              <ListItemText primary={<h5>What would make today great?</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderGreatPast(classes, selectedDate)}</div>
            </List>
            <ListItem>
              <ListItemText primary={<h5>Daily Affimation</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderDailyPast(classes, selectedDate)}</div>
            </List>
          </List>
        </Paper>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    journal: Object.values(state.journal),
    thankful: Object.values(state.thankful)
  };
};

const styleWrapper = withStyles(styles)(DisplayPast);

export default connect(
  mapStateToProps,
  actions
)(styleWrapper);
