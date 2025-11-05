moment.locale("fr");
console.log("tkt");

//! SCRIPT CART

getCart();

// charge les voyages present dans cart
async function getCart() {
  const container = document.querySelector("#cart-container");
  const result = await fetch("http://localhost:3000/cart/");
  const data = await result.json();
  if (data.result === false) {
    container.innerHTML = `<p>No tickets in your cart.</p>`;
    return;
  }
  const trips = data.cart;
  console.log(trips);
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
              <span class='cartId' style='display: none;'>${trips[i]._id}</span>
              <span class='tripId' style='display: none;'>${trips[i].trip._id}</span>
              <button class='remove-btn'>
              ❌
              </button>
            </div>`;
  }
  container.innerHTML =
    html +
    `<div class="cart-total">
        <span> Total : <span id="cart-total">0</span>€</span>
        <button class="purchase-btn" id="purchase-btn">Purchase</button>
    </div>`;
  getTotal();
  deleteCartItem();
}

function getTotal() {
  const priceDiv = document.querySelectorAll(".price");
  let total = 0;
  priceDiv.forEach((price) => (total += parseInt(price.textContent)));
  document.querySelector("#cart-total").textContent = total;
}

function deleteCartItem() {
  const deleteBtns = document.querySelectorAll(".remove-btn");
  deleteBtns.forEach((btn) => {
    btn.addEventListener("click", async function () {
      const cartId = this.parentNode.querySelector(".cartId").textContent;
      // console.log(cartId);
      const data = await fetch(`http://localhost:3000/cart/${cartId}`, {
        method: "DELETE",
      });
      const result = await data.json();
      console.log(result);
      if (result.result) {
        this.parentNode.remove();
        getTotal();
      } else {
        alert("Cant touch this !");
      }
    });
  });
}

// function deleteCartFromDB(id) {}
