import { profiles } from './profiles.js'

//card info
const img = document.querySelector("#person-img");
const name = document.querySelector("#author");
const job = document.querySelector("#job");
const text = document.querySelector("#info");

//buttons
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const randomBtn = document.querySelector("#random-button");

//initial item
let currentPerson = 0;

//load initial Item
window.addEventListener("DOMContentLoaded", () => {
  showPerson(currentPerson);
});

//show person based on item
const showPerson = (person) => {
  const item = profiles[person];
  img.src = item.img;
  author.textContent = item.name;
  job.textContent = item.job;
  info.textContent = item.text;
};

//show next person
nextBtn.addEventListener("click", () => {
  currentPerson++;
  if (currentPerson > profiles.length - 1) {
    currentPerson = 0;
  }
  showPerson(currentPerson);
});                                                                                                                                                                                              

//show prev person
prevBtn.addEventListener("click", () => {
  currentPerson--;
  if (currentPerson < 0) {
    currentPerson = profiles.length - 1;
  }
  showPerson(currentPerson);
});

//show random
randomBtn.addEventListener('click', ()=>{
    currentPerson = Math.floor(Math.random() * profiles.length)
    console.log(currentPerson)
    showPerson(currentPerson)
})