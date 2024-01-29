window.addEventListener("load", function () {
  // let signupDismiss = document.getElementById("signup-dismiss");
  let signupDismiss = document.getElementById("dismisser");
  let signupNotice = document.getElementById("signup-notice");

  signupDismiss.addEventListener("click", () => {
    // signupNotice.style.display = "none";
    signupNotice.classList.add("d-none");
    console.log("signup Clicked!!");
  });
});

let BackBTN = document.querySelector(".btn-two");
let payment = document.querySelector("select[name=payment]");
let state = document.querySelector("select[name=State]");
let paymentoptions = document.querySelectorAll("select[name=payment] option");
let img = document.querySelector(".img > img");
let purchaseBTN = document.querySelector(".btn-one");
let allInputs = document.querySelectorAll("input");
let errorDIV = document.querySelector(".error");
let arr = [];

let products = [];

if (localStorage.getItem("cart") != null) {
  var myProduct = JSON.parse(localStorage.getItem("cart"));
  products.push(myProduct);
}

/*
for (let i = 0 ; i < myProduct.length ; i++) {
    console.log(myProduct[i].product);
    console.log(myProduct[i].quantity);
    console.log(myProduct[i].product.stock -= myProduct[i].quantity);
}
*/

function displayCart() {
  // this should not adding the new rows
  document.querySelector(".one").innerHTML = ``;
  let hamada = ``;
  for (let i = 0; i < myProduct.length; i++) {
    if (myProduct[i].userID === activeuser.id) {
    const itemTotal = myProduct[i].product.price * myProduct[i].quantity;
    subTotalPrice += itemTotal;

    hamada = `
      <div class="product">
      <img src="${myProduct[i].product.thumbnail}" alt="">
      <div class="info">
          <div class="text">
              <h2>${myProduct[i].product.productName}</h2>
              <p><span>Size: </span>${myProduct[i].product.size}</p>
              <p><span>Color: </span>White</p>
              <h3>$<span class="price">${(
                myProduct[i].product.price * myProduct[i].quantity
              ).toFixed(2)}</span></h3>
          </div>
          <input readonly type="text" class="quantity-input" value="${
            myProduct[i].quantity
          }">
      </div>
      `;
    document.querySelector(".one").innerHTML += hamada;
  }
}
  updateTotalPrices();
}

//regex validation
let regexFirstName = /^[a-zA-Z]{3,}$/;
let regexLastName = /^[a-zA-Z]{3,}$/;
let numberRegex = /^01[0125]\d{8}$/;
let creditRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/; //1234-1234-1234-1234
let fullNameRegex = /^[a-zA-Z]{3,}[a-zA-Z]{3,}$/;
let ccvRegex = /^\d{3}$/;
//let expRegex = //;

if (localStorage.getItem("purchase") != null) {
  arr = JSON.parse(localStorage.getItem("purchase"));
  console.log(arr);
}

BackBTN.addEventListener("click", function () {
  window.location.href = "    Cart.html";
}); // end of back function

payment.addEventListener("change", function (e) {
  let selectedOption = e.target.value;
  if (selectedOption === "visa") {
    img.src = "images/visa.png";
  } else if (selectedOption === "master") {
    img.src = "images/master.png";
  } else if (selectedOption === "express") {
    img.src = "images/america.png";
  }
});

purchaseBTN.addEventListener("click", function (e) {
  if (!validation()) {
    e.preventDefault();
  } else {
    for (let i = 0; i < myProduct.length; i++) {
      myProduct[i].product.stock -= myProduct[i].quantity;
      myProduct[i].decreaseProductQuantity(
        myProduct[i].productId,
        myProduct[i].quantity
      );
      if (myProduct[i].product.stock < 0) {
        alert("there is no items from this product");
      }
    }
  }
});
let activeuser = JSON.parse(localStorage.getItem("activeuser"));
function validation() {
  for (let i = 1; i <= 9; i++) {
    if (allInputs[i].value == "" || allInputs[i].value == null) {
      errorDIV.innerHTML = "You should fill all required inputs";
      allInputs[i].style.border = "2px solid red";
    } else {
      errorDIV.innerHTML = "";
      allInputs[i].style.border = "2px solid green";
    }
  }
  //first Name validation
  if (!regexFirstName.test(allInputs[1].value)) {
    allInputs[1].style.border = "2px solid red";
    return false;
  } else {
    allInputs[1].style.border = "2px solid green";
  }

  // last name validation
  if (!regexLastName.test(allInputs[2].value)) {
    allInputs[2].style.border = "2px solid red";
    return false;
  } else {
    allInputs[2].style.border = "2px solid green";
  }

  // mobile phone validation
  if (!numberRegex.test(allInputs[3].value)) {
    allInputs[3].style.border = "2px solid red";
    return false;
  } else {
    allInputs[3].style.border = "2px solid green";
  }

  //credit number regex
  if (!creditRegex.test(allInputs[6].value)) {
    allInputs[6].style.border = "2px solid red";
    return false;
  } else {
    allInputs[6].style.border = "2px solid green";
  }

  //credit card name
  if (!fullNameRegex.test(allInputs[7].value)) {
    allInputs[7].style.border = "2px solid red";
    return false;
  } else {
    allInputs[7].style.border = "2px solid green";
  }
  //
  if (!ccvRegex.test(allInputs[9].value)) {
    allInputs[9].style.border = "2px solid red";
    return false;
  } else {
    allInputs[9].style.border = "2px solid green";
  }

  for (let i = 0; i < myProduct.length; i++) {
    let userFullName = allInputs[1].value + " " + allInputs[2].value;
    let UserMobile = allInputs[3].value;
    let UserCity = allInputs[4].value;
    let UserAddress = allInputs[5].value;
    let UserState = state.value;

    // let successPurchase = {
    //     "orderId": 1,
    //     "orderName": myProduct[i].name ,
    //     "price": myProduct[i].price ,
    //     "quantity" : myProduct[i].quantity,
    //     "status": 4,
    //     "details": `Size = ${myProduct[i].size}, Color = Blue`,
    //     "DeliveryDetails": `FullName = ${userFullName}, Address = ${UserAddress}, City = ${UserCity}, State = ${UserState}, Phone = ${UserMobile}`,
    //     "sellerId": "s1",
    //     "orderDate": getCurrentDate(),
    // };

    
    let successPurchase = {
      userId: activeuser.id,
      orderId: arr.length + 1,
      products: [],
    };

    for (let i = 0; i < myProduct.length; i++) {
      let orderItem = {
        productId: myProduct[i].productId,
        orderName: myProduct[i].product.productName,
        price: myProduct[i].product.price,
        quantity: myProduct[i].quantity,
        status: 4,
        details: `Size = ${myProduct[i].size}, Color = Blue`,
        deliveryDetails: `FullName = ${userFullName}, Address = ${UserAddress}, City = ${UserCity}, State = ${UserState}, Phone = ${UserMobile}`,
        sellerId: "s1",
        orderDate: getCurrentDate(),
      };
      successPurchase.products.push(orderItem);
    }

    arr.push(successPurchase);
    localStorage.setItem("purchase", JSON.stringify(arr));
  }
  return true;
}

function getCurrentDate() {
  let currentDate = new Date();
  let year = currentDate.getFullYear();
  let month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  let day = currentDate.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let inputValue = document.querySelectorAll(".quantity-input");
let price = document.querySelectorAll(".price");
let trashBTN = document.querySelectorAll(".trash");

let subTotal = document.querySelector(".subtotal");
let DiscountTotal = document.querySelector(".Discount");
let TotalPrice = document.querySelector(".Total");
let DeliveryFee = document.querySelector(".fees");
let subTotalPrice = 0;

// // button Add
function Adding(index, button) {
  let inputValue = document.querySelectorAll(".quantity-input");
  let price = document.querySelectorAll(".price");
  inputValue[index].value++;
  price[index].innerHTML =
    Number(inputValue[index].value) * Number(myProduct[index].price);
  updateCartQuantity(index, inputValue[index].value);
  subTotalPrice += Number(myProduct[index].price);
  updateTotalPrices();
  localStorage.setItem("cart", JSON.stringify(myProduct));
}

// button Trash to delete
function Deletion(index, button) {
  let trashBTN = document.querySelectorAll(".trash");
  let productName = myProduct[index].name;
  let msg = confirm(`Do you want to delete ${productName}?`);
  if (msg) {
    //trashBTN[index].parentNode.parentNode.parentNode.remove();
    subTotalPrice -= Number(myProduct[index].price);
    myProduct.splice(index, 1);
    displayCart();
    localStorage.setItem("cart", JSON.stringify(myProduct));
  }
}

// button Minus to delete
function Delete(index, button) {
  let inputValue = document.querySelectorAll(".quantity-input");
  let price = document.querySelectorAll(".price");

  let productName = myProduct[index].name;
  inputValue[index].value--;
  price[index].innerHTML =
    Number(inputValue[index].value) * Number(myProduct[index].price);

  updateCartQuantity(index, inputValue[index].value);

  subTotalPrice -= Number(myProduct[index].price);
  updateTotalPrices();

  localStorage.setItem("cart", JSON.stringify(cart));

  if (inputValue[index].value == 0) {
    let msg = confirm(`Do you want to delete ${productName}?`);
    if (msg) {
      //minus[index].parentNode.parentNode.parentNode.parentNode.remove();
      subTotalPrice -= Number(myProduct[index].price);
      myProduct.splice(index, 1);
      displayCart();
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      updateCartQuantity(index, 1);
      price[index].innerHTML = Number(myProduct[index].price);
      inputValue[index].value = 1;
    }
  }
}

function updateTotalPrices() {
  const Discount = ((20 / 100) * subTotalPrice).toFixed(2);
  const Total = (
    subTotalPrice -
    Discount -
    Number(DeliveryFee.innerHTML)
  ).toFixed(2);
  subTotal.innerHTML = subTotalPrice.toFixed(2);
  DiscountTotal.innerHTML = Discount;
  TotalPrice.innerHTML = Total;
}

function updateCartQuantity(index, newQuantity) {
  myProduct[index].quantity = newQuantity;
  localStorage.setItem("cart", JSON.stringify(cart));
}

displayCart();
