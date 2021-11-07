const { Schema, model } = require("mongoose");

const UsuariSchema = Schema({
  nom: {
    type: String,
    required: [true, "El nom és obligatori"],
  },
  correu: {
    type: String,
    required: [true, "El correu és obligatori"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contrasenya és obligatoria"],
  },
  rol: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
  estat: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UsuariSchema.methods.toJSON = function () {
  const { __v, password, ...usuari } = this.toObject();
  return usuari;
};

module.exports = model("Usuari", UsuariSchema);
