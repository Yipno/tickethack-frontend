// console.log("script ok");
moment.locale("fr");

const departureInput = document.querySelector("#departure");
const arrivalInput = document.querySelector("#arrival");
const dateInput = document.querySelector("#date");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", async () => {
  const arrival = arrivalInput.value;
  const departure = departureInput.value;
  const date = dateInput.value;
  const trips = await getTrips(departure, arrival, date);
  if (!departure || !arrival || !date) {
    alert("Tous les champs sont requis !");
    return;
  }

  showTrips(trips);
});

async function getTrips(departure, arrival, date) {
  console.log(departure, arrival, date);
  try {
    const response = await fetch(
      `http://localhost:3000/trips?departure=${departure}&arrival=${arrival}&date=${date}`
    );
    const trips = await response.json();
    return trips.result ? trips.trips : [];
  } catch (err) {
    console.error("error searching trips:", err);
    alert("Probleme de connexion avec le server");
  }
}

function showTrips(trips) {
  const container = document.querySelector(".train-box");
  if (trips.length === 0) {
    container.innerHTML = `<img src="./images/notfound.png" alt="not-found"/>
    <p>No trip found.</p>`;
    return;
  }
  container.innerHTML = "";
  let html = "";
  for (let i = 0; i < trips.length; i++) {
    const horaire = moment(trips[i].date).format("LT");
    html += `
        <div class='trip-selector'>
        <p class='travelCities'>${trips[i].departure} > ${trips[i].arrival}</p>
        <p class='horaire'>${horaire}</p>
        <p class='price'>${trips[i].price}€</p>
        <button class='book'>Book</button>
        </div>`;
  }
  document.querySelector(".train-box").innerHTML = html;
}
