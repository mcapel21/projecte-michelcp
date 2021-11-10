const { Schema, model } = require("mongoose");

const ServeiSchema = Schema({
  nom: {
    type: String,
    required: [true, "El nom és obligatori"],
  },
  descripcio: {
    type: String,
    default: null,
  },
  proces: {
    type: String,
    required: true,
    enum: ["IN_PROGRESS", "FINISHED"],
  },
  cost: {
    type: Number,
    default: 0,
  },
  actiu: {
    type: Boolean,
    default: true,
  },
});

ServeiSchema.methods.toJSON = function () {
  const { __v, password, ...servei } = this.toObject();
  return servei;
};

module.exports = model("Servei", ServeiSchema);
