    /**
     * Represents a class that manages user data.
     * @class
     * @classdesc The Users class provides methods to fetch, update, and retrieve user data.
     * @author AhmedL3swy
     */
    class Users {
        /**
         * Constructs a new instance of the Users class.
         * @constructor
         */
        constructor() {
            this.users = [];
            const storedUsers = localStorage.getItem('Users');
            if (storedUsers) {
                this.users = JSON.parse(storedUsers);
                console.log('Users loaded from local storage.')
            } else {
                this.fetchUsers();
            }
        }

        /**
         * Fetches the users data from a JSON file.
         * @async
         */
        async fetchUsers() {
            try {
                const response = await fetch('js/database/json/users-list.json');
                if (response.ok) {
                    console.log('Users fetched successfully from local json.');
                    const data = await response.json();
                    this.users = data;
                    localStorage.setItem('Users', JSON.stringify(data));
                } else {
                    throw new Error('Failed to fetch users.');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        /**
         * Returns the users array.
         * @returns {Array} The users array.
         */
        getUsers() {
            return this.users;
        }

        /**
         * Updates the users array with the provided array.
         * @param {Array} users_array - The new users array.
         */
        updateUsers(users_array) {
            this.users = users_array;
            localStorage.setItem('Users', JSON.stringify(users_array));
            console.log('Users updated successfully.')
        }

        /**
         * Returns the user object with the specified id.
         * @param {number} id - The id of the user.
         * @returns {Object} The user object.
         */
        getUserById(id) {
            return this.users.find(user => user.id === id);
        }

        getUserById(id) {
            return this.users[id];
        };

        /**
         * Returns the user object that matches the specified attribute and value.
         * @param {string} attribute - The attribute to search for.
         * @param {string|number} value - The value to match.
         * @returns {Object|null} The user object if found, or null if not found.
         */
        getUserByAttribute(attribute, value) {
            const userArray = Object.values(this.users);
            return userArray.find(user => {
                const userValue = user[attribute];
                if (typeof userValue === 'string') {
                    return userValue.toLowerCase() === value.toLowerCase();
                } else if (typeof userValue === 'number') {
                    return userValue === parseInt(value);
                }
                return false;
            }) || null;
        };

        /**
         * Updates the user object at the specified id with the provided user object.
         * @param {number} id - The id of the user to update.
         * @param {Object} user - The updated user object.
         */
        updateUser(id, user) {
            this.users[id] = user;
            this.updateUsers(this.users);
            console.log('User updated successfully.')
        }



        addUser(user) {
            const maxId = Math.max(...Object.keys(this.users));
            const newId = maxId + 1;
            user.id = newId;
            this.users[newId] = user;
            this.updateUsers(this.users);
            console.log('User added successfully.');
        }
    }

    export default Users;