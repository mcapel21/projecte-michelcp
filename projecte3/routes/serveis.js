const { Router } = require("express");
const { response, request } = require("express");

const { check, validationResult } = require("express-validator");

const { serveisGet } = require("../controllers/serveis");

const { emailExisteix } = require("../helpers/db-validators");

const router = Router();

const validarCamps = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }
  next();
};

router.get("/", (req = request, res = response) => {
  res.send("Accés denegat...");
});

router.get("/serveis", serveisGet);

module.exports = router;
