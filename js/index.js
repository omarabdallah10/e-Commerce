import Products from "./database/Products.js";

var products = new Products();

const newArrivals = products.getNewArrivals().slice(0, 4);
// array of objects for the top selling section
const topSelling = products.getTopSoldProducts().slice(0, 4);

const createDynamicProductCard = (product) => {
    const card = `
        <div class="col-12 col-md-6 col-lg-2 d-flex flex-column align-items-center gap-1">
            <img src="${product.thumbnail}" width=300px height="300px"/>
            <h3>${product.productName}</h3>
            <div class="star-rating" data-rating="${product.rating}"></div>
            <div class="priceshape">${product.price}$</div>
        </div>  
    `;
    return card;
}
//Append them to #TewArrivals
const newArrivalsContainer = document.getElementById("NewArrivals");
newArrivals.forEach((product) => {
    const card = createDynamicProductCard(product);
    newArrivalsContainer.innerHTML += card;
});
//Append them to #TopSelling
const topSellingContainer = document.getElementById("TopSelling");
topSelling.forEach((product) => {
    const card = createDynamicProductCard(product);
    topSellingContainer.innerHTML += card;
});
