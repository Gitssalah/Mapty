"use strict";

var selectedMarker = -1;
let devCount = 0;
var listMarker = [];
var workoutInfo = document.querySelector(".workout-info");
var arrowButton = document.querySelector("#button-activity");
var workoutType = document.querySelector("#list-workout");
var workoutTime = document.querySelector("#duration");
const activities = document.querySelector("#activities");
var activityblock = document.querySelector(".activity-block");
const addButton = document.querySelector("#add-workout");
arrowButton.addEventListener("click", function () {
  if (workoutType.value == activities.options[0].value) {
    workoutType.value = activities.options[1].value;
  } else if (workoutType.value == activities.options[1].value) {
    workoutType.value = activities.options[2].value;
  } else {
    workoutType.value = activities.options[0].value;
  }
});

addButton.addEventListener("click", function () {
  var contentMarker = `${workoutType.value} for ${workoutTime.value} min`;
  let addedWorkout = document.createElement("div");
  addedWorkout.id = "added-workout" + devCount;
  addedWorkout.style.cssText =
    "display: flex; font-weight: bold; justify-content: center; align-items: center; background-color: #508d69; color: #ececec; height: 50px; margin: 5px; border-radius: 5px;";
  addedWorkout.innerHTML = contentMarker;
  activityblock.appendChild(addedWorkout);
  devCount++;
  workoutInfo.classList.add("hidden");
  console.log(addedWorkout);
  localStorage.setItem(
    `added-workout ${devCount}`,
    JSON.stringify(`${contentMarker}`)
  );
});
navigator.geolocation.getCurrentPosition(
  function (pos) {
    const { latitude } = pos.coords;
    const { longitude } = pos.coords;
    var map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    map.on("click", function (event) {
      listMarker.push(L.marker([event.latlng.lat, event.latlng.lng]));
      selectedMarker += 1;
      L.marker([event.latlng.lat, event.latlng.lng]);

      workoutInfo.classList.remove("hidden");

      addButton.addEventListener("click", function () {
        var contentMarker = `${workoutType.value} for ${workoutTime.value} min`;
        listMarker[selectedMarker]
          .addTo(map)
          .bindPopup(
            L.popup({
              autoClose: false,
              closeOnClick: false,
            })
          )
          .setPopupContent(contentMarker)
          .openPopup();
      });
    });
  },
  function () {
    alert("could not track your location");
  }
);
