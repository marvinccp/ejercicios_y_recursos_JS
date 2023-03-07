const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".resultDisplay");

let aliensRemoved = [];
let currentShooterI = 202;
const width = 15;
let direction = 1;
let invadersId;
let goingRight = true;
let results = 0;

//sounds
const invader = new Audio("./assets/sounds/invader.wav");
const gameOver = new Audio("./assets/sounds/gameOver.wav");
const shootRay = new Audio("./assets/sounds/shoot.wav");
const gameMusic = new Audio('./assets/sounds/gameMusic.mp3')

//create squares(escene)
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

//squares to array
const squares = Array.from(document.querySelectorAll(".grid div"));

//index generator
const alienInvaders = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 30, 31,
  32, 33, 34, 35, 36, 37, 38, 39,
];

//draw invaders
const draw = () => {
  for (let i = 0; i < alienInvaders.length; i++) {
    if (!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add("invader");
    }
  }
};
draw()


//remove invaders
const remove = () => {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove("invader");
  }
};

const shooter = squares[currentShooterI].classList.add("shooter");

//move shooter
const moveShooter = (e) => {
  squares[currentShooterI].classList.remove("shooter");

  let left = currentShooterI % width !== 0;
  let right = currentShooterI % width < width - 1;

  switch (e.key) {
    case "ArrowLeft":
      if (left) currentShooterI -= 1;
      break;
    case "ArrowRight":
      if (right) currentShooterI += 1;
      break;
  }

  squares[currentShooterI].classList.add("shooter");
};

document.addEventListener("keydown", moveShooter);

//move invaders
const moveInvaders = () => {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;

  remove();

  //back to left
  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
      goingRight = false;
    }
  }

  //back to right
  if (leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
      goingRight = true;
    }
  }

  //constant move
  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  draw();

  if (squares[currentShooterI].classList.contains("invader", "shooter")) {
    console.log("game over");
    resultDisplay.innerHTML = "Game Over";
    gameOver.play();
    gameMusic.pause();
    clearInterval(invadersId);
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders > 301) {
      resultDisplay.innerHTML = "Game Over";
      gameOver.play();
      gameMusic.pause()
      clearInterval(invadersId);
    }
  }

  if (aliensRemoved.length === alienInvaders.length) {
    resultDisplay.innerHTML = "YOU WIN";
    clearInterval(invadersId);
  }
};

//start game
const start = document.querySelector(".start");
start.addEventListener("click", ()=>{
  // setIntervalId
  invadersId = setInterval(moveInvaders, 500);
  gameMusic.play()
  //
});


const shoot = (e) => {
  let laserId;
  let currentLaserI = currentShooterI;

  const moveLaser = () => {
    squares[currentLaserI].classList.remove("laser");
    currentLaserI -= width;

    squares[currentLaserI].classList.add("laser");

    if (squares[currentLaserI].classList.contains("invader")) {
      squares[currentLaserI].classList.remove("laser");
      squares[currentLaserI].classList.remove("invader");
      squares[currentLaserI].classList.add("boom");
      invader.play();

      setTimeout(() => squares[currentLaserI].classList.remove("boom"), 200);
      clearInterval(laserId);

      const alienRemoved = alienInvaders.indexOf(currentLaserI);
      aliensRemoved.push(alienRemoved);
      results++;
      resultDisplay.innerHTML = results;
      console.log(aliensRemoved);
    }
  };

  switch (e.key) {
    case "ArrowUp":
      laserId = setInterval(moveLaser, 150);
      shootRay.play();
  }
};

document.addEventListener("keydown", shoot);
