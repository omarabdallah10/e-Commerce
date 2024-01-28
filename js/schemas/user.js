const user5 = {
    "id":"",
    "full_name": "Ahmed Abdallah",
    "role": "Admin",
    "email": "Ahmed2@gmail.com",
    "status": 3,
    "avatar": ""
}

/**
 * Represents a user.
 * @class
 * @author AhmedL3swy
 */
class User {
    #email;
    #password;
    #fullName;
    #role;
    #status;
    #avatar;

    /**
     * Creates a new User instance.
     * @constructor
     * @param {string} email - The user's email address.
     * @param {string} password - The user's password.
     * @param {string} fullName - The user's full name.
     * @param {string} role - The user's role.
     * @param {number} status - The user's status.
     * @param {string} avatar - The user's avatar.
     */
    constructor(email, password, fullName, role, status, avatar) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.role = role;
        this.status = status;
        this.avatar = avatar;
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
     * Sets the user's full name.
     * @param {string} fullName - The user's full name.
     */
    set fullName(fullName) {
        this.#fullName = fullName;
    }

    /**
     * Sets the user's role.
     * @param {string} role - The user's role.
     */
    set role(role) {
        this.#role = role;
    }

    /**
     * Sets the user's status.
     * @param {number} status - The user's status.
     */
    set status(status) {
        this.#status = status;
    }

    /**
     * Sets the user's avatar.
     * @param {string} avatar - The user's avatar.
     */
    set avatar(avatar) {
        this.#avatar = avatar;
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
     * Gets the user's full name.
     * @returns {string} The user's full name.
     */
    get fullName() {
        return this.#fullName;
    }

    /**
     * Gets the user's role.
     * @returns {string} The user's role.
     */
    get role() {
        return this.#role;
    }

    /**
     * Gets the user's status.
     * @returns {number} The user's status.
     */
    get status() {
        return this.#status;
    }

    /**
     * Gets the user's avatar.
     * @returns {string} The user's avatar.
     */
    get avatar() {
        return this.#avatar;
    }

    /**
     * Converts the User object to JSON format.
     * @returns {Object} The User object in JSON format.
     */
    toJSON() {
        return {
            email: this.#email,
            password: this.#password,
            fullName: this.#fullName,
            role: this.#role,
            status: this.#status,
            avatar: this.#avatar,
        };
    }
}

export { User };
