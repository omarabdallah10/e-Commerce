class CartItem {
  constructor(pid, quantity) {
    this.pid = pid;
    this.quantity = quantity;
  }
}

class Cart {
  constructor() {
    this.cartItems = {};
  }

  getCartByUserId(userId) {
    return this.cartItems[userId] || [];
  }

  addToCart(userId, items) {
    if (!this.cartItems[userId]) {
      this.cartItems[userId] = [];
    }

    items.forEach(item => {
      this.cartItems[userId].push(new CartItem(item.pid, item.quantity));
    });
  }

  removeFromCart(userId, pid) {
    if (this.cartItems[userId]) {
      this.cartItems[userId] = this.cartItems[userId].filter(item => item.pid !== pid);
    }
  }

  updateQuantity(userId, pid, newQuantity) {
    if (this.cartItems[userId]) {
      const itemIndex = this.cartItems[userId].findIndex(item => item.pid === pid);

      if (itemIndex !== -1) {
        this.cartItems[userId][itemIndex].quantity = newQuantity;
      }
    }
  }

  clearCart(userId) {
    if (this.cartItems[userId]) {
      this.cartItems[userId] = [];
    }
  }
}

// Example usage:
const shoppingCart = new Cart();

// Adding items to the cart
shoppingCart.addToCart("u1", [{"pid": 1, "quantity": 2}, {"pid": 2, "quantity": 1}]);
shoppingCart.addToCart("u2", [{"pid": 3, "quantity": 3}]);

// Getting the cart for a specific user
const user1Cart = shoppingCart.getCartByUserId("u1");
console.log(user1Cart); // Output: [ { pid: 1, quantity: 2 }, { pid: 2, quantity: 1 } ]
