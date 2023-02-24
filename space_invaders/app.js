const grid = document.querySelector(".grid");
const currentShooterI = 200;

//create squares(escene)
for (let i = 0; i < 225; i++) {
  const square = document.createElement("div");
  grid.appendChild(square);
}

//squres to array
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

const shooter = squares[currentShooterI].classList.add("shooter");

//move shooter
const moveShooter = (e) => {
  const shooter = squares[currentShooterI].classList.remove("shooter");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterI % width !== 0) currentShooterI -= 1;
      break;
    case "ArrowRight":
      if (currentShooterI % width < width - 1) currentShooterI += 1;
  }
};
