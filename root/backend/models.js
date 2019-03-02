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

const Thankful = mongoose.model("Thankful", thankfulkSchema);

module.exports = { Thankful };
