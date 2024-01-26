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

    /**
     * Returns the products object.
     * @returns {Object} The products object.
     */
    getProducts() {
        return this.products;
    }

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
     * Returns the product object with the specified product ID.
     * @param {string} productId - The product ID.
     * @returns {Object|null} The product object.
     */
    getProductById(productId) {
        return this.products[productId] || null;
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
     * Adds a new product.
     * @param {Object} product - The new product object.
     */
    addProduct(product) {
        this.products[product.productId] = product;
        this.updateProducts(this.products);
        console.log('Product added successfully.');
    }
}

export default Products;