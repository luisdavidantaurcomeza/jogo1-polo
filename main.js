const corredor = document.querySelector('.corredor');
const vilão = document.querySelector('.vilão');
const backgroundMusic = document.getElementById('musicadefundo');
const scoreDisplay = document.getElementById('score'); 
const gameOverText = document.getElementById('game-over-text'); 

let score = 0; 

const jump = () => {
    corredor.classList.add('pulo');

    setTimeout(() => {
        corredor.classList.remove('pulo');
    }, 500);
};

const updateScore = () => {
    score++; 
    scoreDisplay.textContent = `Pontuação: ${score}`; 
};

const showGameOverText = () => {
    gameOverText.textContent = `Sua pontuação final foi de ${score} pontos.`;
    gameOverText.style.display = 'block';
    gameOverText.style.opacity = '1';
};

const loop = setInterval(() => {
    const vilãoPosition = vilão.offsetLeft;
    const corredorPosition = +window.getComputedStyle(corredor).bottom.replace('px', '');

    if (vilãoPosition <= 120 && vilãoPosition > 0 && corredorPosition < 80) {
        vilão.style.animation = 'none';
        vilão.style.left = `${vilãoPosition}px`;

        corredor.style.animation = 'none';
        corredor.style.bottom = `${corredorPosition}px`;

        corredor.src = './img/perdeu.gif';
        corredor.style.width = '700px';
        corredor.style.position = 'absolute';
        corredor.style.top = '50%';
        corredor.style.left = '50%';
        corredor.style.transform = 'translate(-50%, -50%)';

        vilão.style.display = 'none';

        clearInterval(loop);
        backgroundMusic.pause();
        showGameOverText();

        const blackOverlay = document.getElementById('fundopreto');
        blackOverlay.classList.add('fade-in');
        corredor.style.zIndex = '1010';
    } else {
        updateScore(); 
    }
}, 10);

document.addEventListener('keydown', (event) => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
    jump();
});
