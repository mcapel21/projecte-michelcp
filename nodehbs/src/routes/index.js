const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //abans de renderitzar es consulta bd
  //crear un objecte i pasarlo al render
  let obj = {
    nom: "Michel",
    edat: 20,
    cotxe: false,
  };
  res.render("index", { title: "Home", active: { Home: true }, obj });
});

router.get("/contacte", (req, res) => {
  res.render("contacte", { title: "Contacte", active: { Contacte: true } });
});

module.exports = router;
