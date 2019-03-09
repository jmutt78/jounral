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
    created: this._created,
    answer: this._answer
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

const Thankful = mongoose.model("Thankful", thankfulkSchema);
const Daily = mongoose.model("Daily", dailySchema);

module.exports = { Thankful, Daily };
