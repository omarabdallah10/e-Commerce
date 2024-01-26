let arrayOfProduct = [
    {productId : 1 , productName : "samsung" , productPrice : 3000 , productQuantity : 9},
    {productId : 2 , productName : "toshiba" , productPrice : 12000 , productQuantity : 30},
    {productId : 3 , productName : "playstation4" , productPrice : 8000 , productQuantity : 10},
    {productId : 4 , productName : "labtop" , productPrice : 24000 , productQuantity : 22},
    {productId : 4 , productName : "PC gaming" , productPrice : 17000 , productQuantity : 4},
];

localStorage.setItem("ArrayOfProducts" , JSON.stringify(arrayOfProduct));
let ArrayOfProducts = JSON.parse(localStorage.getItem("ArrayOfProducts"));
console.log(ArrayOfProducts);



if(localStorage.getItem("products")!= null){
    products = JSON.parse(localStorage.getItem("products"));
    console.log(products);
}



// for chart one highest price
let myChartOne = document.getElementById("myChartOne").getContext("2d");
let massPopChart = new Chart(myChartOne , {
    type : "bar",
    data : {
        labels : [ArrayOfProducts[0].productName , ArrayOfProducts[1].productName, ArrayOfProducts[2].productName , ArrayOfProducts[3].productName , ArrayOfProducts[4].productName ],
        datasets : [{
            label : "Higher Price",
            data : [ ArrayOfProducts[0].productPrice, ArrayOfProducts[1].productPrice , ArrayOfProducts[2].productPrice , ArrayOfProducts[3].productPrice , ArrayOfProducts[4].productPrice],
            backgroundColor : ["rgba(255,99,132,.6)" ,"rgba(54,162,235,.6)", "rgba(255,206,86,.6) ", "rgba(75,192,192,.6)" , "rgba(153,102,255,.6)" , "rgba(255,159,64,.6) ", "rgba(255,99,132,.6)"], 
            borderWidth : 1,
            hoverBorderWidth : 3,
            hoverBorderColor : "#000",
        }],
    },
    options : {
        title : {
            display : true,
            text : "largest city in world",
            fontSize : 25
        },
        legend : {
            position : "right",
        }
    }
});

//for chart two highest quantity

let myChartTwo = document.getElementById("myChartTwo").getContext("2d");
let myPopChart = new Chart(myChartTwo , {
    type : "pie",
    data : {
        labels : [ArrayOfProducts[0].productName , ArrayOfProducts[1].productName, ArrayOfProducts[2].productName , ArrayOfProducts[3].productName , ArrayOfProducts[4].productName ],
        datasets : [{
            label : "Quantity",
            data : [ ArrayOfProducts[0].productQuantity, ArrayOfProducts[1].productQuantity , ArrayOfProducts[2].productQuantity , ArrayOfProducts[3].productQuantity , ArrayOfProducts[4].productQuantity],
            backgroundColor : ["rgba(255,99,132,.6)" ,"rgba(54,162,235,.6)", "rgba(255,206,86,.6) ", "rgba(75,192,192,.6)" , "rgba(153,102,255,.6)" , "rgba(255,159,64,.6) ", "rgba(255,99,132,.6)"], 
            borderWidth : 1,
            hoverBorderWidth : 3,
            hoverBorderColor : "#000",
        }],
    },
    options : {
        title : {
            display : true,
            text : "largest city in world",
            fontSize : 25
        },
        legend : {
            position : "right",
        }
    }
});







let searchIcon = document.querySelector("#searching");
let searchBar = document.querySelector("input[type = text]")
let menuBar = document.querySelector("#bar");
let Menu = document.querySelector(".menu");
let closeIcon = document.querySelector("#close");
let ModalDiv = document.querySelector(".modal");


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



// to navigate active class from links
let links = document.querySelectorAll("ul li a");

for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function() {
        for (var j = 0; j < links.length; j++) {
            links[j].classList.remove("active");
        }
        this.classList.add("active");
    });
}

