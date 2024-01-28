import { Product } from './schemas/product.js';
import  Products  from './database/Products.js';

// Initializing the Products module
const products = new Products();

// ###### GETTING DATA ##########
// Getting the products object
const productsObj = products.getProducts();
console.log(productsObj);
//Get Product by Category
const productByCategory = products.getProductsByCategory('Shorts').filter(products.isAvailable);
console.log(productByCategory);

//Get Product by Size(M)
const productBySize = products.getProductsBySize('M');
console.log(productBySize);
// get Products by Price 20->30
const productByPrice = products.getProductsByPriceRange(20,30);
console.log(productByPrice);
//Get Product by SeachQuery
const productBySearch = products.getProductsBySearchQuery('Comfortable');
console.log(productBySearch);

const currentDate = new Date();
//const formattedDate = `${currentDate.getFullYear()}-${currentDate.getMonth() + 1}-${currentDate.getDate()}-${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
console.log(currentDate.toLocaleString());
//Test for getTopRecentlyAddedProducts(4)
const topRecentlyAddedProducts = products.getTopRecentlyAddedProducts(4);
console.log(topRecentlyAddedProducts);
//test for getTopSoldProducts
const topSoldProducts = products.getTopSoldProducts(4);
console.log(topSoldProducts);

//test fo updateProductQuantity(productId, quantity)
products.increaseProductQuantity('pid3', 10);
console.log(products.getProductById('pid3'));
//test for decreaseProductQuantity(productId, quantity)
products.decreaseProductQuantity('pid3', 5);
console.log(products.getProductById('pid3'));


















// // Get product by ID
// const product1 = products.getProductById('pid2');
// console.log(product1);

// // -----------------------------------------------------------------------

// // ###### UPDATING DATA ##########
// // Update product details
// const productToUpdate = products.getProductById('pid3');
// productToUpdate.price = 35.99; // Update price to a new value
// products.updateProduct('pid3', productToUpdate);

// // -----------------------------------------------------------------------

// // ###### ADDING DATA ##########
// // Adding new product
// const newProduct = new Product(
//     'pid6', // productId
//     'Casual Sneakers', // productName
//     59.99, // price
//     'Comfortable and stylish casual sneakers for everyday wear.', // details
//     4.8, // rating
//     'M,L,XL', // size
//     15.0, // discount
//     30, // stock
//     'Shoes', // category
//     'img/6/1.png', // thumbnail
//     'img/6/1.png,img/6/2.png,img/6/3.png,img/6/4.png', // images
//     's3', // sellerId
//     '2022-09-05' // dateAdded
// );

// products.addProduct(newProduct);