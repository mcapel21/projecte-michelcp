const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const session = require("express-session");

const app = express();
//settings
app.set("port", process.env.PORT || 3030);

//li diem al node on es troben els views
app.set("views", path.join(__dirname, "views"));

//motor de templating (hbs)
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    partialsDir: __dirname + "/views/layouts", // ubicació dels parcials
  })
);

app.set("view engine", ".hbs");

//routes
app.use(express.urlencoded({ extended: false })); //urlencoded = true, enten objectes i en general qualsevol tipus de dada
//Urlencoded = false, enten strings  i arrays
app.use(require("./routes/routes"));

//altres fitxers estatics ( assets )
app.use(express.static(path.join(__dirname, "public")));
module.exports = app;
