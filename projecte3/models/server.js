const express = require("express");

const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.apiPath = "/api";

    // Connectar a la base de dades
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // Rutes de l'aplicació
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    // Lectura i parseig del body
    this.app.use(express.json());

    // Directori públic
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.apiPath, require("../routes/usuaris")),
      this.app.use(this.apiPath, require("../routes/clients")),
      this.app.use(this.apiPath, require("../routes/serveis"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor funcionant en el port:", this.port);
    });
  }
}

module.exports = Server;
