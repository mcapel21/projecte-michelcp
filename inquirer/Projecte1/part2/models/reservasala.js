const Reserva = require("./reserva");
class Reservasala {
  sala = [
    ["U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U"],
    ["U", "U", "U", "U", "U", "U"],
  ];
  _llista = {
    abc: 123,
  };

  mostrarSala() {
    for (let f = 0; f < 6; f++) {
      for (let c = 0; c < 6; c++) {
        console.log(sala[f][c]);
      }
    }
  }

  crearReserva(fila, columna) {
    reserves.forEach((reserva) => {
      if (reserva.fila == fila && reserva.columna == columna) {
        return true;
      }
    });
    const reserva = new Reserva(fila, columna);
    this._llista[reserva.id] = reserva;
  }
  carregarReservesFromArray(reserves = []) {
    reserves.forEach((reserva) => {
      this._llista[reserva.id] = reserva;
    });
  }
}
