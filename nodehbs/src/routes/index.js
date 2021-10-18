const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

let serviceAccount = require("../../node-firebase-146ed-firebase-adminsdk-njzkm-8f4e6d2b9c.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://node-firebase-146ed-default-rtdb.europe-west1.firebasedatabase.app/",
});

const db = admin.database();
//usuaris
const users = db.ref("users");

router.get("/", (req, res) => {
  //abans de renderitzar es consulta bd
  //crear un objecte i pasarlo al render
  res.render("index", { title: "Home", active: { Home: true } });
});

router.get("/contacte", (req, res) => {
  res.render("contacte", { title: "Contacte", active: { Contacte: true } });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register", active: { Register: true } });
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login", active: { Login: true } });
});

router.post("/login", (req, res) => {
  users.once("value", (snapshot) => {
    const data = snapshot.val();
    let nom = req.body.nom;
    let psw = req.body.password;
    let error = true;
    let adm = false;
    let user;
    for (const camp in data) {
      //console.log(data[camp].nom);
      if (data[camp].nom == nom && data[camp].password == psw) {
        if (nom == "admin" && psw == "admin") {
          adm = true;
        }
        user = data[camp];
        error = false;
      }
    }
    if (!error) {
      if (adm) {
        res.render("index", {
          active: { Home: true },
          adm,
          user,
        });
      } else {
        res.render("index", {
          active: { Home: true },
          user,
        });
      }
    } else {
      res.render("login", {
        title: "Login",
        active: { Login: true },
        error,
      });
    }
  });
  // let nom = req.body.nom;
  // let psw = req.body.password;
  // ref.on(
  //   "value",
  //   (snapshot) => {
  //     let user = snapshot.val();
  //     let esAdmin = 0;
  //     let error = false;
  //     if (user.nom == nom && user.password == psw) {
  //       //crear cookie i comprovar si admin
  //       if (user.nom == "admin" && user.password == "admin") {
  //         esAdmin = 1;
  //       }
  //       res.render("index", {
  //         active: { Login: true },
  //         user,
  //         esAdmin,
  //         error,
  //       });
  //     } else {
  //       error = true;
  //       res.render("login", {
  //         title: "Login",
  //         active: { Login: true },
  //         error,
  //       });
  //     }
  //   },
  //   (errorObject) => {
  //     console.log("The read failed: " + errorObject.name);
  //   }
  // );
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
      let user = newUser;
      res.render("index", {
        active: { Home: true },
        user,
      });
    }
  });

  // let pswcheck = req.body.confirm_password;
  // let crearUser = false;
  // let infoUser;
  // ref.on(
  //   "value",
  //   (snapshot) => {
  //     let user = snapshot.val();
  //     let error = false;
  //     let error2 = false;
  //     if (user.nom != nom) {
  //       crearUser = true; // es pot crear user
  //     } else if (user.nom == nom && psw != pswcheck) {
  //       error2 = true;
  //       infoUser = user;
  //       res.render("register", {
  //         title: "Register",
  //         active: { Register: true },
  //         error2,
  //       });
  //     } else {
  //       //troba usuari ja creat
  //       error = true;
  //       res.render("register", {
  //         title: "Register",
  //         active: { Register: true },
  //         error,
  //       });
  //     }
  //   },
  //   (errorObject) => {
  //     console.log("The read failed: " + errorObject.name);
  //   }
  // );
  // if (crearUser) {
  //   //creem user
  //   const newUser = {
  //     nom,
  //     password,
  //   };
  //   ref.push(newUser);
  //   // const ref_nom = db.ref("/users/nom");
  //   // const ref_psw = db.ref("/users/password");
  //   // ref_nom.push(nom);
  //   // ref_psw.push(psw);
  //   // ref.push({
  //   //   nom: nom,
  //   //   password: psw,
  //   // });
  //   // ref
  //   //   .add({
  //   //     nom: nom,
  //   //     password: psw,
  //   //   })
  //   //   .catch(function (error) {
  //   //     console.error("Error adding user: ", error);
  //   //   });
  //   res.render("index", {
  //     active: { Login: true },
  //     infoUser,
  //   });
  // }
});

module.exports = router;
