window.addEventListener('load', function() {
  // let signupDismiss = document.getElementById("signup-dismiss");
  let signupDismiss = document.getElementById("dismisser");
  let signupNotice = document.getElementById("signup-notice");

  signupDismiss.addEventListener("click", () => {
    // signupNotice.style.display = "none";
    signupNotice.classList.add("d-none");
    console.log("signup Clicked!!");
  });


});

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

let activeuser = JSON.parse(localStorage.getItem("activeuser"));


if (localStorage.getItem("cart")!=null) {
  cart = JSON.parse(localStorage.getItem("cart"));
}

let mainIndex = 0;

function displayCart() {
  document.querySelector(".left").innerHTML = "";
  let hamada = ``;

  const activeUserCart = cart.filter(item => item.userID === activeuser.id);

  activeUserCart.forEach((cartItem, index) => {
    const itemTotal = cartItem.product.price * cartItem.quantity;
    subTotalPrice += itemTotal;

    hamada = `
      <div class="product">
        <img src="${cartItem.product.thumbnail}" alt="">
        <div class="info">
          <div class="text">
            <h2>${cartItem.product.productName}</h2>
            <p><span>Size: </span>${cartItem.product.size}</p>
            <p><span>Color: </span>White</p>
            <h3>$<span class="price">${(cartItem.product.price * cartItem.quantity).toFixed(2)}</span></h3>
          </div>
          <div class="buttons">
            <button class="trash" onclick="deletion(${index}, this)"><i class="fa-solid fa-trash"></i></button>
            <div class="cart-container">
              <button class="quantity-btn minus" onclick="Delete(${index}, this)">-</button>
              <input readonly type="text" class="quantity-input" value="${cartItem.quantity}">
              <button class="quantity-btn plus" onclick="Adding(${index}, this);">+</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.querySelector(".left").innerHTML += hamada;
  });

  updateTotalPrices();
}


function Adding(index, button) {
  console.log(index);
  //let mainIndex = button.parentNode.parentNode.parentNode.parentNode;
  
  let inputValue = document.querySelectorAll(".quantity-input");
  let price = document.querySelectorAll(".price");

  console.log("activeuser.id:", activeuser.id);
  console.log("cart[index].userID:", cart[index].userIDD);

  if (Number(inputValue[index].value) + 1 > cart[index].product.stock) {
    alert("Sorry, the selected quantity exceeds the available stock.");
    console.log("Stock Exceeded!");
    return; // Exit the function if the stock is exceeded
  }

  inputValue[index].value++;
  price[index].innerHTML = (Number(inputValue[index].value) * Number(cart[index].product.price)).toFixed(2);
  updateCartQuantity(index, inputValue[index].value);
  subTotalPrice += Number(cart[index].product.price);
  updateTotalPrices();
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Adding successful!");
}



// button Trash to delete
function Deletion(index, button) {
  let trashBTN = document.querySelectorAll(".trash");
  let productName = cart[index].product.productName;
  let msg = confirm(`Do you want to delete ${productName}?`);
  if (msg) {
    subTotalPrice -= Number(cart[index].product.price * cart[index].quantity);
    cart.splice(index, 1);
    displayCart();
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

// button Minus to delete
function Delete(index, button) {
  let inputValue = document.querySelectorAll(".quantity-input");
  let price = document.querySelectorAll(".price");

  let productName = cart[index].product.productName;
  inputValue[index].value--;
  price[index].innerHTML = (Number(inputValue[index].value) * Number(cart[index].product.price)).toFixed(2);

  updateCartQuantity(index, inputValue[index].value);

  subTotalPrice -= Number(cart[index].product.price);
  updateTotalPrices();

  localStorage.setItem("cart", JSON.stringify(cart));

  if (inputValue[index].value == 0) {
    let msg = confirm(`Do you want to delete ${productName}?`);
    if (msg) {
      subTotalPrice -= Number(cart[index].product.price * cart[index].quantity);
      cart.splice(index, 1);
      displayCart();
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      updateCartQuantity(index, 1);
      price[index].innerHTML = Number(cart[index].product.price);
      inputValue[index].value = 1;
    }
  }
}



checkOut.addEventListener("click" , function() {
    window.location.href = "Checkout.html"
    localStorage.setItem("myProducts" , JSON.stringify(cart));
});//end of checkout page


function updateTotalPrices() {
  const Discount = ((20 / 100) * subTotalPrice).toFixed(2);
  const Total = (subTotalPrice - Discount - Number(DeliveryFee.innerHTML)).toFixed(2);
  subTotal.innerHTML = subTotalPrice.toFixed(2);
  DiscountTotal.innerHTML = Discount;
  TotalPrice.innerHTML = Total;
}

function updateCartQuantity(index, newQuantity ) {
  cart[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
}

displayCart();



