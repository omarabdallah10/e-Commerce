const jsonFileURL ='assets/json/product-list.json';

// Check if the key 'users' already exists in local storage
// if (!localStorage.getItem('users')) {
  // Fetch the JSON file
  fetch(jsonFileURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(jsonData => {
      // Convert the JSON object to a string
      const jsonString = JSON.stringify(jsonData);

      // Store the JSON string in local storage under the key 'users'
      localStorage.setItem('products', jsonString);

      console.log('JSON data has been loaded and stored in local storage.');
    })
    .catch(error => {
      console.error('There was a problem fetching the JSON file:', error.message);
    });
    
// } else {
//   console.log('The key "users" already exists in local storage.');
// }
