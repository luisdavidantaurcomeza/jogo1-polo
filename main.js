const corredor = document.querySelector('.corredor');
const vilao = document.querySelector('.vilão');
const backgroundMusic = document.getElementById('musicadefundo');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('game-over-text');
const jumpButton = document.getElementById('jumpButton');
const restartButton = document.getElementById('restartButton'); // Novo botão de reiniciar
const blackOverlay = document.getElementById('fundopreto');

let score = 0;
let gameOver = false;
let loop;

const jump = () => {
    if (gameOver) return;
    corredor.classList.add('pulo');

    setTimeout(() => {
        corredor.classList.remove('pulo');
    }, 500);
};

const updateScore = () => {
    if (gameOver) return;
    score++;
    scoreDisplay.textContent = `Pontuação: ${score}`;
};

const showGameOverText = () => {
    gameOverText.textContent = `Sua pontuação final foi de ${score} pontos.`;
    gameOverText.style.display = 'block';
    gameOverText.style.opacity = '1';
    
    // Esconder botão de pular e mostrar botão de reiniciar
    jumpButton.style.display = 'none';
    restartButton.style.display = 'block';
    restartButton.addEventListener('click', () => location.reload());
};

const resetGame = () => {
    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Pontuação: ${score}`;
    gameOverText.style.display = 'none';
    gameOverText.style.opacity = '0';

    corredor.src = './img/corredor.gif';
    corredor.style.width = '200px';
    corredor.style.position = 'absolute';
    corredor.style.top = 'auto';
    corredor.style.left = 'auto';
    corredor.style.transform = 'none';
    corredor.style.bottom = '20px';

    vilao.style.display = 'block';
    vilao.style.animation = 'vilao-animation 1.5s infinite linear';

    backgroundMusic.currentTime = 0;
    backgroundMusic.play();

    blackOverlay.classList.remove('fade-in');

    corredor.style.zIndex = '1010';

    loop = setInterval(checkCollision, 10);

    // Mostrar botão de pular e esconder botão de reiniciar
    jumpButton.style.display = 'block';
    restartButton.style.display = 'none';
};

const checkCollision = () => {
    const vilaoPosition = vilao.offsetLeft;
    const corredorPosition = +window.getComputedStyle(corredor).bottom.replace('px', '');

    if (vilaoPosition <= 120 && vilaoPosition > 0 && corredorPosition < 80) {
        gameOver = true;

        vilao.style.animation = 'none';
        vilao.style.left = `${vilaoPosition}px`;

        corredor.style.animation = 'none';
        corredor.style.bottom = `${corredorPosition}px`;

        corredor.src = './img/perdeu.gif';
        corredor.style.width = '700px';
        corredor.style.position = 'absolute';
        corredor.style.top = '50%';
        corredor.style.left = '50%';
        corredor.style.transform = 'translate(-50%, -50%)';

        vilao.style.display = 'none';

        clearInterval(loop);
        backgroundMusic.pause();
        showGameOverText();

        blackOverlay.classList.add('fade-in');
        corredor.style.zIndex = '1010';
    } else {
        updateScore();
    }
};

document.addEventListener('keydown', (event) => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
    jump();
});

jumpButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
    jump();
    jumpButton.style.backgroundColor = 'purple';
    setTimeout(() => {
        jumpButton.style.backgroundColor = '';
    }, 200);
});

loop = setInterval(checkCollision, 10);
