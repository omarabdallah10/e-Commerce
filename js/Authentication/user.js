/**
 * Represents a user.
 * @class
 * @author AhmedL3swy
 */
class User {
    #email;
    #password;
    #id;
    #role;
    /**
     * Creates a new User instance.
     * @constructor
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @param {number} id - The user's ID.
     * @param {string} role - The user's role.
     */
    constructor(email, password, id, role) {
      this.email = email;
      this.password = password;
      this.id = id;
      this.role = role;
    }
  
    /**
     * Sets the user's email address.
     * @param {string} email - The user's email address.
     * @throws {Error} Throws an error if the email address is invalid.
     */
    set email(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        throw new Error("Invalid email address");
      }
      this.#email = email;
    }
  
    /**
     * Sets the user's password.
     * @param {string} password - The user's password.
     * @throws {Error} Throws an error if the password is invalid.
     */
    set password(password) {
      const passwordRegex = /^.{8,}$/;
      if (!passwordRegex.test(password)) {
        throw new Error("Password must be at least 8 characters long");
      }
      this.#password = password;
    }
  
    /**
     * Sets the user's ID.
     * @param {number} id - The user's ID.
     * @throws {Error} Throws an error if the ID is invalid.
     */
    set id(id) {
      if (!Number.isInteger(id) || id < 1) {
        this.#id = 0;
      }
      this.#id = id;
    }
  
    /**
     * Sets the user's role.
     * @param {number} role - The user's role.
     * @throws {Error} Throws an error if the role is invalid.
     */
    set role(role) {
      const validroles = ["Customer", "Seller", "Admin"];
      if (!validroles.includes(role)) {
        throw new Error("Invalid role");
      }
      this.#role = role;
    }
  
    /**
     * Gets the user's email address.
     * @returns {string} The user's email address.
     */
    get email() {
      return this.#email;
    }
  
    /**
     * Gets the user's password.
     * @returns {string} The user's password.
     */
    get password() {
      return this.#password;
    }
  
    /**
     * Gets the user's ID.
     * @returns {number} The user's ID.
     */
    get id() {
      return this.#id;
    }
  
    /**
     * Gets the user's role.
     * @returns {string} The user's role.
     */
    get role() {
      return this.#role;
    }
  
    /**
     * Converts the User object to JSON format.
     * @returns {Object} The User object in JSON format.
     */
    toJSON() {
      return {
        email: this.#email,
        password: this.#password,
        id: this.#id,
        role: this.#role,
      };
    }
  }
  
  export { User };