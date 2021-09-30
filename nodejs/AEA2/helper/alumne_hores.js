const fs = require("fs");
const { number } = require("yargs");

const crearAlumne = (nom, hores = 0) => {
  //console.log(`${typeof nom} = ${nom}`);
  //******** DUBTES ************/
  //!String(nom) -- Perquè no va?
  //node app.js crear -nom xxx = true ?
  //node app.js crear --n/--nom/-n xxx -- OK
  if (typeof nom == "number") {
    console.log("Ha de ser un nom vàlid en format text!");
    return;
  }
  if (!Number(hores) && hores != 0) {
    console.log("Ha de ser numeric les hores!");
    return;
  }
  console.log("===========");
  console.log("--> Alumne " + nom + " amb " + hores + " hores creat/da <--");
  console.log("===========");

  let sortida = "";
  sortida = "--> Alumne: " + nom + " --- Hores: " + hores;
  fs.writeFileSync(`${nom}.txt`, sortida);
};

module.exports = {
  crearAlumne,
};
