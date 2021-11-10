require("dotenv").config();
const express = require("express");

const mongoose = require("mongoose");
// mongoose.set("useNewUrlParser", true);
// mongoose.set("useFindAndModify", false);
// mongoose.set("useCreateIndex", true);
// mongoose.set("useUnifiedTopology", true);

const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/index"));

mongoose.connect(
  process.env.URLDB,
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) throw err;
    console.log(
      `Base de dades ${res.connections[0].name} ONLINE, port: ${res.connections[0].port}.`
    );
  }
);

app.listen(process.env.PORT, () => {
  console.log(`Server ONLINE, port: ${process.env.PORT}.`);
});
