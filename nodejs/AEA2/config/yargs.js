const opts = {
  nom: {
    demand: true, //obliga
    alias: "n", //abreviar i ja escriu automaticament el paramentre
  },
  hores: {
    alias: "h",
    default: 0,
  },
};

const argv = require("yargs")
  //.command("buscar", "Imprimeix en consola un alumne el seu nom i hores", opts)
  .command("crear", "Genera un fitxer amb el nom i hores d'un alumne.", opts)
  .help().argv;

module.exports = {
  argv,
};
