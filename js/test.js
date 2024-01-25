import Users from './database/Users.js';
import { User} from './schemas/user.js';
//intailizing the module
const users= new Users();
// ###### GETTING DATA ##########
//getting the users array
const users_array = users.getUsers();
console.log(users_array);
//get user by ID
const user = users.getUserById(1);
console.log(user);
//or 
const user1 = users.getUserByAttribute('id', 1);
console.log(user1);
//or 
console.log(users_array["1"]);
console.log(users_array[1]);

//get user by email
const user2 = users.getUserByAttribute('email', 'ahmed@gmail.com');
console.log(user2);
//get user by full name
const user3 = users.getUserByAttribute('full_name', 'ahmed Abdallah');
console.log(user3);
// -----------------------------------------------------------------------

// ###### UPDATING DATA ##########
//update Attributes
const user4 = users.getUserById(1);
user4.email = 'ahmed@gmail.com'
users.updateUser(1, user4);
// -----------------------------------------------------------------------

// ###### ADDING DATA ##########
//adding new user
const user5= new User("Ahmed@gmail.com","Passowrd1","Ahmed Abdallah", "Admin",1,"");
users.addUser(user5)
