const prompt = require("prompt-sync")();
console.clear();

// variável de controle de tempo e função de controle de tempo
let semanasPercorridas = 0;

function passarTempo() {
  semanasPercorridas = semanasPercorridas + 1;
  console.log("Se passou mais um mês");
  return semanasPercorridas;
}

//objeto principal referente aos status e funções de ações do jogador
let jogadorStatuses = {
  Respeito: 5,
  Dinheiro: 5,
  Legalidade: 5,
  Vigor: 5,

  caridade: function () {
    this.Dinheiro -= 2;
    this.Respeito += 2;
    this.Vigor += 1;
    passarTempo();
    console.log(
      "Você doa parte do seu dinheiro para instituições de caridade, aumentando a sua moral social e se revigorando\nDinheiro -2\nVigor +1\nRespeito +2"
    );
  },
  mercadoNegro: function () {
    this.Dinheiro += 2;
    this.Respeito -= 1;
    this.Legalidade -= 2;
    passarTempo();
    console.log(
      "Você investe no mercado ilegal obtendo excelente retorno financeiro, porém sua reputação cai e a justiça fica de olho em você\nDinheiro +2\nRespeito -1\nLegalidade -2"
    );
  },
  mercadoAcoes: function () {
    this.Dinheiro += 1;
    this.Vigor -= 1;
    passarTempo();
    console.log("Você investe no mercado de ações e trabalha obtendo um retorno legal\nDinheiro +1 \nVigor -1");
  },

  sonegacao: function () {
    this.Dinheiro += 1;
    this.Respeito -= 1;
    this.Legalidade -= 1;
    passarTempo();
    console.log(
      "Você dribla a fiscalização e não declara seus bens, fugindo das impostos e acumulando mais dinheiro, porém entrando na mira da Lei\n"
    );
  },
};

//função de evento aleatório dentro do jogo(sobre determinada situação)
function randomEvent() {
  let random100 = Math.floor(Math.random() * 100);
  console.log(random100);
  if (jogadorStatuses.Dinheiro >= 7 && random100 >= 75) {
    console.log(
      "Você acumulou muito dinheiro, o que atraiu sequestradores até você!"
    );
    console.log("Você pode pagar 2 de dinheiro ou tentar fugir(perigoso)");
    escapar = prompt("pagar ou fugir?");
    while (
      escapar.toLowerCase() != "pagar" &&
      escapar.toLowerCase() != "fugir"
    ) {
      escapar = prompt("PAGAR OU FUGIR???");
    }
    if (escapar == "pagar") {
      console.log(
        "Você pagar a quantia solicitada(-2 de dinheiro) e é libertado para continuar sua jornada)"
      );
      jogadorStatuses.Dinheiro -= 2;
    } else {
      let randomdeath = Math.floor(Math.random() * 100);
      if (randomdeath >= 50) {
        console.log("Você foi morto ao tentar fugir. Fim de jogo!");
      } else {
        console.log(
          "Você consegue escapar com sucesso dos sequestradores e volta a sua jornada!"
        );
      }
    }
  }
}
function imposto(){
  if (semanasPercorridas > 0 && semanasPercorridas % 4 == 0){
    console.log("É hora de pagar os impostos, mas você também pode sonegar este evento")
    let imposto = prompt("Pagar ou Sonegar?")
    while (imposto.toLocaleLowerCase() != "pagar" && imposto.toLocaleLowerCase() != "sonegar"){
      imposto = prompt("PAGAR ou SONEGAR?")
    }
    if (imposto.toLocaleLowerCase() == "pagar" ){
      console.log("Você paga seus impostos como um cidadão normal. \nDinheiro -1")
      jogadorStatuses.Dinheiro -= 1;
    }
    else{
      console.log("Você sonega os impostos desse mês com tranquilidade e acumula mais dinheiro. \nDinheiro +1 \nLegalidade -1")
      jogadorStatuses.Dinheiro += 1;
      jogadorStatuses.Legalidade -= 1;
    }
  }
}


console.log(
  "Bem vindo a sua jornada em busca do sucesso, para isso você vai ter que saber bem onde utilzar o seu dinheiro. Todas as saus ações tem consequências!\n Para vencer chegue a 10 em dinheiro ou respeito, porém se qualquer atributo chegara a 0 você perde, cuidado!\nOnde deseja investir o dinheiro essa semana?\n"
);

//laço
while (1) {
  console.log(`-----------------------------------------------------------------------------------------------------------------
[1] Doar dinheiro para a instituições de caridade: irá te conceder muito respeito social e te dará energias para continuar.
[2] Investir dinheiro no mercado negro: te rende muito dinheiro, porém destrói sua reputação e pode te colocar atrás das grades.
[3] Investir/trabalhar: te rende dinheiro honesto porém cansa aos poucos\n
---------------------------------------------------------------------------------------------------------------------------------`)
  decisao = +prompt("Escolha como irá agir durante este mês");
  while (isNaN(decisao) && decisao >= 6) {
    decisao = +prompt("Escolha um numeral válido!");
  }
  if (decisao == 1) {
    jogadorStatuses.caridade();
  } else if (decisao == 2) {
    jogadorStatuses.mercadoNegro();
  } else if (decisao == 3) {
    jogadorStatuses.mercadoAcoes();
  } else if (decisao == 4) {
    jogadorStatuses.sonegacao();
  } else if (decisao == 5) {
    break;
  }

  console.log(
    "Tempo percorrido",
    semanasPercorridas,
    "Dinheiro:",
    jogadorStatuses.Dinheiro,
    "Legalidade:",
    jogadorStatuses.Legalidade,
    "Respeito:",
    jogadorStatuses.Respeito,
    "Vigor:",
    jogadorStatuses.Vigor
  );

  // verificador de status dinheiro
  if (jogadorStatuses.Dinheiro <= 0) {
    console.log(
      "Você faliu, está devemdo muito dinheiro. É o fim da linha para você\n"
    );
    break;
  } else if (
    jogadorStatuses.Dinheiro >= 10 &&
    jogadorStatuses.Vigor <= 0 &&
    jogadorStatuses.Legalidade <= 0 &&
    jogadorStatuses.Respeito <= 0
  ) {
    console.log(
      "Parabéns, você atingiu dinheiro suficiente para viver bem o resto da sua vida! Parabéns\n"
    );
    break;
  }
  //verifcador de status respeito
  if (jogadorStatuses.Respeito <= 0) {
    console.log(
      "Você se tornou a definição de escória social, suas atitudes te colocarm num pedestal negativo ireversível!\n"
    );
    break;
  } else if (
    jogadorStatuses.Dinheiro <= 0 &&
    jogadorStatuses.Vigor <= 0 &&
    jogadorStatuses.Legalidade <= 0 &&
    jogadorStatuses.Respeito >= 10
  ) {
    console.log(
      "Parabéns, você atingiu um respeito moral incrível, agora se tornando uma pessoa pública muito imporatante, todos tem muita consideração por você. Você venceu!\n "
    );
    break;
  }
  // verificador de status vigor
  if (jogadorStatuses.Vigor <= 0) {
    console.log(
      "Você está sem motivação nenhuma para continuar e resolve procurar tratamento médico, melhor dar um tempo definitivo a essa jornada\n"
    );
    break;
  }

  //verificador de status legalidade
  if (jogadorStatuses.Legalidade <= 0) {
    console.log(
      "Você se tornou um criminoso financeiro muito procurado, a polícia finalmente te pega e você perde tudo! Fim de jogo!.....\n"
    );
    break;
  }
  randomEvent();
  imposto();
}
