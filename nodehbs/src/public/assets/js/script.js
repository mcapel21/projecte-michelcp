window.addEventListener("load", () => {
  let calcula = document.getElementById("calcula");
  calcula.addEventListener("click", main);
  let neteja = document.getElementById("neteja");
  neteja.addEventListener("click", netejar);
  //main();
});

function netejar() {
  let cantitat = document.getElementById("cantitat");
  cantitat.value = 10000;
  let quotes = document.getElementById("mmesos");
  quotes.selected = false;
  let entrada = document.getElementById("entrada");
  entrada.value = 5000;
  let total_contat = document.getElementById("total_contat");
  total_contat.innerText = "-";
  let cant_quotes = document.getElementById("cant_quotes");
  cant_quotes.innerText = "-";
  let quotes_res = document.getElementById("quotes_res");
  quotes_res.innerText = "-";
  let total_credit = document.getElementById("total_credit");
  total_credit.innerText = "-";
  let total_credit_interes = document.getElementById("total_credit_interes");
  total_credit_interes.innerText = "-";
}

function main() {
  let cantitat = document.getElementById("cantitat");
  let quotes = document.getElementById("mmesos");
  let mesos = quotes.options[quotes.selectedIndex].value;
  let entrada = document.getElementById("entrada");
  let total_contat = document.getElementById("total_contat");
  let res = parseInt(entrada.value) + 750 + (750 % 8.95);
  total_contat.innerHTML = res + " €";
  let cant_quotes = document.getElementById("cant_quotes");
  let quotes_res = document.getElementById("quotes_res");
  cant_quotes.innerText = mesos;

  let quot = eval(parseInt(cantitat.value) + res);
  quot = Math.round((quot / mesos + Number.EPSILON) * 100) / 100;
  quotes_res.innerText = quot + " €";
  let credittotal = eval(parseInt(cantitat.value) - res);
  let total = eval(parseInt(cantitat.value) + res);
  let total_credit = document.getElementById("total_credit");
  total_credit.innerText = credittotal + " €";
  let total_credit_interes = document.getElementById("total_credit_interes");
  total_credit_interes.innerText = total + " €";
}
