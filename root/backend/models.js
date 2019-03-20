"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const thankfulkSchema = mongoose.Schema({
  userId: { type: String },
  created: { type: Date, default: new Date().toLocaleDateString() },
  answer: [{ type: String }]
});

thankfulkSchema.methods.serialize = function() {
  return {
    id: this._id,
    userId: this.userId,
    created: this.created,
    answer: this.answer
  };
};

const dailySchema = mongoose.Schema({
  created: { type: Date, default: new Date().toLocaleDateString() },
  userId: { type: String },
  type: { type: String },
  answer: { type: String },
  completed: { type: Boolean, default: false }
});

dailySchema.methods.serialize = function() {
  return {
    id: this._id,
    userId: this.userId,
    created: this.created,
    type: this.type,
    answer: this.answer,
    completed: this.completed
  };
};

const greatSchema = mongoose.Schema({
  userId: { type: String },
  created: { type: Date, default: new Date().toLocaleDateString() },
  daily: { type: String },
  great: { type: String }
});

greatSchema.methods.serialize = function() {
  return {
    id: this._id,
    userId: this.userId,
    created: this.created,
    daily: this.daily,
    great: this.great
  };
};

const Thankful = mongoose.model("Thankful", thankfulkSchema);
const Daily = mongoose.model("Daily", dailySchema);
const Great = mongoose.model("Great", greatSchema);

module.exports = { Thankful, Daily, Great };
