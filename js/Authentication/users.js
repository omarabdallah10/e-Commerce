import { User } from "./user.js";

/**
 * Class representing a user manager.
 * @class
 * @author AhmedL3swy
 */
class UsersManagement {
  /**
   * Create a user manager.
   * @constructor
   */
  constructor() {
    this.users = [];
    this.retrieveUsers();
  }

  /**
   * Add a user to the array.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @param {number} id - The ID of the user.
   * @param {string} role - The account type of the user.
   * @param {string} full_name - The full name of the user.
   * @param {string} status - The status of the user.
   * @returns {User} The added user.
   * @throws {Error} If the user already exists.
   */
  generateId() {
    let id = 0;
    if (this.users.length > 0) {
      id = this.users[this.users.length - 1].id + 1;
    }
    return id;
  }
  addUser(email, password, id, role, full_name, status) {
    const existingUser = this.users.find((user) => user.email === email);
    if (existingUser) {
      throw new Error("User already exists");
    }
    
    const user = new User(email, password, id, role, full_name, status);
    this.users.push(user);
    this.storeUsers();
    return user;
  }

  /**
   * Store users in Local Storage.
   */
  storeUsers() {
    localStorage.setItem("users", JSON.stringify(this.users));
  }

  /**
   * Retrieve users from Local Storage.
   */
  retrieveUsers() {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    this.users = storedUsers.map(
      (user) => new User(user.email, user.password, user.id, user.role, user.full_name, user.status)
    );
  }

  /**
   * Log user data.
   */
  logUserData() {
    if (this.users.length > 0) {
      this.users.forEach((user, index) => {
        console.log(`User ${index + 1}:`);
        console.log(`Email: ${user.email}`);
        console.log(`Password: ${user.password}`);
        console.log(`ID: ${user.id}`);
        console.log(`Account Type: ${user.role}`);
        console.log(`Full Name: ${user.full_name}`);
        console.log(`Status: ${user.status}`);
        console.log("----------------------");
      });
    } else {
      console.log("No users found.");
    }
  }
  /**
   * Find a user by email.
   * @param {string} email - The email of the user.
   * @returns {User} The user with the given email.
   */
  findUserByEmail(email) {
    return this.users.find((user) => user.email.toLowerCase() === email.toLowerCase());
  }
  /**
   * Find a user by ID.
   * @param {number} id - The ID of the user.
   * @returns {User} The user with the given ID.
   */
  findUserById(id) {
    return this.users.find((user) => user.id === id);
  }
  /**
   * Authenticate user.
   * @param {string} email - The email of the user.
   * @param {string} password - The password of the user.
   * @returns {user} -The user Data with the given Credentials.
   */
  authenticateUser(email, password) {
    const user = this.findUserByEmail(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }
  /**
   * Delete users from Local Storage.
   */
  deleteUsers() {
    localStorage.removeItem("users");
  }
}

export { UsersManagement };
