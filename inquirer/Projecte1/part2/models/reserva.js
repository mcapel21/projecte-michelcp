const { v4: uuidv4 } = require("uuid");

class Reserva {
  id = "";
  fila = 0;
  col = 0;
  constructor(fila, col) {
    this.id = uuidv4();
    this.fila = fila;
    this.col = col;
  }
}

module.exports = Reserva;
