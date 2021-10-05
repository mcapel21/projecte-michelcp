const inquirer = require("inquirer");
const Tasques = require("../models/tasques");
require("colors");
const preguntes = [
  {
    type: "list",
    name: "opcio",
    message: "Què vols fer?",
    choices: [
      {
        value: "1",
        name: `${"1 ".green} Crear tasca`,
      },
      {
        value: "2",
        name: `${"2 ".green} Llistar tasques`,
      },
      {
        value: "3",
        name: `${"3 ".green} Llistar tasques completes`,
      },
      {
        value: "4",
        name: `${"4 ".green} Llistar tasques pendents`,
      },
      {
        value: "5",
        name: `${"5 ".green} Completar tasca/tasques`,
      },
      {
        value: "6",
        name: `${"6 ".green} Borrar tasca`,
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
  console.log("========================".cyan);
  console.log("   Secciona una opció".yellow);
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

const novaTasca = async (message) => {
  const question = [
    {
      type: "input",
      name: "nom",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Si us plau, introdueix un nom";
        }
        return true;
      },
    },
  ];
  const { nom } = await inquirer.prompt(question);
  return nom;
};

const tascaSelect = async (tasques = []) => {
  const choices = tasques.map((tasca, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tasca.id,
      name: `${idx} ${tasca.nom} - ${tasca.estat}`,
    };
  });

  choices.unshift({
    value: "0",
    name: "0. ".green + "Cancel·lar",
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "id",
      message: "Selecciona tasca",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(pregunta);
  return id;
};

const tascaSelect2 = async (tasques = []) => {
  const choices = tasques.map((tasca, i) => {
    const idx = `${i + 1}.`.green;
    return {
      value: tasca.id,
      name: `${idx} ${tasca.nom} - ${tasca.estat}`,
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
      message: "Selecciona tasca",
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
  novaTasca,
  tascaSelect,
  tascaSelect2,
  confirmar,
};
