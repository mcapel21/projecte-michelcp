require("colors");

const {
  inquirerMenu,
  pausa,
  novaTasca,
  tascaSelect,
  tascaSelect2,
  confirmar,
} = require("./helpers/inquirer");
const { guardarDB, readDB } = require("./helpers/guardarFitxer");
const Tasques = require("./models/tasques");

const main = async () => {
  let opt = "";
  const tasques = new Tasques();

  const tasquesDB = readDB();
  if (tasquesDB) {
    tasques.carregarTasquesFromArray(tasquesDB);
  }

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        //Crear tasca
        const nomTasca = await novaTasca("Nom tasca:");
        tasques.crearTasca(nomTasca, "pendent");
        break;

      case "2":
        //Llistar tasques
        tasques.llistarTasques();
        break;

      case "3":
        //Llistar tasques completades
        tasques.llistarTasquesCompletades();
        break;

      case "4":
        //Llistas tasques pendents
        tasques.llistarTasquesPendents();
        break;

      case "5":
        //Completar tasques
        const ids = await tascaSelect(tasques.llistatArr); //TODO
        if (ids !== "0") {
          tasques.intercambiarCompletades(ids);
        }
        //tasques.completarTasques();
        break;

      case "6":
        //Borrar tasques
        const id_elim = await tascaSelect2(tasques.llistatArr);
        const nom = await tasques.nomTasca(id_elim);
        if (id_elim !== 0) {
          const ok = await confirmar(
            `Estas segur que vols eliminar la tasca: ${nom.yellow} ?`
          );
          if (ok) {
            tasques.eliminarTasca(id_elim);
          }
        }
        break;

      default:
        break;
    }
    guardarDB(tasques.llistatArr);
    await pausa();
  } while (opt !== "0");
};

main();
