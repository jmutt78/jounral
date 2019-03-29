import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions";

import { withStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarBorder from "@material-ui/icons/StarBorder";
import Paper from "@material-ui/core/Paper";

const styles = {
  heading: {
    fontWeight: 800
  }
};

export class DisplayJournals extends React.Component {
  componentDidMount() {
    this.props.fetchJournals();
    this.props.fetchThankfuls();
  }

  //---------------Render functions--------------------//
  renderGreatToday(classes, journal) {
    return this.props.journal.map((journal, index) => {
      //-------------Format Date---------------//
      let d = new Date(),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      let newDates = [year, month, day].join("-");
      let formatedDate = newDates + "T00:00:00.000Z";

      //--------------map the jounrals-----------//
      if (formatedDate === journal.created) {
        return (
          <div className="idea" key={index}>
            <div>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <div className="idea-body" key={journal.id} id={journal.id}>
                  <p className="title">{journal.great}</p>
                </div>
              </ListItem>
            </div>
          </div>
        );
      }
    });
  }

  renderDailyToday(classes, journal) {
    return this.props.journal.map((journal, index) => {
      //-------------Format Date---------------//
      let d = new Date(),
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
            <div>
              <ListItem className={classes.nested}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <div className="idea-body" key={journal.id} id={journal.id}>
                  <p className="title">{journal.daily}</p>
                </div>
              </ListItem>
            </div>
          </div>
        );
      }
    });
  }

  renderThankulToday(classes, journal) {
    return this.props.thankful.map((thankful, index) => {
      //-------------Format Date---------------//
      let d = new Date(),
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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper>
          <List
            component="nav"
            subheader={
              <ListSubheader disableSticky={true} component="div">
                Today Journal
              </ListSubheader>
            }
            className={classes.root}
          >
            <ListItem>
              <ListItemText primary={<h5>Thankful For</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <div>{this.renderThankulToday(classes)}</div>
            </List>
            <ListItem onClick={this.handleClick}>
              <ListItemText primary={<h5>What would make today great?</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <div>{this.renderGreatToday(classes)}</div>
              </ListItem>
            </List>
            <ListItem onClick={this.handleClick}>
              <ListItemText primary={<h5>Daily Affimation</h5>} />
            </ListItem>
            <List component="div" disablePadding>
              <ListItem className={classes.nested}>
                <div>{this.renderDailyToday(classes)}</div>
              </ListItem>
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

const styleWrapper = withStyles(styles)(DisplayJournals);

export default connect(
  mapStateToProps,
  actions
)(styleWrapper);
