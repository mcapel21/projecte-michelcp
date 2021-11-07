const { Schema, model } = require("mongoose");

const ClientSchema = Schema({
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
    enum: ["EMPRESA", "PARTICULAR"],
  },
  tlf: {
    type: Number,
    default: 0,
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

ClientSchema.methods.toJSON = function () {
  const { __v, password, ...client } = this.toObject();
  return client;
};

module.exports = model("Client", ClientSchema);
