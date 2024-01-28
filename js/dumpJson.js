function fetchAndStoreJson(url, key) {
  // Check if the key already exists in local storage
  if (!localStorage.getItem(key)) {
    // Fetch the JSON file
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonData => {
        // Convert the JSON object to a string
        const jsonString = JSON.stringify(jsonData);

        // Store the JSON string in local storage under the specified key
        localStorage.setItem(key, jsonString);

        console.log('JSON data has been loaded and stored in local storage.');
      })
      .catch(error => {
        console.error('There was a problem fetching the JSON file:', error.message);
      });
  } else {
    console.log(`The key "${key}" already exists in local storage.`);
  }
}

// const usersjsonFileURL = 'json/user-list.json';
// const usersKey = 'users';
// fetchAndStoreJson(usersjsonFileURL, usersKey);
var productsjsonFileURL = '/js/json/products-list.json';
var productsKey = 'products';
fetchAndStoreJson(productsjsonFileURL, productsKey);
var ordersjsonFileURL = '/js/json/orders-list.json';
var ordersKey = 'orders';
fetchAndStoreJson(ordersjsonFileURL, ordersKey);