"use strict";

exports.DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost/my-journal-app";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-my-journal-app";
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
