import Products from "./database/Products.js";

// Initializing the Products module
let products = new Products();

//mobile menu
let mobileMenuBtn = document.getElementsByClassName("menuBtn")[0];
let mobileMenu = document.getElementsByClassName("mobileMenu")[0];

//parent container of all products
let productCards = document.getElementById("productCards");

//random 9 products
let startingRandomProducts = products.getRandomNineProducts();

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

window.addEventListener("load", function () {
  //toggle mobile menu in mobile view
  /*
  mobileMenuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("d-none");
  });
  */

  /*--------------------------------- Display Random Products ----------------------------------------- */
  displayProducts(startingRandomProducts);
  whichDisplayed.innerHTML = "Shop";
  /*--------------------------------------------------------------------------------------------------- */

  /*---------------------------------Determine Selected Categories ------------------------------------------ */
  let selectedCategories = [];
  categoryFilterDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
      if (!e.target.classList.contains("btn-dark")) {
        e.target.classList.add("btn-dark", "text-white");
      } else {
        e.target.classList.remove("btn-dark", "text-white");
        e.target.classList.add("btn", "text-secondary");
      }
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
  //2-save the value of the min and max price in variables
  priceFilterDiv.addEventListener("click", function (e) {
    leftSlider.addEventListener("change", function () {
      minPrice.innerHTML = "$" + leftSlider.value;
      selectedMinPrice = leftSlider.value;
    });
    rightSlider.addEventListener("change", function () {
      maxPrice.innerHTML = "$" + rightSlider.value;
      selectedMaxPrice = rightSlider.value;
    });
  });
  /*--------------------------------------------------------------------------------------------------------- */

  /*---------------------------------Determine Selected Size------------------------------------------ */
  let selectedSizes = [];
  sizeFilterDiv.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn")) {
      if (!e.target.classList.contains("btn-dark")) {
        e.target.classList.add("btn-dark", "text-white");
      } else {
        e.target.classList.remove("btn-dark", "text-white");
        e.target.classList.add("btn", "text-secondary");
      }
    }
    //return the value of the buttons which are clicked (has btn-dark class)
    selectedSizes = document.querySelectorAll("#sizeMenu .btn-dark");
    selectedSizes = Array.from(selectedSizes).map((size) => size.innerText);
    // console.log(selectedSizes);
    return selectedSizes;
  });

  /*----------------------------------------------------------------------------------------------------- */

  /*-------------------------------- Apply Filters ------------------------------------------ */

  let selectedPrices = [];

  applyFilterBtn.addEventListener("click", function () {
    let resultProductes = [];

    //send the selected prices to the function in product js to filter the products with price

    selectedPrices = products.getProductsByPriceRange(
      selectedMinPrice,
      selectedMaxPrice
    );
    // console.log("from shop js --> priced Products", selectedPrices);
    if (selectedPrices.length != 0) {
      // for (let i = 0; i < selectedPrices.length; i++) {
      //   resultProductes.push(selectedPrices[i]);
      // }
      resultProductes.push(selectedPrices);
      // console.log("from price filter", resultProductes);
      // console.log("from price filter", selectedPrices);
    }
    console.log(
      "from price filter after end calling size function",
      resultProductes
    );

    //send the selected categories to the function in product js to filter the products with category
    if (selectedCategories.length != 0) {
      for (let i = 0; i < selectedCategories.length; i++) {
        resultProductes.push(products.getProductsByCategory(selectedCategories[i]));
      }
      console.log(
        "from price filter inside filtering category functions",
        resultProductes
      );
    }
    console.log(
      "from price filter after end calling size , category functions",
      resultProductes
    );

    //send selected sizes to the function in product js to filter the products with size
    if (selectedSizes.length != 0) {
      for (let i = 0; i < selectedSizes.length; i++) {
        resultProductes.push(products.getProductsBySize(selectedSizes[i]));
      }
    }
    console.log(
      "from price filter after end calling all functions",
      resultProductes
    );

    //display the products with the selected filters
    productCards.innerHTML = "";
    if (resultProductes.length != 0) {
      for (let i = 0; i < resultProductes.length; i++) {
        for (let j = 0; j < resultProductes[i].length; j++) {
          //check if its already displayed
          if (productCards.innerHTML.includes(resultProductes[i][j].productId)) {
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
    // shopLink.classList.add("fw-bold");
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
    // onSaleLink.classList.add("fw-bold");
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
    // newArrivalsLink.classList.add("fw-bold");
    let newArrivalsProducts = products.getNewArrivals();
    //make sure the search input is empty
    searchInput.value = "";
    productCards.innerHTML = "";
    displayProducts(newArrivalsProducts);
  });
  /*----------------------------------------------------------------------------------------------------- */
}); //end of window load.

//create product component to be added to the parent container
function createProductComponent(product) {
  let productComponent;
  if (product.discount > 0) {
    productComponent = `<div class="col-6 col-md-4 py-1 px-2 mb-3">
                  <div class="shop-item h-100">
                    <div
                      class="product-container bg-transparent h-100 p-2 rounded-3"
                    >
                      <a
                        href="product.html?id=${product.productId}"
                        class="text-black text-decoration-none"
                      >
                        <img
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
  } else {
    productComponent = `<div class="col-6 col-md-4 py-1 px-2 mb-3">
                            <div class="shop-item h-100">
                              <div
                                class="product-container bg-transparent h-100 p-2 rounded-3"
                              >
                                <a
                                  href="product.html?id=${product.productId}"
                                  class="text-black text-decoration-none"
                                >
                                  <img
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
                                      $${product.price}
                                    </div>
                                  </div>
                                </a>
                              </div>
                            </div>
                          </div>`;
  }
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
