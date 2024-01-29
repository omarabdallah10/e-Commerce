
import Products from './database/Products.js';

// or via CommonJS


let currentQuantity=0;
const quantityElement =document.getElementById('quantityDisplay');
const innerTxtQuantity = quantityElement.textContent;
currentQuantity = parseInt(innerTxtQuantity);

// Initializing the Products module
const products = new Products();
// get product id from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId);
//get id from database
var product =products.getProductById(productId);

const imgBig=product.thumbnail;

const priceAfterDiscount=((product.price * (100 - product.discount)) /100).toFixed(2);
const imgDiv=document.getElementById('imgsContainer');
let imgBlock='';
imgBlock+=`

  <div class=" mb-3 d-flex justify-content-center">

  <img id="img0" style="max-width: 80%; max-height: 100vh; margin: auto;"
   class="rounded-4" src="${imgBig}" />

</div>
`
imgDiv.innerHTML=imgBlock;
const rate = Math.floor(product.rating);
function generateRatingSpan(rating) {
  let ratingSpan = "";
  for (let i = 0; i < rating; i++) {
    ratingSpan += `<i class="fa-solid fa-star"></i>`;
    
  }
  if (rating < 5) {
    for (let i = 0; i < 5 - rating; i++) {
      ratingSpan += `<i class="fa-regular fa-star"></i>`;

    }
  }
  return ratingSpan;
}
// console.log(generateRatingSpan(4.8));
const productDiv = document.getElementById('product-details');
let productBlock="";
if(product.discount>0){
 productBlock =` <h1 id="productName" class="title text-dark header">${product.productName}</h1>
<div class="d-flex flex-row my-3">
  <div class="text-warning mb-1 me-2">
   ${generateRatingSpan(rate)}
    <span class="ms-1 rate">
    ${rate}
    </span>
  </div>
</div>
<div class="mb-3">
  <span class=" price">$</span>
  <span id="newPrice" class=" price">${priceAfterDiscount}</span>
  <span class=" oldPrice">$${product.price}</span>
  <span class=" discount" >
 
  <span id="discountVal" >-${product.discount}%</span>
  
</span>
</div>
<p id="descriptionContent" class="description">
${product.details}
</p>
<hr/>`;
}else{
  productBlock =` <h1 id="productName" class="title text-dark header">${product.productName}</h1>
<div class="d-flex flex-row my-3">
  <div class="text-warning mb-1 me-2">
   ${generateRatingSpan(rate)}
    <span class="ms-1 rate">
    ${rate}/5
    </span>
  </div>
</div>
<div class="mb-3">
  <span class=" price">$</span>
  <span id="newPrice" class=" price">${product.price}</span>
  
  
</div>
<p id="descriptionContent" class="description">
${product.details}
</p>
<hr/>`
}
productDiv.innerHTML=productBlock;
//###########################################################
let activeuser = JSON.parse(localStorage.getItem("activeuser"));
     // console.log( activeuser.id);
        document.addEventListener('DOMContentLoaded', function () {
           // Get elements
           const minusBtn=document.getElementById('decrease');
           const plusBtn=document.getElementById('increase');
           const addToCartButton = document.getElementById('addToCartBtn');
           const sizeButtons = document.querySelectorAll('.option');
           // Get selected options
               // Default to Medium if no size selected
             const selectedSize = localStorage.getItem('selectedSize') || 'Medium'; 
             updateSelectedSizeUI(selectedSize);
           
          sizeButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                // Get the clicked size from the button's text content
                const selectedSize = button.textContent;

                // Store the selected size in local storage
                localStorage.setItem('selectedSize', selectedSize);

                 updateSelectedSizeUI(selectedSize);
                console.log(selectedSize);
            });
        });
        // Function to update the UI based on the selected size 
    function updateSelectedSizeUI(selectedSize) {
      // Remove any existing 'selected' class from all size buttons
      sizeButtons.forEach(function (button) {
          button.classList.remove('selected');
      });

      // Add the 'selected' class to the clicked size button
      const selectedButton = document.getElementById(selectedSize);
      if (selectedButton) {
          selectedButton.classList.add('selected');
      }
  }

 // Update the quantity display on the HTML page
function updateQuantityDisplay() {
  document.getElementById('quantityDisplay').textContent = currentQuantity;
}
      minusBtn.addEventListener('click',function()
      {
        if (currentQuantity >1) {
        quantityElement.innerText=currentQuantity--;
        }else
        {
          Swal.fire({
            title: 'Cannot decrease beyond one!',
            text: '',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
          
          return 0; 
        }
        updateQuantityDisplay();
      });
      plusBtn.addEventListener('click',function()
      {
       quantityElement.innerHTML =  currentQuantity++;
        updateQuantityDisplay();
      });
          // Add event listener to the "Add to Cart" button
          addToCartButton.addEventListener('click', function () {
            
         
            if(activeuser != null){
              // Create an object to represent the product
              const choosenProduct = {
                 id:productId,
                 userID : activeuser.id,
                 product: product,
                  name: product.productName,
                  size: selectedSize,
                  price: priceAfterDiscount,
                  quantity: currentQuantity
              };
      
              // Get existing cart items from local storage
              let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
              cartItems.push(choosenProduct)
             // Save the updated cart items to local storage
              localStorage.setItem('cart', JSON.stringify(cartItems));
      
              // Alert the user that the product has been added to the cart (you can replace this with a better UI)
              Swal.fire("product added to cart!");

            } 

            else
            {
              
              Swal.fire({
                title: 'Error!',
                text: 'please sign in first!',
                icon: 'error',
                confirmButtonText: 'Ok'
              })
              return 0;
            }
          });
          
      });
      