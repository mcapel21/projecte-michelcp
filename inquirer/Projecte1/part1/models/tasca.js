const { v4: uuidv4 } = require("uuid");

class Tasca {
  id = "";
  nom = "";
  estat = "pendent";

  constructor(nom, estat) {
    this.id = uuidv4();
    this.nom = nom;
    this.estat = estat;
  }
}

module.exports = Tasca;
