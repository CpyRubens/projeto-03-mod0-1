const prompt = require("prompt-sync")();
console.clear();
("John Travolta/Enriquecer/ fazer o certo ou o errado/ na possibilidade de ser preso, morrer ou vencer, a cada ação");
jogadorStatuses = { Respeito: 5, Dinheiro: 5, Legalidade: 5, Vigor: 5 };

mesesPercorridos = 0;

//funções
function passarTempo() {
  mesesPercorridos = mesesPercorridos + 1;
  console.log("Se passou mais um mês");
  return mesesPercorridos;
}

function caridade() {
  jogadorStatuses.Dinheiro = jogadorStatuses.Dinheiro - 2;
  jogadorStatuses.Respeito = jogadorStatuses.Respeito + 1;
  passarTempo();
}
function mercadoNegro() {
  jogadorStatuses.Dinheiro = jogadorStatuses.Dinheiro + 2;
  jogadorStatuses.Respeito = jogadorStatuses.Respeito - 2;
  jogadorStatuses.Legalidade = -2;
  passarTempo();
}

function mercadoAcoes() {
  jogadorStatuses.Dinheiro = jogadorStatuses.Dinheiro + 1;
  jogadorStatuses.Vigor = jogadorStatuses.Vigor - 1;
  passarTempo();
}

function sonegacao() {
  jogadorStatuses.Dinheiro = jogadorStatuses.Dinheiro + 2;
  jogadorStatuses.Respeito = jogadorStatuses.Respeito - 1;
  jogadorStatuses.Legalidade = jogadorStatuses.Legalidade - 1;
  passarTempo();
}
console.log(
  "Bem vindo ao Mundo X\n Onde deseja investir o dinheiro essa semana?"
);

while (1) {
  decisao = +prompt("Escolha como irá agir durante este mês");
  if (decisao == 1) {
    caridade();
  } else if (decisao == 2) {
    mercadoNegro();
  } else if (decisao == 3) {
    mercadoAcoes();
  } else if (decisao == 4) {
    sonegacao();
  } else if (decisao == 5) {
    break;
  }
  for (const property in jogadorStatuses) {
    console.log(property + " = " + jogadorStatuses[property]);
  }
  
}

console.log(
  mesesPercorridos,
  jogadorStatuses.Dinheiro,
  jogadorStatuses.Legalidade,
  jogadorStatuses.Respeito,
  jogadorStatuses.Vigor
);
