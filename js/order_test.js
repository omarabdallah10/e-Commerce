import Orders from './database/Orders.js';
import { Order } from './schemas/order.js';

// Initializing the Orders module
const orders = new Orders();

// ###### GETTING DATA ##########
// Getting the orders array
const ordersArray = orders.getOrders();
console.log(ordersArray);

// Get order by ID
const order1 = orders.getOrderById('u1', 1);
console.log(order1);

// Get order by user ID and order ID
const order2 = orders.getOrderByUserAndOrderId('u2', 2);
console.log(order2);

// -----------------------------------------------------------------------

// ###### UPDATING DATA ##########
// Update order status
const orderToUpdate = orders.getOrderById('u1', 1);
orderToUpdate.status = 5; // Update status to a new value
orders.updateOrder('u1', 1, orderToUpdate);

// -----------------------------------------------------------------------

// ###### ADDING DATA ##########
// Adding new order
const newOrder = new Order(
    'u2', // user ID
    3, // order ID
    'Yellow Summer Dress', // orderName
    49.99, // price
    1, // status
    '', // avatar
    'Size = M, Color = Yellow', // details
    'FullName = Jane Doe, Address = 5678 Main St, City = Los Angeles, State = CA, Zip = 90001, Phone = 213-555-5678', // deliveryDetails
    's2', // sellerId
    '2022-01-15' // orderDate
);

orders.addOrder('u2', newOrder);
