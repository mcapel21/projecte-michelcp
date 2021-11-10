const User = require("../models/user");

const emailExisteix = async (correu = "") => {
  // Verificar si el correu ja existeix a la db
  const existeix = await User.findOne({ correu });
  if (existeix) {
    throw new Error(`El correu ${correu} ja està registrat`);
  }
};

module.exports = {
  emailExisteix,
};
