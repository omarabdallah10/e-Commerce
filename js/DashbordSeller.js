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
