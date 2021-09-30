const argv = require("./config/yargs").argv;
const { crearAlumne } = require("./helper/alumne_hores");
let param = argv._[0]; //primer parametre
//console.log(param);

switch (param) {
  /*case "buscar":
    //buscarAlumne(argv.base, argv.limit);
    break;*/
  case "crear":
    crearAlumne(argv.nom, argv.hores);
    break;
  default:
    console.log("comanda no reconeguda");
}
