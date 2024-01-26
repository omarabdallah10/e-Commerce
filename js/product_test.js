import { Product } from './schemas/product.js';
import  Products  from './database/Products.js';

// Initializing the Products module
const products = new Products();

// ###### GETTING DATA ##########
// Getting the products object
const productsObj = products.getProducts();
console.log(productsObj);

// Get product by ID
const product1 = products.getProductById('pid2');
console.log(product1);

// -----------------------------------------------------------------------

// ###### UPDATING DATA ##########
// Update product details
const productToUpdate = products.getProductById('pid3');
productToUpdate.price = 35.99; // Update price to a new value
products.updateProduct('pid3', productToUpdate);

// -----------------------------------------------------------------------

// ###### ADDING DATA ##########
// Adding new product
const newProduct = new Product(
    'pid6', // productId
    'Casual Sneakers', // productName
    59.99, // price
    'Comfortable and stylish casual sneakers for everyday wear.', // details
    4.8, // rating
    'M,L,XL', // size
    15.0, // discount
    30, // stock
    'Shoes', // category
    'img/6/1.png', // thumbnail
    'img/6/1.png,img/6/2.png,img/6/3.png,img/6/4.png', // images
    's3', // sellerId
    '2022-09-05' // dateAdded
);

products.addProduct(newProduct);