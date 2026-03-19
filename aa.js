let stick = document.querySelector("#stick");
setInterval(() => {
  if (stick.style.display === "none") {
    stick.style.display = "block";
  } else {
    stick.style.display = "none";
  }
}, 200);

function pressButton(botao) {
  let valor = botao.innerText;
  let visor = document.querySelector("#textoVisor");
  visor.innerHTML = `${visor.innerText}${valor}`;
}

function apaga() {
  let visor = document.querySelector("#textoVisor");
  visor.innerHTML = ``;
}

function iguala() {
  const visor = document.querySelector("#textoVisor");

  valor = visor.innerText;
  valor = valor.replace(/\^/g, "**");
  const results = eval(valor);
  visor.innerText = results;
}

function times() {
  let visor = document.querySelector("#textoVisor");
  visor.innerHTML = `${visor.innerText}*`;
}

function split() {
  let visor = document.querySelector("#textoVisor");
  visor.innerHTML = `${visor.innerText}/`;
}

function apagaUmSo() {
  tocarSom("C"); // 🔊 reload
  let visor = document.querySelector("#textoVisor");
  let textoVisor = visor.innerText;
  textoVisor = textoVisor.slice(0, -1);
  visor.innerHTML = `${textoVisor}`;
}

const visor = document.querySelector("#textoVisor");

const observer = new MutationObserver(() => {
  if (visor.innerText === "67") {

    somSixSeven.pause();        // evita sobrepor
    somSixSeven.currentTime = 0;
    somSixSeven.play();         // 🔊 toca AURA

    document.querySelector("#SEISSETE").style.display = "block";
    setTimeout(sessentaEsete, 18000);
  }
});

observer.observe(visor, {
  childList: true,
  subtree: true,
  characterData: true,
});

function sessentaEsete() {
  let seisete = document.querySelector("#SEISSETE");
  seisete.style.display = "none";
}

//novo

const somSixSeven = new Audio("AURA.mp3")
const somNumero = new Audio("SCAR.mp3");   // números + operadores
const somIgual  = new Audio("AWP.mp3");    // =
const somLimpar = new Audio("RELOAD.mp3"); // C

function tocarSom(tecla) {
  const teclasNormais = [
    "0","1","2","3","4","5","6","7","8","9",
    "+","-","*","/","^","."
  ];

  if (teclasNormais.includes(tecla)) {
    somNumero.currentTime = 0;
    somNumero.play();
  }
  else if (tecla === "=" || tecla === "Enter") {
    somIgual.currentTime = 0;
    somIgual.play();
  }
  else if (tecla === "C") {
    somLimpar.currentTime = 0;
    somLimpar.play();
  }
}

function pressButton(botao) {
  let valor = botao.innerText;
  let visor = document.querySelector("#textoVisor");

  tocarSom(valor); // 🔊

  visor.innerHTML = `${visor.innerText}${valor}`;
}

function apaga() {
  tocarSom("C"); // 🔊
  let visor = document.querySelector("#textoVisor");
  visor.innerHTML = ``;
}

function iguala() {
  tocarSom("="); // 🔊
  const visor = document.querySelector("#textoVisor");

  let valor = visor.innerText;
  valor = valor.replace(/\^/g, "**");
  const results = eval(valor);
  visor.innerText = results;
}

document.addEventListener("keydown", function (event) {
  let valor = event.key;

  if (
    !isNaN(valor) ||
    valor === "+" ||
    valor === "-" ||
    valor === "*" ||
    valor === "/" ||
    valor === "."
  ) {
    tocarSom(valor); // 🔊
    let visor = document.querySelector("#textoVisor");
    visor.innerHTML = `${visor.innerText}${valor}`;
  } 
  else if (valor === "Enter") {
    tocarSom("Enter"); // 🔊
    iguala();
  } 
  else if (valor === "Backspace") {
  tocarSom("C"); // 🔊 som de reload
  apagaUmSo();
}
});

function split() {
  tocarSom("/"); // 🔊 toca som de operador
  let visor = document.querySelector("#textoVisor");
  visor.innerHTML = `${visor.innerText}/`;
}

function times() {
  tocarSom("*"); // 🔊 toca som de operador
  let visor = document.querySelector("#textoVisor");
  visor.innerHTML = `${visor.innerText}*`;
}