const express = require("express");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathURL = "/api";
    //Middlewares
    this.middlewares();

    //connectar a la bd
    this.conectarDB();

    this.routes(); //rutes de l'app
  }

  async conectarDB() {
    console.log("Connectant . . .");
    await dbConnection();
  }

  middlewares() {
    //Lectura i parseig del body
    this.app.use(express.json());

    //DIRECTORI públic
    this.app.use(express.static("public"));
  }

  routes() {
    //middleware
    this.app.use(this.pathURL, require("../routes/usuaris"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("servidor funcionant en el port " + this.port);
    });
  }
}

module.exports = Server;
