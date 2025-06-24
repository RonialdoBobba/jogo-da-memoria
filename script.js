const container = document.querySelector(".container");
const botaoReiniciar = document.querySelector("button");
const placar = document.getElementById("placar");
const mensagemFinal = document.getElementById("mensagem-final");
const tempoSpan = document.getElementById("tempo");

let cartasViradas = 0;
let movimentos = 0;
let primeiraCarta = null;
let segundaCarta = null;
let bloqueado = false;
let tempo = 0;

const items = [
  { nome: "gato", imagem: "imagem/gato.jpg" },
  { nome: "cachorro", imagem: "imagem/cachorro.jpg" },
  { nome: "coelho", imagem: "imagem/coelho.jpg" },
  { nome: "elefante", imagem: "imagem/elefante.jpg" },
  { nome: "girafa", imagem: "imagem/girafa.jpg" },
  { nome: "leao", imagem: "imagem/leao.jpg" },
  { nome: "panda", imagem: "imagem/panda.jpg" },
  { nome: "tigre", imagem: "imagem/tigre.jpg" },
];

botaoReiniciar.addEventListener("click", () => location.reload());

function criarCartas() {
  const duplicados = [...items, ...items];
  const embaralhados = duplicados.sort(() => Math.random() - 0.5);

  embaralhados.forEach((animal) => {
    const carta = document.createElement("div");
    carta.classList.add("carta");
    carta.setAttribute("data-carta", animal.nome);
    carta.innerHTML = `
      <div class="atras">?</div>
      <div class="frente">
        <img src="${animal.imagem}" alt="${animal.nome}">
      </div>
    `;
    container.appendChild(carta);
  });
}

function virarCarta() {
  const cartas = document.querySelectorAll(".carta");

  cartas.forEach((carta) => {
    carta.addEventListener("click", () => {
      if (bloqueado || carta.classList.contains("carta-virada") || carta === primeiraCarta) return;

      carta.classList.add("carta-virada");

      if (!primeiraCarta) {
        primeiraCarta = carta;
      } else {
        segundaCarta = carta;
        bloqueado = true;
        movimentos++;
        placar.innerText = `Movimentos: ${movimentos} | Tempo: ${tempo}s`;
        checarCartas();
      }
    });
  });
}

function checarCartas() {
  const nome1 = primeiraCarta.getAttribute("data-carta");
  const nome2 = segundaCarta.getAttribute("data-carta");

  if (nome1 === nome2) {
    cartasViradas += 2;
    primeiraCarta = null;
    segundaCarta = null;
    bloqueado = false;
    if (cartasViradas === items.length * 2) {
      mensagemFinal.innerText = "🎉 Parabéns! Você venceu o jogo!";
      clearInterval(cronometro);
    }
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("carta-virada");
      segundaCarta.classList.remove("carta-virada");
      primeiraCarta = null;
      segundaCarta = null;
      bloqueado = false;
    }, 800);
  }
}

criarCartas();
virarCarta();

const cronometro = setInterval(() => {
  tempo++;
  tempoSpan.innerText = tempo;
}, 1000);