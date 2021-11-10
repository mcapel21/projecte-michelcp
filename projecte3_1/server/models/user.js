const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let userSchema = new Schema({
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
    rol: {
      type: String,
      required: true,
      enum: ["ADMIN_ROLE", "USER_ROLE"],
    },
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

userSchema.methods.toJSON = function () {
  let user = this;
  let userObject = user.toObject();
  delete userObject.password;
  delete userObject._id;
  delete userObject.__v;
  return userObject;
};

userSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });

module.exports = mongoose.model("User", userSchema);
