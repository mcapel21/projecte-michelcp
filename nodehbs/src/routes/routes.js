const express = require("express");
const app = express.Router();

app.use(require("./index")); //middleware

module.exports = app;

// (!) el handlebars nomes funciona si utilitzem el router()
// (!) no funciona directament amb express!
