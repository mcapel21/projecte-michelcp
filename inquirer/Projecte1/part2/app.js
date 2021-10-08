require("colors");
const { inquirerMenu, pausa, posFila, posCol } = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");
const reservasala = require("./models/reservasala");
const main = async () => {
  let opt = "";
  //const tasques = new Tasques();

  //   const tasquesDB = readDB();
  //   if (tasquesDB) {
  //     tasques.carregarTasquesFromArray(tasquesDB);
  //   }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        //Nova reserva
        const fila = await posFila("Fila (1-6): ");
        const columna = await posCol("Columna (1-6): ");
        if (reservasala.crearReserva(fila, columna)) {
          //reservasala.crearReserva is not a function
          console.log(`Aquest seient ja es ocupat!`);
        }
        //Consultar si lloc disponible
        //Si disponible fer reserva, si no informem esta agafat
        break;

      case "2":
        //Mostrar sala
        reservasala.mostrarSala();
        break;

      case "3":
        //Mostrar recaudació
        // tasques.llistarTasquesCompletades();
        break;

      case "4":
        //Eliminar reserva
        // tasques.llistarTasquesPendents();
        break;

      default:
        break;
    }
    //guardarDB(tasques.llistatArr);
    await pausa();
  } while (opt !== "0");
};

main();
