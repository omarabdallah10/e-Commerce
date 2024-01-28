
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
  

let BackBTN = document.querySelector(".btn-two");
let payment = document.querySelector("select[name=payment]");
let state = document.querySelector("select[name=State]");
let paymentoptions = document.querySelectorAll("select[name=payment] option");
let img = document.querySelector(".img > img")
let purchaseBTN = document.querySelector(".btn-one");
let allInputs = document.querySelectorAll("input");
let errorDIV = document.querySelector(".error");
let arr =[];



if(localStorage.getItem("cart")!=null) {
    var myProduct = JSON.parse(localStorage.getItem("cart"));
    console.log(myProduct);
}
function displayCart() {
    document.querySelector(".one").innerHTML = ``;
    let hamada = ``;
    for (let i = 0; i < myProduct.length; i++) {

        const itemTotal = myProduct[i].price * myProduct[i].quantity;
        subTotalPrice += itemTotal;
        hamada = `
        <div class="product">
        <img src="../images/electronic-store-product-image-36-400x400.jpg" alt="">
        <div class="info">
            <div class="text">
                <h2>${myProduct[i].name}</h2>
                <p><span>Size: </span>${myProduct[i].size}</p>
                <p><span>Color: </span>White</p>
                <h3>$<span class="price">${myProduct[i].price * myProduct[i].quantity}</span></h3>
            </div>
            <input readonly type="text" class="quantity-input" value="${myProduct[i].quantity}">

        </div>
        `;
        document.querySelector(".one").innerHTML += hamada;
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


if (localStorage.getItem("purchase")!=null) {
    arr = JSON.parse(localStorage.getItem("purchase"));
}


BackBTN.addEventListener("click", function () {
    window.location.href = "    Cart.html";
}); // end of back function



payment.addEventListener("change", function (e) {
    let selectedOption = e.target.value; 
    if (selectedOption === "visa") {
       img.src = "images/visa.png";
    }
    else if (selectedOption === "master") {
        img.src = "images/master.png";
    }
    else if (selectedOption === "express") {
        img.src = "images/america.png";
    }
});


purchaseBTN.addEventListener("click" , function(e){
    if(!validation()){
        e.preventDefault();
    }

});

function validation(){
    for(let i = 0 ; i< allInputs.length ;i++) {
        if(allInputs[i].value == "" || allInputs[i].value == null){
            errorDIV.innerHTML = "You should fill all required inputs";
            allInputs[i].style.border = "2px solid red"; 
        }
        else {
            errorDIV.innerHTML = "";
            allInputs[i].style.border = "2px solid green"; 
        }
    }
    //first Name validation
    if(!regexFirstName.test(allInputs[0].value)){
        
        allInputs[0].style.border = "2px solid red"; 
        return false;
    }
    else {
        allInputs[0].style.border = "2px solid green"; 
    }

    // last name validation
    if(!regexLastName.test(allInputs[1].value)){
        
        allInputs[1].style.border = "2px solid red"; 
        return false;
    }
    else {
        allInputs[1].style.border = "2px solid green"; 
    }

    // mobile phone validation
    if (!numberRegex.test(allInputs[2].value)) {
        allInputs[2].style.border = "2px solid red";
        return false;
    } else {
        allInputs[2].style.border = "2px solid green";
    }

    //credit number regex
    if (!creditRegex.test(allInputs[5].value)) {
        allInputs[5].style.border = "2px solid red";
        return false;
    } else {
        allInputs[5].style.border = "2px solid green";
    }

    //credit card name
    if (!fullNameRegex.test(allInputs[6].value)) {
        allInputs[6].style.border = "2px solid red";
        return false;
    } else {
        allInputs[6].style.border = "2px solid green";
    }
    //
    if (!ccvRegex.test(allInputs[8].value)) {
        allInputs[8].style.border = "2px solid red";
        return false;
    } else {
        allInputs[8].style.border = "2px solid green";
    }

    // let successPurchase = {
    //     UserFnameName : allInputs[0].value,
    //     UserLastName : allInputs[1].value,
    //     UserMobile : allInputs[2].value,
    //     UserCity : allInputs[3].value,
    //     UserAddress : allInputs[4].value,
    //     UserState : state.value,
    //     UserCardType : payment.value,
    //     UserCardNo : allInputs[5].value,
    //     UserCardName : allInputs[6].value,
    //     UserCardExp : allInputs[7].value,
    //     UserCardCCV : allInputs[8].value,
    // };

    // arr.push(successPurchase);
    // localStorage.setItem("purchase",JSON.stringify(arr));
    // const newOrder = new Order(
    //     'u2', // user ID
    //     3, // order ID
    //     'greeeeen', // orderName
    //     6, // price
    //     3, // status
    //     '', // avatar
    //     'Size = L, Color = Yellow', // details
    //     'FullName = eee, Address = 5678 Main St, City = Los Angeles, State = CA, Zip = 90001, Phone = 213-555-5678', // deliveryDetails
    //     's1', // sellerId
    //     '2022-01-15' // orderDate
    // );
    
    
    // orders.addOrder('u2', newOrder);
    return true;

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
    price[index].innerHTML = Number(inputValue[index].value) * Number(myProduct[index].price);
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
    price[index].innerHTML = Number(inputValue[index].value) * Number(myProduct[index].price);
    
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
      }
      else {
        updateCartQuantity(index, 1);
        price[index].innerHTML = Number(myProduct[index].price);
        inputValue[index].value = 1;
      }
    }
  }
  

  function updateTotalPrices() {
    const Discount = (20 / 100) * subTotalPrice;
    const Total = subTotalPrice - Discount - Number(DeliveryFee.innerHTML);
    subTotal.innerHTML = subTotalPrice;
    DiscountTotal.innerHTML = Discount;
    TotalPrice.innerHTML = Total;
  }
  
  function updateCartQuantity(index, newQuantity ) {
    myProduct[index].quantity = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  
  displayCart();