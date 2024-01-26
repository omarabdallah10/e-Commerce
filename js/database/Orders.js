/**
 * Represents a class that manages order data.
 * @class
 */
class Orders {
    /**
     * Constructs a new instance of the Orders class.
     * @constructor
     */
    constructor() {
        this.orders = [];
        const storedorders = localStorage.getItem('orders');
        if (storedorders) {
            this.orders = JSON.parse(storedorders);
            console.log('orders loaded from local storage.')
        } else {
            this.fetchorders();
        }
    }

    /**
     * Fetches the orders data from the provided JSON.
     * @async
     */
    async fetchOrders() {
        try {
            // Replace 'js/database/json/orders-list.json' with the actual path or URL to your JSON file
            const response = await fetch('js/database/json/orders-list.json');
            if (response.ok) {
                console.log('Orders fetched successfully from local JSON.');
                const data = await response.json();
                    this.orders = data;
                localStorage.setItem('orders', JSON.stringify(data));
            } else {
                throw new Error('Failed to fetch orders.');
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }
    
    /**
     * Returns the orders object.
     * @returns {Object} The orders object.
     */
    getOrders() {
        return this.orders;
    }
    /**
     * Returns the orders object for a specific user.
     * @param {string} userId - The user ID.
     * @returns {Object|null} The orders object for the specified user, or null if the user is not found.
     */
    getOrdersByUserId(userId) {
        return this.orders[userId] || null;
    }
    /**
     * Returns the order object with the specified user ID and order ID.
     * @param {string} userId - The user ID.
     * @param {number} orderId - The order ID.
     * @returns {Object|null} The order object if found, or null if not found.
     */
    getOrderById(userId, orderId) {
        return this.orders[userId] && this.orders[userId][orderId] ? this.orders[userId][orderId] : null;
    }
        /**
     * Returns the order object with the specified user ID and order ID.
     * @param {string} userId - The user ID.
     * @param {number} orderId - The order ID.
     * @returns {Object|null} The order object if found, or null if not found.
     */
    getOrderByUserAndOrderId(userId, orderId) {
        const userOrders = this.orders[userId];
        if (userOrders) {
            return userOrders[orderId] || null;
        }
        return null;
    }

    /**
     * Returns the order object that matches the specified attribute and value.
     * @param {string} userId - The user ID.
     * @param {string} attribute - The attribute to search for.
     * @param {string|number} value - The value to match.
     * @returns {Object|null} The order object if found, or null if not found.
     */
    getOrderByAttribute(userId, attribute, value) {
        const userOrders = this.orders[userId];
        if (userOrders) {
            const orderArray = Object.values(userOrders);
            return orderArray.find(order => {
                const orderValue = order[attribute];
                if (typeof orderValue === 'string') {
                    return orderValue.toLowerCase() === value.toLowerCase();
                } else if (typeof orderValue === 'number') {
                    return orderValue === parseInt(value);
                }
                return false;
            }) || null;
        } else {
            return null;
        }
    }
    updateOrders(orders_array) {
        this.orders = orders_array;
        localStorage.setItem('orders', JSON.stringify(orders_array));
        console.log('orders updated successfully.')
    }
    /**
     * Updates the order object at the specified user ID and order ID with the provided order object.
     * @param {string} userId - The user ID.
     * @param {number} orderId - The order ID.
     * @param {Object} order - The updated order object.
     */
    updateOrder(userId, orderId, order) {
        this.orders[userId][orderId] = order;
        this.updateOrders(this.orders);
        console.log('Order updated successfully.');
    }

    /**
     * Adds a new order for the specified user ID.
     * @param {string} userId - The user ID.
     * @param {Object} order - The new order object.
     */
    addOrder(userId, order) {
        if (!this.orders[userId]) {
            this.orders[userId] = {};
        }
        const orderIds = Object.keys(this.orders[userId]);
        const newOrderId = orderIds.length > 0 ? Math.max(...orderIds) + 1 : 1;
        order.orderId = newOrderId;
        this.orders[userId][newOrderId] = order;
        this.updateOrders(this.orders);
        console.log('Order added successfully.');
    }
}

export default Orders;
