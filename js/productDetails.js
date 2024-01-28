 let currentQuantity=1;
 
  innerTxtQuantity = document.getElementById('quantityDisplay').textContent;


 currentQuantity = parseInt(innerTxtQuantity, 10);


// Function to decrease quantity
function decreaseQuantity() {
  if (currentQuantity != 0) {
    return currentQuantity--;
  }else
  {
    console.log("Cannot decrease beyond zero.");
    return 0; 
  }
}

// Function to increase quantity
function increaseQuantity() {
  return currentQuantity++;
 
}

// Update the quantity display on the HTML page
function updateQuantityDisplay() {
  document.getElementById('quantityDisplay').textContent = currentQuantity;
}

// Function to handle decrease button click
function decrease() {
  currentQuantity.innerText = decreaseQuantity();
  updateQuantityDisplay();
}

// Function to handle increase button click
function increase() {
  currentQuantity.innerHTML = increaseQuantity();
  updateQuantityDisplay();
}
//###########################################################

       
        document.addEventListener('DOMContentLoaded', function () {
           // Get elements
           const addToCartButton = document.getElementById('addToCartBtn');
           const productNameElement = document.getElementById('productName');
           const productPriceElement =document.getElementById('newPrice');
           
           const sizeButtons = document.querySelectorAll('.option');

//###############################################################################
          //href="product-details.html?id=1" for the product in home page

           // Get the product ID from the URL parameters

        //    const urlParams = new URLSearchParams(window.location.search);
        //    const productId = urlParams.get('id');
        //    const productData = {
        //     productId: { name: productName, price:productPrice },
        //             1:{name: "skirt",price:250 }
        // };
          // Display the product details on the page

           // productNameElement.textContent = productData[productId].name;
          // productPriceElement.textContent=productData[productId].price;  
                    
//###############################################################################


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
      const selectedButton = document.getElementById(`${selectedSize.toLowerCase()}`);
      if (selectedButton) {
          selectedButton.classList.add('selected');
      }
  }
      
          // Add event listener to the "Add to Cart" button
          addToCartButton.addEventListener('click', function () {
              // Get selected options
              const name =productNameElement.textContent;
               // Default to Medium if no size selected
              const selectedSize = localStorage.getItem('selectedSize') || 'Medium'; 
              const price = parseFloat(productPriceElement.textContent);
             
      
              // Create an object to represent the product
              const product = {
                  name: name,
                  size: selectedSize,
                  price: price,
                  quantity: currentQuantity
              };
      
              // Get existing cart items from local storage
              //the line is checking if there are existing cart items in the local storage.
              // If there are, it parses the JSON and sets cartItems to the parsed array.
              // If there are no cart items or if there's an issue with the stored data, it sets cartItems to an empty array.
              // This way, you start with a clean slate or with the existing cart items from local storage.
              let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
      
              // Check if the product is already in the cart
             // const index = cartItems.findIndex(item => item.name === name && item.size === selectedSize);
              cartItems.push(product)
              // if (index !== -1) {
              //     // If the product is already in the cart, update the quantity
              //     cartItems[index].quantity += quantity;
              // } else {
              //     // If the product is not in the cart, add it
              //     cartItems.push(product);
              // }
      
              // Save the updated cart items to local storage
              localStorage.setItem('cart', JSON.stringify(cartItems));
      
              // Alert the user that the product has been added to the cart (you can replace this with a better UI)
              alert('Product added to cart!');
          });
      });

