const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const color = document.querySelector(".color");

const btn = document.getElementById("btn").addEventListener("click", () => {
  let hexColor = "#";
  
  for (let i = 0; i < 6; i++) {
    const randomNumber = getRandomNumber();
    console.log(randomNumber);
    hexColor += hex[randomNumber];
  }

  document.body.style.backgroundColor = hexColor;
  color.textContent = hexColor;
});

const getRandomNumber = () => {
  return Math.floor(Math.random() * hex.length);
};
