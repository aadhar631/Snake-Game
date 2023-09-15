// Variables

let snakeVelocity = {x: 0, y:0};
const foodSound = new Audio("music/food.wav");
const gameOverSound = new Audio("music/gameover.wav");
const moveSound = new Audio("music/movement.wav");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArray = [
    {x: 13, y:15}
]
let food = {x:12, y:7}

// Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < (1/speed)) {
        return;
    }

    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snakeArray) {
    // when you hit yourself
    for (let i = 1; i < snakeArray.length; i++) {
        if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y) {
            return true;
        } 
    }

    // when you hit the wall
    if(snakeArray[0].x >= 18 || snakeArray[0].x <=0 || snakeArray[0].y >= 18 || snakeArray[0].y <=0) {
        return true;
    }
}

function gameEngine() {
    // Part 1 :- Updating the Snake Array and Food

    if(isCollide(snakeArray)) {
        gameOverSound.play();
        snakeVelocity = {x:0, y:0};
        alert("Press any key to play again!!");
        snakeArray = [{x:13, y:15}];
        score = 0;
        scoreBox.innerHTML = "Score : 0";
    }

    // Regenerate the food and increment the score if you eat the food...
    if(snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        
        score += 1;
        if(score > highscoreval) {
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highScoreBox.innerHTML = "High Score : " + highscoreval;
        }
        scoreBox.innerHTML = "Score : " + score;

        snakeArray.unshift({x: snakeArray[0].x + snakeVelocity.x, y: snakeArray[0].y + snakeVelocity.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a) * Math.random()), y: Math.round(a + (b-a) * Math.random())};
    }

    // Moving the Snake
    for (let i = snakeArray.length-2; i >= 0; i--) {
        snakeArray[i+1] = {...snakeArray[i]};
    }

    snakeArray[0].x += snakeVelocity.x;
    snakeArray[0].y += snakeVelocity.y;

    // Part 2 :- Display the Snake and Food
    // Display the Snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index == 0) {
            snakeElement.classList.add("head");
        } else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    // Display the Food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}
 









// Main part of the Logic
let highscore = localStorage.getItem("highscore");
if(highscore === null) {
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
    highscoreval = JSON.parse(highscore);
    highScoreBox.innerHTML = "High Score : " + highscore;
}

window.requestAnimationFrame(main);

// Moving the Snake according to the key we press
window.addEventListener('keydown', e => {
    // snakeVelocity = {x:0, y:1};
    moveSound.play();

    switch(e.key) {
        case "ArrowUp" :
            snakeVelocity.x = 0;
            snakeVelocity.y = -1;
            break;

        case "ArrowDown" :
            snakeVelocity.x = 0;
            snakeVelocity.y = 1;
            break;

        case "ArrowLeft" :
            snakeVelocity.x = -1;
            snakeVelocity.y = 0;
            break;

        case "ArrowRight" :
            snakeVelocity.x = 1;
            snakeVelocity.y = 0;
            break;
    }
});