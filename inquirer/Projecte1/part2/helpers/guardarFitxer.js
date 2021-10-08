const fs = require("fs");

const fitxer = "./db/data.json";

const guardarDB = (data) => {
  fs.writeFileSync(fitxer, JSON.stringify(data));
};

const readDB = () => {
  if (!fs.existsSync(fitxer)) {
    return null;
  }

  const info = fs.readFileSync(fitxer, { encoding: "utf-8" });
  const data = JSON.parse(info);

  return data;
};

// JSON
// 2 mètodes: stringify (pasar JSON a string)
// parse -> pase string a JSON

module.exports = {
  guardarDB,
  readDB,
};
