const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const url = require("url");

let serviceAccount = require("../../node-firebase-146ed-firebase-adminsdk-njzkm-8f4e6d2b9c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://node-firebase-146ed-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = admin.database();
//usuaris
const users = db.ref("users");
//cotxes
const cotxes = db.ref("cotxes");

router.get("/", (req, res) => {
  //console.log(req.session);
  res.render("home", {
    title: "Home",
    active: { Home: true },
    esAdmin: req.session.admin,
    user: req.session.user,
  });
});

router.get("/contacte", (req, res) => {
  res.render("contacte", {
    title: "Contacte",
    active: { Contacte: true },
    esAdmin: req.session.admin,
    user: req.session.user,
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    title: "Register",
    active: { Register: true },
    esAdmin: req.session.admin,
    user: req.session.user,
  });
});

router.get("/logout", function (req, res) {
  req.session.destroy();
  res.render("login", { title: "Login", active: { Login: true } });
});

router.get("/login", (req, res) => {
  res.render("login", {
    title: "Login",
    active: { Login: true },
    esAdmin: req.session.admin,
    user: req.session.user,
  });
});

let autenticar = function (req, res, next) {
  if (
    (req.session && req.session.user && req.session.admin) ||
    (req.session && req.session.user)
  )
    return next();
  else return res.render("login", { title: "Login", active: { Login: true } });
};

//compra
router.get("/compra", autenticar, (req, res) => {
  let dades;
  cotxes.on(
    "value",
    (snapshot) => {
      dades = snapshot.val();
      if (dades) {
        res.render("compra", {
          title: "Compra",
          active: { Compra: true },
          esAdmin: req.session.admin,
          user: req.session.user,
          cotxes: dades,
        });
      } else {
        res.render("compra", {
          title: "Compra",
          active: { Compra: true },
          esAdmin: req.session.admin,
          user: req.session.user,
        });
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
});

//COTXE - dades
/**
 * Marca
 * Model
 * Any
 * Km
 * Cv
 * Combustible
 * Descripcio del vendedor
 * Preu
 * Foto (mirar com fer-ho)
 */

router.post("/compra", autenticar, (req, res) => {
  //compra un cotxe
  const queryObject = url.parse(req.url, true).query;
  let key = queryObject.key;

  cotxes.child(key).update({
    //el cotxe ha sigut venut
    esVenut: true,
  });
  res.redirect("/compra");
});

router.post("/venta", autenticar, (req, res) => {
  let newCar;
  //Si foto buida, foto per defecte.
  //express-fileupload TODO
  if (!req.files) {
    newCar = {
      vendedor: req.session.user,
      marca: req.body.cmarca,
      model: req.body.cmodel,
      any: req.body.cany,
      km: req.body.ckm,
      cv: req.body.ccv,
      combustible: req.body.ccombustible,
      descripcio: req.body.cdescripcio,
      foto: "assets/img/default-car.png",
      preu: req.body.cpreu,
      esVenut: false,
    };
    //console.log(newCar);
    cotxes.push(newCar);
    res.render("/compra", {
      title: "Compra",
      active: { Venta: true },
      esAdmin: req.session.admin,
      user: req.session.user,
    });
  } else {
    //mirar si extensió es vàlida
  }
});

router.get("/venta", autenticar, (req, res) => {
  res.render("venta", {
    title: "Venta",
    active: { Venta: true },
    esAdmin: req.session.admin,
    user: req.session.user,
  });
});

router.post("/login", (req, res) => {
  users.once("value", (snapshot) => {
    const data = snapshot.val();
    let nom = req.body.nom;
    let psw = req.body.password;
    let error = true;
    //let adm = false;
    for (const camp in data) {
      //console.log(data[camp].nom);
      if (data[camp].nom == nom && data[camp].password == psw) {
        if (nom == "admin" && psw == "admin") {
          //adm = true;
          req.session.admin = true;
        } else {
          req.session.admin = false;
        }
        req.session.user = data[camp].nom;
        //user = data[camp];
        error = false;
      }
    }
    if (!error) {
      res.render("home", {
        active: { Home: true },
        esAdmin: req.session.admin,
        user: req.session.user,
      });
    } else {
      //fallo login
      res.render("login", {
        title: "Login",
        active: { Login: true },
        error,
      });
    }
  });
});

router.post("/register", (req, res) => {
  users.once("value", (snapshot) => {
    const data = snapshot.val();
    let nom = req.body.nomuser;
    let psw = req.body.password;
    let pswcheck = req.body.confirm_password;
    let error = false;
    let error2 = false;
    for (const camp in data) {
      //console.log(data[camp].nom);
      if (data[camp].nom == nom) {
        error = true;
      }
      if (psw != pswcheck) {
        error2 = true;
      }
    }
    if (error || error2) {
      //error o be registrat o be no coincideixen les psw
      res.render("register", {
        title: "Register",
        active: { Register: true },
        error,
        error2,
      });
    } else {
      // creem user
      //console.log("crear user");
      const newUser = {
        nom: req.body.nomuser,
        password: req.body.password,
      };
      users.push(newUser);
      //creem cookie
      req.session.user = nom;
      res.render("home", {
        active: { Home: true },
        user: req.session.user,
      });
    }
  });
});

module.exports = router;
