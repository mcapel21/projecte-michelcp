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
  const usuaris = await Usuari.find();
  res.json({
    usuaris,
  });
};

//https://docs.mongodb.com/manual/tutorial/query-documents/
const deleteUsuaris = async (req, res = response) => {
  const usuari = await Usuari.deleteOne({
    usuaris: { correu: req.params.correu },
  });

  const usuaris = await Usuari.find();
  res.json({
    usuaris,
  });
};

module.exports = {
  usuarisGet,
  usuarisPost,
  deleteUsuaris,
  updateUsuaris,
};
