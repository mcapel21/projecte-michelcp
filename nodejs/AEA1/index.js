const { crearAlumnes } = require('./helpers/hores');

//let nom = "Michel";
//let hores = "50";
console.clear();
// let nom = '';
// let hores = '';
console.log (process.argv); // pots veure els arguments d'entrada
let nom = process.argv[2];
nom = nom.split("=")[1];

let hores = process.argv[3];
hores = hores.split("=")[1];

crearAlumnes(nom,hores);