"use strict";

exports.DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost/course";
exports.TEST_DATABASE_URL =
  process.env.TEST_DATABASE_URL || "mongodb://localhost/test-course";
exports.PORT = process.env.PORT || 8080;
exports.JWT_SECRET = process.env.JWT_SECRET;
