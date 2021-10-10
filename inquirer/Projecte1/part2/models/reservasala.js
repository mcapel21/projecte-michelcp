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

  constructor() {
    this._llista = {};
  }

  mostrarRecaudacio(reserves) {
    console.log("Preu d'entrada: 10€".underline.bgMagenta);
    console.log("Total de recaudació: ".green + reserves.length * 10 + "€");
  }

  mostrarSala(reserves) {
    let arr = [];
    reserves.forEach((reserva) => {
      arr.push((reserva.fila - 1).toString() + (reserva.col - 1).toString());
    });
    console.log("██PANTALLA██".bgWhite.black);
    let cad = "";
    for (let f = 0; f < 6; f++) {
      cad = "";
      for (let c = 0; c < 6; c++) {
        if (arr.includes(f.toString() + c.toString())) {
          cad += this.sala[f][c].red + " ";
        } else {
          cad += this.sala[f][c].green + " ";
        }
      }
      console.log("\n" + cad);
    }
    console.log(`────┐ ┌────`);
    console.log(`   Entry   `.magenta);
  }

  get llistatArr() {
    const llistat = [];
    Object.keys(this._llista).forEach((key) => {
      const reserva = this._llista[key];
      llistat.push(reserva);
    });
    return llistat;
  }

  crearReserva(fila, columna, reserves) {
    let reservat = false;
    reserves.forEach((reserva) => {
      // console.log(
      //   "\nfila: " + typeof reserva.fila + " col: " + typeof reserva.col
      // );
      if (reserva.fila == fila && reserva.col == columna) {
        console.log("Ja es reservat!");
        reservat = true;
      }
    });
    if (!reservat) {
      const reserva = new Reserva(fila, columna);
      this._llista[reserva.id] = reserva;
    }
  }
  carregarReservesFromArray(reserves = []) {
    reserves.forEach((reserva) => {
      this._llista[reserva.id] = reserva;
    });
  }
  async eliminarReserva(id) {
    delete this._llista[id];
  }
}

module.exports = Reservasala;
