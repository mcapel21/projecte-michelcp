const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathURL = "/api";
    //Middlewares
    this.middlewares();

    this.routes(); //rutes de l'app
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
