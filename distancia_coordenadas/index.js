//https://parzibyte.me/blog/2022/09/07/javascript-distancia-entre-2-coordenadas/

/* vamos a calcular la distancia entre dos puntos
fórmula de Haversine en JavaScript
*/

/*las coordenadas están en grados y necesitamos
radianes, los haremos con esta función
*/

const degToRad = (deg) => {
  return (deg * Math.PI) / 180;
};

/*
La fórmula haversine determina la distancia del círculo máximo entre dos puntos en una esfera dadas sus longitudes y latitudes 
*/

const distTwoPoints = (lat1, lon1, lat2, lon2) => {
  //change to radians

  lat1 = degToRad(lat1);
  lon1 = degToRad(lon1);
  lat2 = degToRad(lat2);
  lon2 = degToRad(lon2);

  /* haversine formula */

  // earth radius km
  const earthRadius = 6371;

  let lonDifference = lon1 - lon2;
  let latDifference = lat1 - lat2;

  let a =
    Math.pow(Math.sin(latDifference / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(lonDifference / 2), 2);

  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};

const getResult = () => {
    let lat1 = document.getElementById("lat1").value;
    let lon1 = document.getElementById("lon1").value;
    let lat2 = document.getElementById("lat2").value;
    let lon2 = document.getElementById("lon2").value;
  //   console.log(lat1, lon1, lat2, lon2);
  //   return distTwoPoints(
  //     19.416326917410476,
  //     -99.12479042256915,
  //     23.097069089850933,
  //     -82.35006433419622
  //   );
  return distTwoPoints(lat1, lon1, lat2, lon2);
};

const result = document.getElementById('result')

const btn = document.getElementById("btn").addEventListener("click", () => {
  const result1 = getResult();
  result.textContent = result1
  console.log(result1);
});
