moment.locale("fr");
console.log("tkt");

//! SCRIPT CART

getCart();

// charge les voyages present dans cart
async function getCart() {
  const container = document.querySelector("#cart-container");
  const result = await fetch("http://localhost:3000/cart/");
  const data = await result.json();
  const trips = data.cart;
  console.log(trips);
  if (trips.length === 0) {
    container.innerHTML = `<p>No tickets in your cart.</p>`;
    return;
  }
  container.innerHTML = "";
  let html = "";
  for (let i = 0; i < trips.length; i++) {
    // console.log(i, trips[i].trip.departure);
    const horaire = moment(trips[i].trip.date).format("LT");
    html += `
            <div class='cart-item'>
            <span>${trips[i].trip.departure} > ${trips[i].trip.arrival}</span>
            <span class='horaire'>${horaire}</span>
            <span class='price'>${trips[i].trip.price}€</span>
            <span class='tripId' style='display: none;'>${trips[i].trip._id}</span>
            <button class='delete'>
            ❌
                </button>
                </div>`;
  }
  container.innerHTML = html;
}
