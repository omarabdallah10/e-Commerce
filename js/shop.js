import Products from "./database/Products.js";

// Initializing the Products module
let products = new Products();

//parent container of all products
let productCards = document.getElementById("productCards");

//random 9 products
let startingRandomProducts = products.getRandomNineProducts();

//No products found Div
let noProductsFound = document.getElementById("noProductsFound");

//get the category from the url
let shopLink = document.getElementById("shopLink");
let onSaleLink = document.getElementById("onSaleLink");
let newArrivalsLink = document.getElementById("newArrivalsLink");

//
let whichDisplayed = document.getElementById("whichDisplayed");

//get the filter buttons
let sizeFilterDiv = document.getElementById("sizeMenu");
let categoryFilterDiv = document.getElementById("categoryMenu");
let priceFilterDiv = document.getElementById("priceMenu");
let leftSlider = document.getElementById("input-left"); // input of min price
let rightSlider = document.getElementById("input-right"); // input of max price
let minPrice = document.getElementById("minPriceText"); // text of min price
let maxPrice = document.getElementById("maxPriceText"); // text of max price

let applyFilterBtn = document.getElementById("applyFilterBtn");

/*-----------------------------------------Search------------------------------------------ */
//inputs from the page and display the value of the input in the console
let searchInput = document.getElementById("searchInput");
let SearchedProducts; //array of products with search query
searchInput.addEventListener("keyup", function () {
  productCards.innerHTML = "";
  SearchedProducts = products.getProductsBySearchQuery(searchInput.value);

  if (searchInput.value != "" && SearchedProducts.length == 0) {
    // noProductsFound.classList.remove("d-none");
    productCards.innerHTML = `<div
                  class="alert alert-warning d-flex align-items-center"
                  id="noProductsFound"
                >
                  <div>
                    <i class="fa-solid fa-exclamation-triangle mx-2"></i>
                    No product found!
                  </div>
                </div>`;
    console.log("no products found ..................");
  } else {
    for (let index = 0; index < SearchedProducts.length; index++) {
      //check if its already displayed
      if (productCards.innerHTML.includes(SearchedProducts[index].productId)) {
        continue;
      }
      var oneProductComponent = createProductComponent(SearchedProducts[index]);
      productCards.innerHTML += oneProductComponent;
    }
  }

  //check if the search input is empty --> display random products
  if (searchInput.value == "") {
    productCards.innerHTML = "";
    displayProducts(startingRandomProducts);
  }
}); //end of search input
/*------------------------------------------------------------------------------------------ */

// Getting the products object
//get one product with id
let product1 = products.getProductById("pid9");
console.log(product1);

//get array of products with category
let CategoriedProducts = products.getProductsByCategory("shirts");
console.log(CategoriedProducts);

//get array of products with size
let SizedProducts = products.getProductsBySize("S");
console.log(SizedProducts);

//get array of random products
// let startingRandomProducts = products.getRandomNineProducts();
// console.log('random products');
// console.log(startingRandomProducts);

//get array with discount
// let onSaleProducts = products.getOnSaleProducts();
// console.log('on sale products');
// console.log(onSaleProducts);

//get array of products with search by name
// let SearchedProducts = products.getProductsBySearchQuery();

//new arrivals
// let newArrivalsProductos = products.getNewArrivals();
// console.log('new arrivals');
// console.log(newArrivalsProductos);

window.addEventListener("load", function () {
  //display random 9 products
  displayProducts(startingRandomProducts);
  whichDisplayed.innerHTML = "Shop";
  //   for (let index = 0; index < startingRandomProducts.length; index++) {
  //     var oneProductComponent = createProductComponent(
  //       startingRandomProducts[index]
  //     );
  //     productCards.innerHTML += oneProductComponent;
  //   }

  /*---------------------------------Determine Selected Categories ------------------------------------------ */

  let selectedCategories = [];
  categoryFilterDiv.addEventListener("click", function (e) {
    if (!e.target.classList.contains("btn-dark")) {
      e.target.classList.add("btn-dark", "text-white");
    } else {
      e.target.classList.remove("btn-dark", "text-white");
      e.target.classList.add("btn", "text-secondary");
    }
    //return the value of the buttons which are clicked (has btn-dark class)
    selectedCategories = document.querySelectorAll("#categoryMenu .btn-dark");

    selectedCategories = Array.from(selectedCategories).map(
      (category) => category.innerText
    );
    // console.log(selectedCategories);
    return selectedCategories;
  });

  /*----------------------------------------------------------------------------------------------------------*/

  /*---------------------------------Determine max and min price ------------------------------------------ */

 let selectedMinPrice; 
 let selectedMaxPrice;
    //1-change the value of the text of the min and max price
    leftSlider.addEventListener("change", function () {
      minPrice.innerHTML = "$" + leftSlider.value;
      selectedMinPrice = leftSlider.value;
      console.log('selectedMinPrice', selectedMinPrice);
    });
    rightSlider.addEventListener("change", function () {
      maxPrice.innerHTML = "$" + rightSlider.value;
      selectedMaxPrice = rightSlider.value;
      console.log('selectedMaxPrice', selectedMaxPrice);
    });


    //2-return the value of the min and max price


  // let selectedPrice = [selectedMinPrice, selectedMaxPrice];

  /*--------------------------------------------------------------------------------------------------------- */

  /*---------------------------------Determine Selected Size------------------------------------------ */
  let selectedSizes = [];
  sizeFilterDiv.addEventListener("click", function (e) {
    if (!e.target.classList.contains("btn-dark")) {
      e.target.classList.add("btn-dark", "text-white");
    } else {
      e.target.classList.remove("btn-dark", "text-white");
      e.target.classList.add("btn", "text-secondary");
    }
    //return the value of the buttons which are clicked (has btn-dark class)
    selectedSizes = document.querySelectorAll("#sizeMenu .btn-dark");
    selectedSizes = Array.from(selectedSizes).map((size) => size.innerText);
    // console.log(selectedSizes);
    return selectedSizes;
  });

  /*----------------------------------------------------------------------------------------------------- */

  /*-------------------------------- Apply Filters ------------------------------------------ */

  applyFilterBtn.addEventListener("click", function () {
    let resultProductes = [];
    let selectedPrices = [];
    selectedPrices = products.getProductsByPriceRange(selectedMinPrice,selectedMaxPrice);
    if (selectedPrices.length != 0) {
      for (let i = 0; i < selectedPrices.length; i++) {
        resultProductes.push(selectedPrices[i]);
      }
      console.log("from price filter", selectedPrices);
    }
    //send the selected categories to the function in product js to filter the products with category
    if (selectedCategories.length != 0) {
      for (let i = 0; i < selectedCategories.length; i++) {
        resultProductes.push(
          products.getProductsByCategory(selectedCategories[i])
        );
      }
      // console.log('result of categories');
      // console.log(resultProductes);
    }

    //send selected sizes to the function in product js to filter the products with size
    if (selectedSizes.length != 0) {
      for (let i = 0; i < selectedSizes.length; i++) {
        resultProductes.push(products.getProductsBySize(selectedSizes[i]));
      }
      // console.log('result of sizes');
      // console.log(resultProductes);
    }

    //send selected price to the function in product js to filter the products with price
    // let selectedPrices = products.getProductsByPriceRange(selectedMinPrice, selectedMaxPrice);
    // // console.log("selectedPrices", selectedPrices);
    // for(let i = 0; i < selectedPrices.length; i++){
    //   resultProductes.push(selectedPrices[i]);
    // }
    

    //display the products with the selected filters
    productCards.innerHTML = "";
    if (resultProductes.length != 0) {
      for (let i = 0; i < resultProductes.length; i++) {
        for (let j = 0; j < resultProductes[i].length; j++) {
          //check if its already displayed
          if (
            productCards.innerHTML.includes(resultProductes[i][j].productId)
          ) {
            continue;
          }
          var oneProductComponent = createProductComponent(
            resultProductes[i][j]
          );
          productCards.innerHTML += oneProductComponent;
        }
      }
    } else {
      displayProducts(startingRandomProducts);
    }
  });

  /*---------------------------------------------------------------------------------------------------- */

  /*---------------------------------Filter Products -- Shop ------------------------------------------ */
  //when shop link is clicked --> send the return array from random products to display products function
  shopLink.addEventListener("click", function () {
    whichDisplayed.innerHTML = "Shop";
    shopLink.classList.add("fw-bold");
    //let startingRandomProducts = products.getRandomNineProducts(); //------ if you want the products to be random every time you click on shop
    //make sure the search input is empty
    searchInput.value = "";
    productCards.innerHTML = "";
    displayProducts(startingRandomProducts);
  });
  /*----------------------------------------------------------------------------------------------------- */

  /*---------------------------------Filter Products -- On Sale ------------------------------------------ */
  //when onSale link is clicked --> send the return array from random products to display products function
  onSaleLink.addEventListener("click", function () {
    whichDisplayed.innerHTML = "On Sale";
    onSaleLink.classList.add("fw-bold");
    let onSaleProducts = products.getOnSaleProducts();
    //make sure the search input is empty
    searchInput.value = "";
    productCards.innerHTML = "";
    displayProducts(onSaleProducts);
  });
  /*----------------------------------------------------------------------------------------------------- */

  /*---------------------------------Filter Products -- New Arrivals ------------------------------------------ */
  //when newArrivals link is clicked --> send the return array from random products to display products function
  newArrivalsLink.addEventListener("click", function () {
    whichDisplayed.innerHTML = "New Arrivals";
    newArrivalsLink.classList.add("fw-bold");
    let newArrivalsProducts = products.getNewArrivals();
    //make sure the search input is empty
    searchInput.value = "";
    productCards.innerHTML = "";
    displayProducts(newArrivalsProducts);
  });
  /*----------------------------------------------------------------------------------------------------- */

  //   shopLink.addEventListener("click", function () {
  //     console.log("shop link clicked")
  //     productCards.innerHTML = "";
  //     for (let index = 0; index < startingRandomProducts.length; index++) {
  //         var oneProductComponent = createProductComponent(
  //             startingRandomProducts[index]
  //         );
  //         productCards.innerHTML += oneProductComponent;
  //     }});

  //display products with category

  /* ------------------------------------------------------------------------------------------- */
  //slider in progressBar.js
  /*--------------------------------------------------------------------------------------------------- */

  // var length = 12;

  // var pagination = length/9;
  // for (let index = 0; index < pagination; index++) {
  //   var page = `<a class="text-decoration-none btn mx-1 py-1 px-3 bg-alternative">${index+1}</a>`;
  //   document.getElementById("pagination").innerHTML += page;
  // }

  //   for (let index = 0; index < CategoriedProducts.length; index++) {
  //     var oneProductComponent = createProductComponent(CategoriedProducts[index]);
  //     productCards.innerHTML += oneProductComponent;
  //   }

  //   for (let index = 0; index < SizedProducts.length; index++) {
  //     var oneProductComponent = createProductComponent(SizedProducts[index]);
  //     productCards.innerHTML += oneProductComponent;
  //   }
});

//create product component to be added to the parent container
function createProductComponent(product) {
  let productComponent = `<div class="col-6 col-md-4 py-1 px-2 mb-3">
                  <div class="shop-item h-100">
                    <div
                      class="product-container bg-transparent h-100 p-2 rounded-3"
                    >
                      <a
                        href="product.html?id=${product.productId}"
                        class="text-black text-decoration-none"
                      >
                        <img
                          loading="lazy"
                          loading="lazy"
                          src="${product.thumbnail}"
                          alt="product"
                          class="w-100 rounded-4"
                          style="height: 300px"
                        />
                        <h2 class="my-3">${product.productName}</h2>
                        <p>
                          <span class="text-warning">
                            ${generateRatingSpan(product.rating)}
                          </span>
                        </p>
                        <div class="d-flex px-1">
                          <div class="mx-1 fw-bold" data-item-type="price">
                            $${(
                              (product.price * (100 - product.discount)) /
                              100
                            ).toFixed(2)}
                          </div>
                          <div class="mx-1">
                            <strike style="color:red;">$${
                              product.price
                            }</strike>
                          </div>
                          <div class="mx-1">
                            <span
                              class="bg-danger-subtle rounded-pill px-2 py-1"
                              >${product.discount}%</span
                            >
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>`;
  return productComponent;
}

//generate rating --done
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

//function to display products from an array as a parameter
function displayProducts(productsArray) {
  for (let index = 0; index < productsArray.length; index++) {
    let oneProductComponent = createProductComponent(productsArray[index]);
    productCards.innerHTML += oneProductComponent;
  }
}

let itemsPerPage = 9;
let numberOfProducts;
function pagination(productsArray) {
  numberOfProducts = productsArray.length;
  let totalPages = Math.ceil(numberOfProducts / itemsPerPage);
  for (let i = 0; i < totalPages; i++) {
    var page = `<a class="text-decoration-none btn mx-1 py-1 px-3 bg-alternative" onclick="changePage(${
      index + 1
    })">${index + 1}</a>`;
    document.getElementById("pagination").innerHTML += page;
  }
}

/* 
//pagination
1-get the number of products (length)
2-divide the number of products by 9 (pagination)

*/
// ...

// var length = 12;

// var itemsPerPage = 9;

// var totalPages = Math.ceil(length / itemsPerPage);

// for (let index = 0; index < totalPages; index++) {
//   var page = `<a class="text-decoration-none btn mx-1 py-1 px-3 bg-alternative" onclick="changePage(${index + 1})">${index + 1}</a>`;
//   document.getElementById("pagination").innerHTML += page;
// }

// ...

// function changePage(pageNumber) {
//   productCards.innerHTML = ""; // Clear existing products

//   // Calculate start and end indices for the current page
//   var startIndex = (pageNumber - 1) * itemsPerPage;
//   var endIndex = Math.min(startIndex + itemsPerPage, length);

//   for (let index = startIndex; index < endIndex; index++) {
//     var oneProductComponent = createProductComponent(
//       Object.values(products.getProducts())[index]
//     );
//     productCards.innerHTML += oneProductComponent;
//   }
// }
// ...

// changePage(2);

// ...

// ...
