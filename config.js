"use strict";

exports.DATABASE_URL =
<<<<<<< HEAD
  process.env.DATABASE_URL ||
  "mongodb+srv://justin:Ndz45MXVU5xxTVQ@myserver-hddae.mongodb.net/myDB?retryWrites=true";
exports.myDB_DATABASE_URL =
  process.env.myDB_DATABASE_URL ||
  "mongodb+srv://justin:Ndz45MXVU5xxTVQ@myserver-hddae.mongodb.net/myDB?retryWrites=true";
=======
  process.env.DATABASE_URL || "mongodb://localhost/journal";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-journal";
>>>>>>> 07b7fefcc0c480a5e79e9a5f266415c22fb56e88
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
