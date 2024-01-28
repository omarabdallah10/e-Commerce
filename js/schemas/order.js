/**
 * Represents an order.
 * @class
 */
class Order {
    orderId;
    orderName;
    price;
    status;
    avatar;
    details;
    deliveryDetails;
    sellerId;
    orderDate;

    /**
     * Creates a new Order instance.
     * @constructor
     * @param {number} orderId - The order ID.
     * @param {string} orderName - The name of the order.
     * @param {number} price - The price of the order.
     * @param {number} status - The status of the order.
     * @param {string} avatar - The avatar of the order.
     * @param {string} details - Additional details of the order.
     * @param {string} deliveryDetails - Delivery details of the order.
     * @param {string} sellerId - The ID of the seller.
     * @param {string} orderDate - The date of the order.
     */
    constructor(orderId, orderName, price, status, avatar, details, deliveryDetails, sellerId, orderDate) {
        this.orderId = orderId;
        this.orderName = orderName;
        this.price = price;
        this.status = status;
        this.avatar = avatar;
        this.details = details;
        this.deliveryDetails = deliveryDetails;
        this.sellerId = sellerId;
        this.orderDate = orderDate;
    }

    /**
     * Sets the order ID.
     * @param {number} orderId - The order ID.
     */
    set orderId(orderId) {
        this.orderId = orderId;
    }

    /**
     * Sets the order name.
     * @param {string} orderName - The name of the order.
     */
    set orderName(orderName) {
        this.orderName = orderName;
    }

    /**
     * Sets the price of the order.
     * @param {number} price - The price of the order.
     */
    set price(price) {
        this.price = price;
    }

    /**
     * Sets the status of the order.
     * @param {number} status - The status of the order.
     */
    set status(status) {
        this.status = status;
    }

    /**
     * Sets the avatar of the order.
     * @param {string} avatar - The avatar of the order.
     */
    set avatar(avatar) {
        this.avatar = avatar;
    }

    /**
     * Sets additional details of the order.
     * @param {string} details - Additional details of the order.
     */
    set details(details) {
        this.details = details;
    }

    /**
     * Sets delivery details of the order.
     * @param {string} deliveryDetails - Delivery details of the order.
     */
    set deliveryDetails(deliveryDetails) {
        this.deliveryDetails = deliveryDetails;
    }

    /**
     * Sets the ID of the seller.
     * @param {string} sellerId - The ID of the seller.
     */
    set sellerId(sellerId) {
        this.sellerId = sellerId;
    }

    /**
     * Sets the date of the order.
     * @param {string} orderDate - The date of the order.
     */
    set orderDate(orderDate) {
        this.orderDate = orderDate;
    }

    /**
     * Gets the order ID.
     * @returns {number} The order ID.
     */
    get orderId() {
        return this.orderId;
    }

    /**
     * Gets the name of the order.
     * @returns {string} The name of the order.
     */
    get orderName() {
        return this.orderName;
    }

    /**
     * Gets the price of the order.
     * @returns {number} The price of the order.
     */
    get price() {
        return this.price;
    }

    /**
     * Gets the status of the order.
     * @returns {number} The status of the order.
     */
    get status() {
        return this.status;
    }

    /**
     * Gets the avatar of the order.
     * @returns {string} The avatar of the order.
     */
    get avatar() {
        return this.avatar;
    }

    /**
     * Gets additional details of the order.
     * @returns {string} Additional details of the order.
     */
    get details() {
        return this.details;
    }

    /**
     * Gets delivery details of the order.
     * @returns {string} Delivery details of the order.
     */
    get deliveryDetails() {
        return this.deliveryDetails;
    }

    /**
     * Gets the ID of the seller.
     * @returns {string} The ID of the seller.
     */
    get sellerId() {
        return this.sellerId;
    }

    /**
     * Gets the date of the order.
     * @returns {string} The date of the order.
     */
    get orderDate() {
        return this.orderDate;
    }

    /**
     * Converts the Order object to JSON format.
     * @returns {Object} The Order object in JSON format.
     */
    toJSON() {
        return {
            orderId: this.orderId,
            orderName: this.orderName,
            price: this.price,
            status: this.status,
            avatar: this.avatar,
            details: this.details,
            deliveryDetails: this.deliveryDetails,
            sellerId: this.sellerId,
            orderDate: this.orderDate,
        };
    }
}

export { Order };
