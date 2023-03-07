"use strict";

const video = document.querySelector(".video");
const canvas = document.querySelector(".canvas");
const button = document.querySelector(".start-btn");
const photo = document.querySelector(".photo");
const buttonCancel = document.querySelector(".buttonCancel");
let takePhoto;



//constrains
/*
Aquí enviamos las caracteristicas del video y
audio que solicitamos
*/

const constraints = {
  audio: false,
  video: {width:420, height:340},
};

//acceso a la webcam
/*
Aquí recibimos la respuesta del navegador, es una promesa
 */

const init = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    console.log(stream);
    handleSucces(stream);
  } catch (error) {
    console.log(error);
  }
};

//
const handleSucces = (stream) => {
  window.stream = stream;
  video.srcObject = stream;
  video.play();
};

//
init();

//

button.addEventListener("click", () => {
  let context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, 420, 340);
  let data = canvas.toDataURL("image/png");
  photo.setAttribute("src", data);
});
