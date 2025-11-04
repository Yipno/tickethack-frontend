// console.log("script ok");

const departureInput = document.querySelector("#departure");
const arrivalInput = document.querySelector("#arrival");
const dateInput = document.querySelector("#date");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", () => {
  const arrival = arrivalInput.value;
  const departure = departureInput.value;
  const date = dateInput.value;
  getTrips(departure, arrival, date);
});

function getTrips(departure, arrival, date) {
  console.log(departure, arrival, date);
  //const trips = await fetch('http://localhost:3000/trips/')
}
