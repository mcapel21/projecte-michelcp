const Tasca = require("./tasca");
class Tasques {
  _llista = {
    abc: 123,
  };

  get llistatArr() {
    const llistat = [];
    Object.keys(this._llista).forEach((key) => {
      const tasca = this._llista[key];
      llistat.push(tasca);
    });
    return llistat;
  }

  constructor() {
    this._llista = {};
  }

  crearTasca(nom = "", estat) {
    const tasca = new Tasca(nom, estat);
    this._llista[tasca.id] = tasca;
  }
  carregarTasquesFromArray(tasques = []) {
    tasques.forEach((tasca) => {
      this._llista[tasca.id] = tasca;
    });
  }

  llistarTasques() {
    console.log(); // sóc un salt de línia

    let conta = 0;
    this.llistatArr.forEach((tasca) => {
      const { nom, estat } = tasca;
      conta += 1;
      if (estat == "completada") {
        console.log(`${(conta + ".").yellow} ${nom} - ` + "COMPLETADA".green);
      } else {
        console.log(`${(conta + ".").yellow} ${nom} - ` + "PENDENT".red);
      }
    });
  }

  llistarTasquesCompletades() {
    console.log(); // sóc un salt de línia

    let conta = 0;
    this.llistatArr.forEach((tasca) => {
      const { nom, estat } = tasca;
      conta += 1;
      if (estat == "completada") {
        console.log(`${(conta + ".").yellow} ${nom} - ` + "COMPLETADA".green);
      }
    });
  }
  llistarTasquesPendents() {
    console.log(); // sóc un salt de línia

    let conta = 0;
    this.llistatArr.forEach((tasca) => {
      const { nom, estat } = tasca;
      conta += 1;
      if (estat == "pendent") {
        console.log(`${(conta + ".").yellow} ${nom} - ` + "PENDENT".red);
      }
    });
  }

  intercambiarCompletades(ids = []) {
    //posem a completats
    ids.forEach((id) => {
      if (ids != "0") {
        const tasca = this._llista[id];
        if (tasca.estat == "pendent") {
          tasca.estat = "completada";
        } else {
          tasca.estat = "pendent";
        }
      }
    });
  }

  async nomTasca(id) {
    const tasca = this._llista[id];
    return tasca.nom;
  }

  async eliminarTasca(id) {
    delete this._llista[id];
  }
}

module.exports = Tasques;
