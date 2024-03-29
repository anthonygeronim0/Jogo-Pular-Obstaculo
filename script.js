const ellie = document.querySelector(".ellie");
const espinhos = document.querySelector(".espinhos");
let score = document.querySelector(".score");
let maiorScore = 0;
let maiorScoreSpan = document.querySelector("#maiorScore");
maiorScoreSpan.innerText = maiorScore;
let fogos = document.querySelector(".fogos");
const restartButton = document.getElementById("restartButton");
const gameOver = document.querySelector("#gameOver");

audioDerrota = new Audio('./sounds/derrota.mp3')
audioPulo = new Audio('./sounds/pulo.m4a')
audioRecorde = new Audio('./sounds/recorde.m4a')
audioTema = new Audio('./sounds/tema.m4a')

audioTema.play()

const jump = () => {
  ellie.classList.add("jump");
  setTimeout(() => {
    ellie.classList.remove("jump");
  }, 500);
};

let scoreVal = 0;

const loop = () => {
  restartButton.style.display = "none";
  audioPulo.play()
  gameOver.style.display = "none"
  fogos.style.display = "none";
  const loop2 = setInterval(() => {
    espinhos.style.animation = "espinhosAnimacao 2s infinite linear";
    espinhos.style.display = "block";
    const espinhoPosition = espinhos.offsetLeft;
    const elliePosition = +window
      .getComputedStyle(ellie)
      .bottom.replace("px", "");

    let score = document.querySelector("#teste");
    scoreVal += 1;
    score.innerText = scoreVal;

    if (espinhoPosition <= 140 && espinhoPosition > 0 && elliePosition < 13) {
     
      restartButton.style.display = "block";
  
      if (scoreVal > maiorScore) {
        maiorScore = scoreVal;
        maiorScoreSpan.innerText = maiorScore;
        fogos.style.display = "block";
        audioRecorde.play()
      }
      else {
        gameOver.style.display = "block"
        audioDerrota.play()
      }
      scoreVal = 0;
      espinhos.style.animation = "none";
      espinhos.style.left = `${espinhoPosition}px`;

      ellie.style.animation = "none";
      ellie.style.bottom = `${elliePosition}px`;

      clearInterval(loop2);
    }
  }, 10);
  espinhos.style.animation = "";
  espinhos.style.left = "";
  ellie.style.animation = "";
  ellie.style.bottom = "";
  let score = document.querySelector("#teste");
  score.innerText = scoreVal;
};

document.addEventListener('keypress', e => {
  const tecla = e.key
  if (tecla === ' ') {
    jump()
  }
})

restartButton.addEventListener("click", loop);
