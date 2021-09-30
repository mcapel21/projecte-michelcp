const fs = require("fs");

const crearAlumnes = (nom = "no_name", hores = 0) => {
  console.log("===========");
  console.log("--> Alumne " + nom + " amb " + hores + " creat/da <--");
  console.log("===========");

  let sortida = "";
  sortida = "--> Alumne: " + nom + " hores: " + hores;
  fs.writeFileSync(`${nom}.txt`, sortida);
};

module.exports = {
  crearAlumnes,
};
