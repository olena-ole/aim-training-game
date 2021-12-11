'use strict';

const startBtn = document.querySelector('#start'),
    screens = document.querySelectorAll('.screen'),
    timeList = document.querySelector('.time-list'),
    timeEl = document.querySelector('#time'),
    board = document.querySelector('#board');
let time = 0,
    score = 0;

startBtn.addEventListener('click', e => {
    e.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('time-btn')) {
        time = parseInt(e.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
});

board.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('circle')) {
        score++;
        e.target.remove();
        createRandomCircle();
    }
});

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
    
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Score: <span class='primary'>${score}</span></h1>`;
}

function createRandomCircle() {
    const circle = document.createElement('div'),
        size = getRandomNumber(10, 60),
        {width, height} = board.getBoundingClientRect(),
        x = getRandomNumber(0, width - size),
        y = getRandomNumber(0, height - size),
        color = getRandomColor();

    console.log(color);

    circle.classList.add('circle');
    circle.style.background = color;
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const colors = ['#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71', '#866e97', '#f86e97', '#f8e05a', '#0c4429'];
    return colors[Math.floor(Math.random() * colors.length)];
}