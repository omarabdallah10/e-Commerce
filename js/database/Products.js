/**
 * Represents a class that manages product data.
 * @class
 */
class Products {
    constructor() {
        this.products = {};
        // Assume the products are loaded from a JSON file
        const storedProducts = localStorage.getItem('Products');
        if (storedProducts) {
            this.products = JSON.parse(storedProducts);
            console.log('Products loaded from local storage.');
        } else {
            this.fetchProducts();
        }
    }

    /**
     * Fetches the products data from a JSON file.
     * @async
     */
    async fetchProducts() {
        try {
            const response = await fetch('js/database/json/products-list.json');
            if (response.ok) {
                console.log('Products fetched successfully from local json.');
                const data = await response.json();
                this.products = data;
                localStorage.setItem('Products', JSON.stringify(data));
            } else {
                throw new Error('Failed to fetch products.');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }
    //#Getters
    /**
     * Returns the products object.
     * @returns {Object} The products object.
     */
    getProducts() {
        return this.products;
    }
    /**
     * Returns the product object with the specified product ID.
     * @param {string} productId - The product ID.
     * @returns {Object|null} The product object.
    */
   getProductById(productId) {
       return this.products[productId] || null;
    }

    /**
     * Returns an array of product objects that belong to the specified category.
     * @param {string} category - The category to filter products.
     * @returns {Array} An array of product objects.
     */
    getProductsByCategory(category) {
        const filteredProducts = Object.values(this.products).filter(product => product.category.toLowerCase() === category.toLowerCase());
        return filteredProducts;
    }
    /**
     * Returns an array of product objects that are available in the specified size.
     * @param {string} size - The size to filter products.
     * @returns {Array} An array of product objects.
     */
    getProductsBySize(size) {
        const filteredProducts = Object.values(this.products).filter(product => product.size.toLowerCase().includes(size.toLowerCase()));
        return filteredProducts;
    }
    /**
     * Returns an array of product objects that fall within the specified price range.
     * @param {number} minPrice - The minimum price.
     * @param {number} maxPrice - The maximum price.
     * @returns {Array} An array of product objects.
     */
    getProductsByPriceRange(minPrice, maxPrice) {
        const filteredProducts = Object.values(this.products).filter(product => {
            const productPrice = product.price;
            return productPrice >= minPrice && productPrice <= maxPrice;
        });
        return filteredProducts;
    }
    /**
     * Returns an array of product objects that match the specified search query.
     * @param {string} query - The search query.
     * @returns {Array} An array of product objects.
     */
    getProductsBySearchQuery(query) {
        const filteredProducts = Object.values(this.products).filter(product => {
            const productName = product.productName.toLowerCase();
            return productName.includes(query.toLowerCase());
        });
        return filteredProducts;
    }
    /**
     * Returns an array of the top N recently added products.
     * @param {number} N - The number of products to retrieve.
     * @returns {Array} An array of product objects.
     */
    getTopRecentlyAddedProducts(N) {
        const sortedProducts = Object.values(this.products).sort((a, b) => {
            const dateA = new Date(a.dateAdded);
            const dateB = new Date(b.dateAdded);
            return dateB - dateA;
        });
        return sortedProducts.slice(0, N);
    }
    /**
     * Returns an array of the top N sold products.
     * @param {number} N - The number of products to retrieve.
     * @returns {Array} An array of product objects.
     */
    getTopSoldProducts(N) {
        const sortedProducts = Object.values(this.products).sort((a, b) => b.quantitySold - a.quantitySold);
        return sortedProducts.slice(0, N);
    }
    
    /**Filter Section
     * 
    /**
    * Checks if a product is available (Quantity > 0).
    * @param {Object} product - The product object.
    * @returns {boolean} True if available, false otherwise.
    */
    isAvailable(product) {
        return product.stock > 0;
    }
    //#Crud Operations
    /**
     * Updates the products object with the provided object.
     * @param {Object} productsObj - The new products object.
     */
    updateProducts(productsObj) {
        this.products = productsObj;
        localStorage.setItem('Products', JSON.stringify(productsObj));
        console.log('Products updated successfully.');
    }
    /**
     * Updates the product object at the specified product ID with the provided product object.
     * @param {string} productId - The product ID.
     * @param {Object} product - The updated product object.
     */
    updateProduct(productId, product) {
        this.products[productId] = product;
        this.updateProducts(this.products);
        console.log('Product updated successfully.');
    }

    /**
     * Adds a new product with a unique product ID.
     * @param {Object} product - The new product object.
     */
    addProduct(product) {
        // Get the maximum product ID and increase it by 1 to generate a new unique ID
        const maxProductId = Math.max(...Object.keys(this.products), 0);
        const newProductId = maxProductId + 1;

        // Assign the new ID to the product before adding it
        product.productId = `pid${newProductId}`;
        this.products[product.productId] = product;
        this.updateProducts(this.products);

        console.log('Product added successfully.');
    }
    /**
     * Updates the quantity of a product, decrements available stock, and increments quantity sold.
     * Throws an error if there is not enough stock.
     * @param {string} productId - The product ID.
     * @param {number} quantity - The quantity to update.
     * @throws {Error} If there is not enough stock.
     */
    decreaseProductQuantity(productId, quantity) {
        const product = this.getProductById(productId);

        if (!product) {
            throw new Error(`Product with ID ${productId} not found.`);
        }

        if (product.stock < quantity) {
            throw new Error(`Not enough stock for product ${productId}. Available stock: ${product.stock}`);
        }

        // Update quantity sold and available stock
        product.quantitySold += quantity;
        product.stock -= quantity;

        // Update the product in the products list
        this.updateProduct(productId, product);

        console.log(`Quantity updated for product ${productId}. New stock: ${product.stock}, Quantity sold: ${product.quantitySold}`);
    }
    
    increaseProductQuantity(productId, quantity) {
        const product = this.getProductById(productId);

        if (!product) {
            throw new Error(`Product with ID ${productId} not found.`);
        }

        // Update quantity sold and available stock
        product.stock += quantity;

        // Update the product in the products list
        this.updateProduct(productId, product);

        console.log(`Quantity updated for product ${productId}. New stock: ${product.stock}, Quantity sold: ${product.quantitySold}`);
    }

    /**
     * Deletes the product with the specified product ID.
     * @param {string} productId - The product ID.
     */
    deleteProduct(productId) {
        delete this.products[productId];
        this.updateProducts(this.products);
        console.log('Product deleted successfully.');
    }
}

export default Products;