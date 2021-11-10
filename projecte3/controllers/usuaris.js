const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuari = require("../models/usuari");
const { check } = require("express-validator");

const usuarisGet = async (req = request, res = response) => {
  const usuaris = await Usuari.find();
  res.json({
    usuaris,
  });
};

const usuarisPost = async (req, res = response) => {
  const { nom, estat, correu, password, rol, google } = req.body;
  const usuari = new Usuari({
    nom,
    estat,
    correu,
    password,
    rol,
    google,
  });

  // Encriptar passwd
  const salt = bcryptjs.genSaltSync();
  usuari.password = bcryptjs.hashSync(password, salt);

  await usuari.save();

  res.json({
    usuari,
  });
};

const updateUsuaris = async (req, res = response) => {
  const { nom, estat, correu, password, rol, google } = req.body;
  const usuari = await Usuari.updateOne(
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
    const usuaris = await Usuari.find();
    res.json({
      usuaris,
    });
  } else {
    const Error = `No s'ha pogut actualitzar usuari: ${req.params.correu}`;
    res.json({
      Error,
    });
  }
};

//https://docs.mongodb.com/manual/tutorial/query-documents/
const deleteUsuaris = async (req, res = response) => {
  const usuari = await Usuari.deleteOne({ correu: req.params.correu });
  if (usuari.deletedCount != 0) {
    const usuaris = await Usuari.find();
    res.json({
      usuaris,
    });
  } else {
    const Error = `No s'ha pogut eliminar usuari: ${req.params.correu}`;
    res.json({
      Error,
    });
  }
};

module.exports = {
  usuarisGet,
  usuarisPost,
  deleteUsuaris,
  updateUsuaris,
};
