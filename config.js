"use strict";

exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb+srv://justin:Ndz45MXVU5xxTVQ@myserver-hddae.mongodb.net/myDB?retryWrites=true";
exports.myDB_DATABASE_URL =
  process.env.myDB_DATABASE_URL || "mongodb+srv://justin:Ndz45MXVU5xxTVQ@myserver-hddae.mongodb.net/myDB?retryWrites=true";
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;