const { KeyObject } = require("crypto");
const { V4MAPPED } = require("dns");
const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const path = require("path");
const url = require("url");
const { v4: uuid_v4 } = require("uuid");

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
//compres
const compres = db.ref("compres");

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

//admin_dashboard

router.get("/admin_dashboard", autenticar, (req, res) => {
  res.render("admin_dashboard", {
    title: "admin_dashboard",
    esAdmin: req.session.admin,
    user: req.session.user,
  });
});
//profile user
router.get("/profile", autenticar, (req, res) => {
  let data;
  let compresUser;
  let ventesUser;
  let idCotxe;
  compres.once(
    "value",
    (snapshot) => {
      data = snapshot.val();
      for (const camp in data) {
        //compres
        if (data[camp].comprador == req.session.user) {
          compresUser = data;
        }
        //ventes
        if (data[camp].vendedor == req.session.user) {
          ventesUser = data;
        }
      }
      res.render("profile", {
        title: "Profile",
        active: { Login: true },
        esAdmin: req.session.admin,
        user: req.session.user,
        compresUser,
        ventesUser,
      });
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
});

//cancelar compra i venta
router.post("/cancel-compraventa", autenticar, (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  let id = queryObject.key;
  let data;
  compres.once(
    "value",
    (snapshot) => {
      data = snapshot.val();
      for (const camp in data) {
        if (data[camp].idcotxe == id) {
          let idd = Object.keys(data);
          let idelim = idd.toString();
          compres
            .child(idelim)
            .remove()
            .then(() => {
              cotxes
                .child(id)
                .update({
                  esVenut: false,
                })
                .then(() => {
                  res.render("profile", {
                    title: "Profile",
                    active: { Venta: true },
                    esAdmin: req.session.admin,
                    user: req.session.user,
                  });
                })
                .catch(function (error) {
                  console.log("Update failed: " + error.message);
                });
            })
            .catch(function (error) {
              console.log("Remove failed: " + error.message);
            });
        }
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );

  // cotxes
  //       .child(key)
  //       .update({
  //         esVenut: false,
  //       })
  //       .then(() => {
  //         res.render("profile", {
  //           title: "Profile",
  //           active: { Venta: true },
  //           esAdmin: req.session.admin,
  //           user: req.session.user,
  //         });
  //       })
  //       .catch(function (error) {
  //         console.log("Update failed: " + error.message);
  //       });
});

//compra
router.get("/compra", autenticar, (req, res) => {
  let dades;
  cotxes.once(
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
 * Vendedor
 * esVenut
 * Foto (mirar com fer-ho)
 */

router.post("/compra", autenticar, (req, res) => {
  //compra un cotxe
  const queryObject = url.parse(req.url, true).query;
  let key = queryObject.key;
  let error = false;
  let novaCompra;
  cotxes.once(
    "value",
    (snapshot) => {
      dades = snapshot.val();
      if (req.session.user != dades[key].vendedor) {
        cotxes
          .child(key)
          .update({
            esVenut: true,
          })
          .then(() => {
            //registrem compra (comprador,vendedor,idcotxe);
            novaCompra = {
              comprador: req.session.user,
              vendedor: dades[key].vendedor,
              idcotxe: key,
              marca: dades[key].marca,
              model: dades[key].model,
              preu: dades[key].preu,
            };
            compres.push(novaCompra);
            res.render("compra", {
              title: "Compra",
              active: { Venta: true },
              esAdmin: req.session.admin,
              user: req.session.user,
              cotxes: dades,
              error,
            });
          })
          .catch(function (error) {
            console.log("Update failed: " + error.message);
          });
      } else {
        error = true;
        res.render("compra", {
          title: "Compra",
          active: { Venta: true },
          esAdmin: req.session.admin,
          user: req.session.user,
          cotxes: dades,
          error,
        });
      }
    },
    (errorObject) => {
      console.log("The read failed: " + errorObject.name);
    }
  );
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
      foto: "assets/uploads/default-car.png",
      preu: req.body.cpreu,
      esVenut: false,
    };
    //console.log(newCar);

    cotxes.push(newCar).then(() => {
      res.render("venta", {
        title: "Venta",
        active: { Venta: true },
        esAdmin: req.session.admin,
        user: req.session.user,
        venut: true,
      });
    });
  } else {
    //fica foto
    //mirar si extensió es vàlida
    const file = req.files.cfoto;

    const extensionName = path.extname(file.name); // fetch the file extension
    const allowedExtension = [".png", ".jpg", ".jpeg"];
    if (!allowedExtension.includes(extensionName)) {
      return res.status(422).send("Invalid Image");
    } else {
      const nomFile = uuid_v4() + extensionName;
      let ruta = "src/public/assets/uploads/" + nomFile;
      console.log(ruta);

      file.mv(ruta, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
        console.log(file);
        return console.log("Foto pujada correctament a " + ruta);
      });
      newCar = {
        vendedor: req.session.user,
        marca: req.body.cmarca,
        model: req.body.cmodel,
        any: req.body.cany,
        km: req.body.ckm,
        cv: req.body.ccv,
        combustible: req.body.ccombustible,
        descripcio: req.body.cdescripcio,
        foto: "assets/uploads/" + nomFile,
        preu: req.body.cpreu,
        esVenut: false,
      };
      cotxes.push(newCar).then(() => {
        res.render("venta", {
          title: "Venta",
          active: { Venta: true },
          esAdmin: req.session.admin,
          user: req.session.user,
          venut: true,
        });
      });
    }
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
