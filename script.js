// console.log("script ok");
moment.locale("fr");

//! SCRIPT INDEX

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
    // console.log(trips[i]._id);
    const horaire = moment(trips[i].date).format("LT");
    html += `
        <div class='trip-selector'>
        <p class='travelCities'>${trips[i].departure} > ${trips[i].arrival}</p>
        <p class='horaire'>${horaire}</p>
        <p class='price'>${trips[i].price}€</p>
        <span class='tripId' style='display: none;'>${trips[i]._id}</span>
        <button class='book'>
        Book
            </button>
            </div>`;
  }
  document.querySelector(".train-box").innerHTML = html;
  addToCart();
}

// ajoute le clic sur les boutons, au clic sur un ca envoie l'id vers la db carts
function addToCart() {
  const bookBtns = document.querySelectorAll(".book");
  bookBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const tripId = this.parentNode.querySelector(".tripId").textContent;
      sendTripToDB(tripId);
    });
  });
}

async function sendTripToDB(id) {
  if (!id) {
    alert("Impossible d'ajouter le voyage au panier 'BAD ID'");
    return;
  }
  const data = await fetch("http://localhost:3000/cart/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  const result = await data.json();
  if (result.result) {
    window.location.assign("./cart.html");
  } else {
    alert(
      "Oups! Something went wrong and at this point I am too afraid to ask"
    );
  }
}

//! SCRIPT CART
