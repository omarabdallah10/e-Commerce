/**
 * Fetches a JSON file from the specified URL and stores it in local storage under the specified key.
 * If the key already exists in local storage, it logs a message indicating that the key already exists.
 *
 * @param {string} url - The URL of the JSON file to fetch.
 * @param {string} key - The key to store the JSON string in local storage.
 * @returns {void}
 * @author AhmedL3swy
 */
export function fetchAndStoreJson(url, key) {
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
