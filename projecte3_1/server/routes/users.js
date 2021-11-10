const express = require("express");

const bcrypt = require("bcryptjs");

const User = require("../models/user");
const Servei = require("../models/servei");

const app = express();
const { emailExisteix } = require("../helpers/db-validators");
const { check, validationResult } = require("express-validator");

app.get("/user", (req, res) => {
  User.find().exec((err, usuaris) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuaris,
    });
  });
});

app.post("/user", (req, res) => {
  let body = req.body;
  let user = new User({
    nom: body.nom,
    correu: body.correu,
    estat: body.estat,
    rol: body.rol,
    password: bcrypt.hashSync(body.password, 10),
    google: body.google,
  });

  user.save((err, userDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      user: userDB,
    });
  });
});

app.put("/user/:correu", async (req, res = response) => {
  const usuari = await User.updateOne(
    { correu: req.params.correu },
    {
      $set: {
        nom: req.body.nom,
        estat: req.body.estat,
        password: req.body.password,
        rol: req.body.rol,
        google: req.body.google,
      },
    }
  );
  if (usuari.matchedCount != 0) {
    const usuaris = await User.find();
    res.json({
      usuaris,
    });
  } else {
    const Error = `No s'ha pogut actualitzar usuari: ${req.params.correu}`;
    res.json({
      Error,
    });
  }
});

app.delete("/user/:correu", async (req, res = response) => {
  const usuari = await User.deleteOne({ correu: req.params.correu });
  if (usuari.deletedCount != 0) {
    const usuaris = await User.find();
    res.json({
      usuaris,
    });
  } else {
    const Error = `No s'ha pogut eliminar usuari: ${req.params.correu}`;
    res.json({
      Error,
    });
  }
});

app.get("/serveis", async (req = request, res = response) => {
  const serveis = await Servei.find();
  res.json({
    serveis,
  });
});

module.exports = app;
