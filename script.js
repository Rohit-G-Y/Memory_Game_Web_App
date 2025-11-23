console.log('Namaste JS');
const boardBox = document.querySelector('.parent-container');
const startBtn = document.querySelector('.startBtn');
const fruitsImogees = ['🥭', '🍉', '🍊', '🍇', '🍒', '🥝', '🍌', '🍍', '🥭', '🍉', '🍊', '🍇', '🍒', '🥝', '🍌', '🍍'];

//generate the array with random Number.
function generateRandomArray() {
    let n = [];
    for (let i = 0; i < fruitsImogees.length; i++) {
        let rn = Math.floor(Math.random() * 16);
        if (!n.includes(rn)) {
            n.push(rn);
        }
        else {
            i--;
        }
    }
    return n;
}

//Function to create the board with the random fruits on each fruits card.
((fruitsArr) => {
    let randomFruitsArr = generateRandomArray();
    let board = document.createElement('table');
    board.classList.add('board-box');
    boardBox.appendChild(board);

    let count = 0;
    for (let row = 0; row < 4; row++) {
        const tr = document.createElement('tr');
        board.appendChild(tr);
        for (let col = 0; col < 4; col++) {
            let td = document.createElement('td');
            td.classList.add('fruit-box');
            td.innerHTML = `<div class='flipCard'><div class='front' id="${count}"></div><div class='back' id="${count}">${fruitsArr[randomFruitsArr[count++]]}</div>`;
            tr.appendChild(td);
        }
    }
})(fruitsImogees);


//Game Logic
const fruitsBoxArrfront = document.querySelectorAll('.front');
const fruitsBoxArrback = document.querySelectorAll('.back');
const fruitBoxTD = document.querySelectorAll('.fruit-box');
const attemptText = document.querySelector('#num-of-attempts');
let stopTimer = 0;

function rotateFruitCard(card) {
    card.classList.toggle("flipped");
}

function startBtnToggle(target) {
    target.classList.toggle('started');
}

function startTimer() {
    let timerCount = 0;
    const timer = setInterval(function () {
        document.querySelector('#game-timer').textContent = `${++timerCount} Second`;
    }, 1000);
    return timer;
}

let correctAnswePair = [];
let correctAnsNum = 0;
let numOfAttepts = 0;


function answeCheck(target) {
    console.log(numOfAttepts);

    if (correctAnswePair.length <= 2) {

        let fruitsBoxArrbackTarget = fruitsBoxArrback[target.id] //To get the back div element;
        let fruitIcon = fruitsBoxArrbackTarget.textContent; //To get the Icon from back div elemtn;
        correctAnswePair.push({ pairID: fruitsBoxArrbackTarget, Icon: fruitIcon });

        if (correctAnswePair.length === 2) {
            if (correctAnswePair[0].Icon === correctAnswePair[1].Icon) {
                // console.log('correc!');
                setTimeout(() => {
                    correctAnswePair[0].pairID.classList.add('no-click');
                    correctAnswePair[1].pairID.classList.add('no-click');
                    correctAnswePair.length = 0;
                    console.log(++correctAnsNum);
                    attemptText.textContent = ++numOfAttepts;

                    if (correctAnsNum === 8) {
                        clearInterval(stopTimer);
                        startBtnToggle(startBtn);
                        startBtn.textContent = 'Replay';
                    }

                }, 500);
            }
            else {
                // console.log('wrong!');
                setTimeout(() => {
                    rotateFruitCard(correctAnswePair[0].pairID.closest('.fruit-box'));
                    rotateFruitCard(correctAnswePair[1].pairID.closest('.fruit-box'));
                    correctAnswePair.length = 0;
                    attemptText.textContent = ++numOfAttepts;
                }, 500);
            }
        }
    }
}

function startTheGame(e) {
    startBtnToggle(e.target);
    e.target.textContent = 'Started';
    stopTimer = startTimer();

    fruitsBoxArrfront.forEach((element) => {
        element.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            rotateFruitCard(e.target.closest('.fruit-box'));
            answeCheck(e.target);;
        })
    });
}

function restartTheGame(e) {
    startBtnToggle(e.target);
    e.target.textContent = 'Started';
    stopTimer = startTimer();
    fruitBoxTD.forEach(function (element) {
        rotateFruitCard(element);
    });
    correctAnswePair = [];
    correctAnsNum = 0;
    numOfAttepts = 0;
    attemptText.textContent = numOfAttepts;
}


startBtn.addEventListener('click', function (e) {
    if (e.target.textContent === 'Start') {
        startTheGame(e);
    }
    else {
        restartTheGame(e);
    }
});
