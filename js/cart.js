let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let inputValue = document.querySelectorAll(".quantity-input");
let price = document.querySelectorAll(".price");
let trashBTN = document.querySelectorAll(".trash");
let checkOut = document.querySelector(".check");
let cart = [];


let subTotal = document.querySelector(".subtotal");
let DiscountTotal = document.querySelector(".Discount");
let TotalPrice = document.querySelector(".Total");
let DeliveryFee = document.querySelector(".fees");
let subTotalPrice = 0;



if (localStorage.getItem("cart")!=null) {
  cart = JSON.parse(localStorage.getItem("cart"));
}


function displayCart() {
  // this should not adding the new rows
  document.querySelector(".left").innerHTML = "";
  let hamada = ``;
  for (let i=0 ;i<cart.length;i++){ 

    const itemTotal = cart[i].price * cart[i].quantity;
    subTotalPrice += itemTotal;

    hamada = `
    <div class="product">
    <img src="../images/electronic-store-product-image-36-400x400.jpg" alt="">
    <div class="info">
        <div class="text">
            <h2>${cart[i].name}</h2>
            <p><span>Size: </span>${cart[i].size}</p>
            <p><span>Color: </span>White</p>
            <h3>$<span class="price">${cart[i].price * cart[i].quantity}</span></h3>
        </div>
        <div class="buttons">
            <button class="trash" onclick = "Deletion(${i},this)"><i class="fa-solid fa-trash"></i></button>
            <div class="cart-container">
                <button class="quantity-btn minus" onclick = "Delete(${i},this)">-</button>
                <input readonly type="text" class="quantity-input" value="${cart[i].quantity}">
                <button class="quantity-btn plus" onclick = "Adding(${i} ,this);">+</button>
              </div>
        </div>
    </div>
    `;
    document.querySelector(".left").innerHTML += hamada ;
  }
  updateTotalPrices();
}


// button Add
function Adding(index, button) {
  let inputValue = document.querySelectorAll(".quantity-input");
  let price = document.querySelectorAll(".price");
  inputValue[index].value++;
  price[index].innerHTML = Number(inputValue[index].value) * Number(cart[index].price);
  updateCartQuantity(index, inputValue[index].value);
  subTotalPrice += Number(cart[index].price);
  updateTotalPrices();
  localStorage.setItem("cart", JSON.stringify(cart));
}


// button Trash to delete
function Deletion(index, button) {
  let trashBTN = document.querySelectorAll(".trash");
  let productName = cart[index].name;
  let msg = confirm(`Do you want to delete ${productName}?`);
  if (msg) {
    //trashBTN[index].parentNode.parentNode.parentNode.remove();
    subTotalPrice -= Number(cart[index].price);
    cart.splice(index, 1);
    displayCart();
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

// button Minus to delete
function Delete(index, button) {
  let inputValue = document.querySelectorAll(".quantity-input");
  let price = document.querySelectorAll(".price");

  let productName = cart[index].name;
  inputValue[index].value--;
  price[index].innerHTML = Number(inputValue[index].value) * Number(cart[index].price);
  
  updateCartQuantity(index, inputValue[index].value);
  
  subTotalPrice -= Number(cart[index].price);
  updateTotalPrices();
  
  localStorage.setItem("cart", JSON.stringify(cart));
  
  
  if (inputValue[index].value == 0) {
    let msg = confirm(`Do you want to delete ${productName}?`);
    if (msg) {
      //minus[index].parentNode.parentNode.parentNode.parentNode.remove();
      subTotalPrice -= Number(cart[index].price);
      cart.splice(index, 1);
      displayCart();
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    else {
      updateCartQuantity(index, 1);
      price[index].innerHTML = Number(cart[index].price);
      inputValue[index].value = 1;
    }
  }
}


checkOut.addEventListener("click" , function() {
    window.location.href = "Checkout.html"
    localStorage.setItem("myProducts" , JSON.stringify(cart));
});//end of checkout page


function updateTotalPrices() {
  const Discount = (20 / 100) * subTotalPrice;
  const Total = subTotalPrice - Discount - Number(DeliveryFee.innerHTML);
  subTotal.innerHTML = subTotalPrice;
  DiscountTotal.innerHTML = Discount;
  TotalPrice.innerHTML = Total;
}

function updateCartQuantity(index, newQuantity ) {
  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
}


displayCart();


/*
let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let inputValue = document.querySelectorAll(".quantity-input");
let price = document.querySelectorAll(".price");
let trashBTN = document.querySelectorAll(".trash");
let checkOut = document.querySelector(".check");
let cart = [];

let subTotal = document.querySelector(".subtotal");
let DiscountTotal = document.querySelector(".Discount");
let TotalPrice = document.querySelector(".Total");
let DeliveryFee = document.querySelector(".fees");
let subTotalPrice = 0;

if (localStorage.getItem("cart") != null) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

function displayCart() {
  document.querySelector(".left").innerHTML = "";
  let hamada = ``;

  for (let i = 0; i < cart.length; i++) {
    const itemTotal = cart[i].price * cart[i].quantity;
    subTotalPrice += itemTotal;

    hamada = `
      <div class="product">
        <img src="../images/electronic-store-product-image-36-400x400.jpg" alt="">
        <div class="info">
          <div class="text">
            <h2>${cart[i].name}</h2>
            <p><span>Size: </span>${cart[i].size}</p>
            <p><span>Color: </span>White</p>
            <h3>$<span class="price">${cart[i].price * cart[i].quantity}</span></h3>
          </div>
          <div class="buttons">
            <button class="trash" onclick="deleteProduct(${i})"><i class="fa-solid fa-trash"></i></button>
            <div class="cart-container">
              <button class="quantity-btn minus" onclick="decreaseQuantity(${i})">-</button>
              <input readonly type="text" class="quantity-input" value="${cart[i].quantity}">
              <button class="quantity-btn plus" onclick="increaseQuantity(${i})">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
    document.querySelector(".left").innerHTML += hamada;
  }

  updateTotalPrices();
}

function increaseQuantity(index) {
  cart[index].quantity++;
  updateCart(index);
}

function decreaseQuantity(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity--;
    updateCart(index);
  }
}

function deleteProduct(index) {
  const productName = cart[index].name;
  const msg = confirm(`Do you want to delete ${productName}?`);

  if (msg) {
    subTotalPrice -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    updateCart();
  }
}

function updateCart(index) {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

checkOut.addEventListener("click", function () {
  window.location.href = "../pages/CheckOut.html";
  localStorage.setItem("myProducts", JSON.stringify(cart));
}); // end of checkout page

function updateTotalPrices() {
  const Discount = (20 / 100) * subTotalPrice;
  const Total = subTotalPrice - Discount - Number(DeliveryFee.innerHTML);
  subTotal.innerHTML = subTotalPrice;
  DiscountTotal.innerHTML = Discount;
  TotalPrice.innerHTML = Total;
}

displayCart();
*/


