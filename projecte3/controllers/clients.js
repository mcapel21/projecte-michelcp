const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Client = require("../models/client");

const clientsGet = async (req = request, res = response) => {
  const clients = await Client.find();
  res.json({
    clients,
  });
};

const clientsPost = async (req, res = response) => {
  const { nom, estat, correu, password, rol, tlf, google } = req.body;
  const client = new Client({
    nom,
    estat,
    correu,
    password,
    rol,
    tlf,
    google,
  });

  // Encriptar passwd
  const salt = bcryptjs.genSaltSync();
  client.password = bcryptjs.hashSync(password, salt);

  await client.save();

  res.json({
    client,
  });
};

const updateClients = async (req, res = response) => {
  const { nom, estat, correu, password, rol, tlf, google } = req.body;
  const client = await Client.updateOne(
    { correu: req.params.correu },
    {
      $set: {
        nom: req.body.nom,
        estat: req.body.estat,
        password: req.body.password,
        rol: req.body.rol,
        tlf: req.body.tlf,
        google: req.body.google,
      },
    }
  );
  const clients = await Client.find();
  res.json({
    clients,
  });
};

//https://docs.mongodb.com/manual/tutorial/query-documents/
const deleteClients = async (req, res = response) => {
  const client = await Client.deleteOne({
    clients: { correu: req.params.correu },
  });

  const clients = await Client.find();
  res.json({
    clients,
  });
};

module.exports = {
  clientsGet,
  clientsPost,
  deleteClients,
  updateClients,
};
