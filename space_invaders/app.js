const grid = document.querySelector(".grid");
let currentShooterI = 195;
const width = 15;
let direction = 1;
let invadersId;
let goingRight = true;

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
    squares[alienInvaders[i]].classList.add("invader");
  }
};

draw();

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
    console.log(alienInvaders[i]);
  }

  draw();

  if (squares[currentShooterI].classList.contains("invader", 'shooter')) {
    console.log("game over");
    clearInterval(invadersId);
  }
};

// setIntervalId
invadersId = setInterval(moveInvaders, 200);
//
