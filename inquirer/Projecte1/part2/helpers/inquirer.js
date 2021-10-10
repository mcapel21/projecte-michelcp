const inquirer = require("inquirer");
require("colors");

const preguntes = [
  {
    type: "list",
    name: "opcio",
    message: "Què vols fer?",
    choices: [
      {
        value: "1",
        name: `${"1 ".green} Nova reserva`,
      },
      {
        value: "2",
        name: `${"2 ".green} Mostrar sala`,
      },
      {
        value: "3",
        name: `${"3 ".green} Mostrar recaudació`,
      },
      {
        value: "4",
        name: `${"4 ".green} Eliminar reserva`,
      },
      {
        value: "0",
        name: `${"0 ".green} Sortir`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("======= CINE MAX =======".cyan);
  console.log("   Secciona una opció".green);
  console.log("========================\n".cyan);

  const { opcio } = await inquirer.prompt(preguntes);

  return opcio; // retorno un valor entre 0 i 5
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presiona ${"enter".yellow} per a continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const posFila = async (message) => {
  const question = [
    {
      type: "input",
      name: "fila",
      message,
      validate(value) {
        if (value.length === 0 || value > 6 || value < 1) {
          return "Si us plau, introdueix una fila entre 1-6";
        }
        return true;
      },
    },
  ];
  const { fila } = await inquirer.prompt(question);
  return fila;
};

const posCol = async (message) => {
  const question = [
    {
      type: "input",
      name: "columna",
      message,
      validate(value) {
        if (value.length === 0 || value > 6 || value < 1) {
          return "Si us plau, introdueix un seient entre 1-6";
        }
        return true;
      },
    },
  ];
  const { columna } = await inquirer.prompt(question);
  return columna;
};

const reservaSelect = async (reserves = []) => {
  const choices = reserves.map((reserva, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: reserva.id,
      name: `${idx}. Reserva : Fila - ${reserva.fila} Seient - ${reserva.col}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancel·lar",
  });

  const pregunta = [
    {
      type: "list",
      name: "id",
      message: "Selecciona reserva",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];
  const { ok } = await inquirer.prompt(question);
  return ok;
};

module.exports = {
  inquirerMenu,
  pausa,
  posFila,
  posCol,
  reservaSelect,
  confirmar,
};
