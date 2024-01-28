/**
 * Represents a product.
 * @class
 */
class Product {
    constructor(productId, productName, price, details, rating, size, discount, stock, category, thumbnail, images, sellerId, dateAdded) {
        this.productId = productId;
        this.productName = productName;
        this.price = price;
        this.details = details;
        this.rating = rating;
        this.size = size;
        this.discount = discount;
        this.stock = stock;
        this.category = category;
        this.thumbnail = thumbnail;
        this.images = images.split(',');
        this.sellerId = sellerId;
        this.dateAdded = dateAdded;
    }

    /**
     * Converts the Product object to JSON format.
     * @returns {Object} The Product object in JSON format.
     */
    toJSON() {
        return {
            productId: this.productId,
            productName: this.productName,
            price: this.price,
            details: this.details,
            rating: this.rating,
            size: this.size,
            discount: this.discount,
            stock: this.stock,
            category: this.category,
            thumbnail: this.thumbnail,
            images: this.images.join(','),
            sellerId: this.sellerId,
            dateAdded: this.dateAdded,
        };
    }
}
export { Product };