require("colors");
const {
  inquirerMenu,
  pausa,
  posFila,
  posCol,
  reservaSelect,
  confirmar,
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");
const Reservasal = require("./models/reservasala");
const main = async () => {
  let opt = "";
  const reservasala = new Reservasal();

  const reservesDB = readDB();
  if (reservesDB) {
    reservasala.carregarReservesFromArray(reservesDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        //Nova reserva
        const fila = await posFila("Fila (1-6): ");
        const columna = await posCol("Columna (1-6): ");
        reservasala.crearReserva(fila, columna, reservasala.llistatArr);
        break;

      case "2":
        //Mostrar sala
        reservasala.mostrarSala(reservasala.llistatArr);
        break;

      case "3":
        //Mostrar recaudació
        reservasala.mostrarRecaudacio(reservasala.llistatArr);
        // tasques.llistarTasquesCompletades();
        break;

      case "4":
        //Eliminar reserva
        const id_elim = await reservaSelect(reservasala.llistatArr);
        if (id_elim !== 0) {
          const ok = await confirmar(
            `Estas segur que vols eliminar la reserva ?`
          );
          if (ok) {
            reservasala.eliminarReserva(id_elim);
          }
        }
        break;

      default:
        break;
    }
    guardarDB(reservasala.llistatArr);
    await pausa();
  } while (opt !== "0");
};

main();
