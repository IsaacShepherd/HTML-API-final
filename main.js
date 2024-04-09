import { mapsInit } from "./ymaps/mapsInit";

function success(pos) {
  const crd = pos.coords;

  console.log("Your current position is:");
  console.log(`Latitude : ${crd.latitude}`);
  console.log(`Longitude: ${crd.longitude}`);

  mapsInit(crd.latitude, crd.longitude);
  localStorage.setItem(
    "userLastPos",
    JSON.stringify(`${crd.latitude},${crd.longitude}`)
  );
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  const userLastPosStr = JSON.parse(localStorage.getItem("userLastPos"));
  let userLastPos;
  if (userLastPosStr) {
    userLastPos = userLastPosStr.split(",");
    console.log(userLastPos[0]);
  }

  if (err.code === 1) {
    alert("Геолокация должна быть включена для отображения местоположения.");
    if (userLastPos) {
      mapsInit(userLastPos[0], userLastPos[1]);
    } else {
      mapsInit(59.934640620531255, 30.306098441650413);
    }
  }
}

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const deleteAllMarks = document.getElementById("delete-all-marks-btn");
deleteAllMarks.addEventListener("click", (e) => {
  localStorage.removeItem("userMarks");
  localStorage.removeItem("locationText");
  location.reload();
});

navigator.geolocation.getCurrentPosition(success, error, options);
