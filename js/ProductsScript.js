var ProductImg = document.querySelector("#productImg");
var ProductDesc = document.querySelector("#mail");
var ProductPrice = document.querySelector("#number");
var ProductQuantity = document.querySelector("#status");
var addBTN = document.querySelector(".add");
var clearBTN = document.querySelector(".clear");
var products = [];
var mainIndex = 0;

var previewImage = document.getElementById("previewImage");

ProductImg.addEventListener("change", function (event) {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewImage.src = e.target.result;
        };

        reader.readAsDataURL(fileInput.files[0]);
    }
});



if(localStorage.getItem("products")!= null){
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts();
}




//deleting function
clearBTN.addEventListener("click" , function(){
    var isConfirmed = confirm("are u sure to delete all these inputs ?!!");
    if(isConfirmed) {
        ProductImg.value = "";
        ProductDesc.value = "";
        ProductPrice.value = "";
        ProductQuantity.value = "";
        previewImage.src = "";
    }
});// end clear function



addBTN.addEventListener("click" , function(){

    var ProductImgValue = previewImage.src;
    var ProductDescValue = ProductDesc.value;
    var ProductPriceValue = ProductPrice.value;
    var ProductQuantityValue = ProductQuantity.value;

        
    var product = {
        PImg : ProductImgValue,
        Pdesc : ProductDescValue,
        PPrice : ProductPriceValue,
        Pquantity : ProductQuantityValue
    };
    if (addBTN.innerHTML === "Add") {
        products.push(product);
    }
    else {
        products.splice(mainIndex,1,product);
        addBTN.innerHTML = "Add";
    }
    localStorage.setItem("products" , JSON.stringify(products))
    
    displayProducts();
    clearInputs();


});//end add function




// Function to display inputs
function displayProducts() {
    var hamada = "";
    for (var i = 0; i < products.length; i++) {
        hamada += `
            <tr>
                <td><img src="${products[i].PImg}" alt="Product Image" style="max-width: 50px; max-height: 50px;"></td>
                <td>${products[i].Pdesc}</td>
                <td>${products[i].PPrice}</td>
                <td>${products[i].Pquantity}</td>
                <td>
                    <button class="update" onclick = "insertion(${i})">Update</button>
                    <button class="delete" onclick = "deletion(${i})">Delete</button>
                </td>
            </tr>
        `;
    }
    document.getElementById("tbody").innerHTML = hamada;
}

// Function to clear input fields
function clearInputs() {
    ProductImg.value = "";
    ProductDesc.value = "";
    ProductPrice.value = "";
    ProductQuantity.value = "";
}


//function to delete row
function deletion(index) {
    var isConfirmed = confirm("Are you sure you want to delete this product?");
    if (isConfirmed) {
        products.splice(index, 1);
        displayProducts();
        localStorage.setItem("products" , JSON.stringify(products))
    }
    //index.parentNode.parentNode.remove();
}



//function to update data
function insertion(index) {
    mainIndex = index;
    ProductImg.value = products[index].PImg ;
    ProductDesc.value = products[index].Pdesc ;
    ProductPrice.value = products[index].PPrice ;
    ProductQuantity.value = products[index].Pquantity ;
    previewImage.src = products[index].PImg;
    addBTN.innerHTML = "update";


}

let searchIcon = document.querySelector("#searching");
let searchBar = document.querySelector("#searchinput")
let menuBar = document.querySelector("#bar");
let Menu = document.querySelector(".menu");
let closeIcon = document.querySelector("#close");
let ModalDiv = document.querySelector(".modal");
let tableBody = document.querySelector("tbody");

// event listner on search bar to appear when click on search icon
searchIcon.addEventListener("click",function (){
    searchBar.style.display = "block";
});// end of the function


// event listner on menubar to appear when click on it
menuBar.addEventListener("click" , function() {
    Menu.style.display = "block";
    ModalDiv.style.display = "block"
});// end of the function

// event listner on close icon to hide menu when click on it
closeIcon.addEventListener("click" , function() {
    Menu.style.display = "none";
    ModalDiv.style.display = "none"
});// end of the function

// Resize event listener to hide the modal if the screen width is increased beyond 750px
window.addEventListener("resize", function () {
    if (window.innerWidth >= 750) {
        ModalDiv.style.display = "none";
    }
});// end of the function



// function search that finds products
searchBar.addEventListener("keyup" , function() {
    let searchValue = searchBar.value.toLowerCase();
    for(let i = 0 ; i < tableBody.children.length ; i++){
        let rowText = tableBody.children[i].textContent.toLowerCase();
        
        if (rowText.includes(searchValue)) {
            tableBody.children[i].style.display = "";
        }
        else {
            tableBody.children[i].style.display = "none";
        }
    }
}); // end of the function






