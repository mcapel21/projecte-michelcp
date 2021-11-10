const express = require("express");
const app = express();

app.use(require("./users"));
// app.use(require('./auth'));
// app.use(require('./peidos'));

module.exports = app;
