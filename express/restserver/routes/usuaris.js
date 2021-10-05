const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.send("Accés denegat...");
});

router.get("/usuaris", (req, res) => {
  res.json({
    msg: "Llista usuaris",
    ok: true,
  });
});

router.get("/clients", (req, res) => {
  res.send("Llista de clients...");
});

module.exports = router;
