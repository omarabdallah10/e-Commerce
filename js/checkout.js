let BackBTN = document.querySelector(".btn-two");
let payment = document.querySelector("select[name=payment]");
let state = document.querySelector("select[name=State]");
let paymentoptions = document.querySelectorAll("select[name=payment] option");
let img = document.querySelector(".img > img")
let purchaseBTN = document.querySelector(".btn-one");
let allInputs = document.querySelectorAll("input");
let errorDIV = document.querySelector(".error");
let arr =[];



//regex validation
let regexFirstName = /^[a-zA-Z]{3,}$/;
let regexLastName = /^[a-zA-Z]{3,}$/;
let numberRegex = /^01[0125]\d{8}$/; 
let creditRegex = /^\d{4}-\d{4}-\d{4}-\d{4}$/; //1234-1234-1234-1234
let fullNameRegex = /^[a-zA-Z]{3,}[a-zA-Z]{3,}$/;
let ccvRegex = /^\d{3}$/;
//let expRegex = //;


if (localStorage.getItem("purchase")!=null) {
    arr = JSON.parse(localStorage.getItem("purchase"));
}


BackBTN.addEventListener("click", function () {
    window.location.href = "Cart.html";
}); // end of back function



payment.addEventListener("change", function (e) {
    let selectedOption = e.target.value; 
    if (selectedOption === "visa") {
       img.src = "../images/visa.png";
    }
    else if (selectedOption === "master") {
        img.src = "../images/master.png";
    }
    else if (selectedOption === "express") {
        img.src = "../images/america.png";
    }
});


purchaseBTN.addEventListener("click" , function(e){
    if(!validation()){
        e.preventDefault();
    }

});

function validation(){
    for(let i = 0 ; i< allInputs.length ;i++) {
        if(allInputs[i].value == "" || allInputs[i].value == null){
            errorDIV.innerHTML = "You should fill all required inputs";
            allInputs[i].style.border = "2px solid red"; 
        }
        else {
            errorDIV.innerHTML = "";
            allInputs[i].style.border = "2px solid green"; 
        }
    }
    //first Name validation
    if(!regexFirstName.test(allInputs[0].value)){
        
        allInputs[0].style.border = "2px solid red"; 
        return false;
    }
    else {
        allInputs[0].style.border = "2px solid green"; 
    }

    // last name validation
    if(!regexLastName.test(allInputs[1].value)){
        
        allInputs[1].style.border = "2px solid red"; 
        return false;
    }
    else {
        allInputs[1].style.border = "2px solid green"; 
    }

    // mobile phone validation
    if (!numberRegex.test(allInputs[2].value)) {
        allInputs[2].style.border = "2px solid red";
        return false;
    } else {
        allInputs[2].style.border = "2px solid green";
    }

    //credit number regex
    if (!creditRegex.test(allInputs[5].value)) {
        allInputs[5].style.border = "2px solid red";
        return false;
    } else {
        allInputs[5].style.border = "2px solid green";
    }

    //credit card name
    if (!fullNameRegex.test(allInputs[6].value)) {
        allInputs[6].style.border = "2px solid red";
        return false;
    } else {
        allInputs[6].style.border = "2px solid green";
    }
    //
    if (!ccvRegex.test(allInputs[8].value)) {
        allInputs[8].style.border = "2px solid red";
        return false;
    } else {
        allInputs[8].style.border = "2px solid green";
    }

    let successPurchase = {
        UserFnameName : allInputs[0].value,
        UserLastName : allInputs[1].value,
        UserMobile : allInputs[2].value,
        UserCity : allInputs[3].value,
        UserAddress : allInputs[4].value,
        UserState : state.value,
        UserCardType : payment.value,
        UserCardNo : allInputs[5].value,
        UserCardName : allInputs[6].value,
        UserCardExp : allInputs[7].value,
        UserCardCCV : allInputs[8].value,
    };

    arr.push(successPurchase);
    localStorage.setItem("purchase",JSON.stringify(arr));
    return true;

}


function Success() {
    Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("checkOutForm").submit(); 
        }
    });
}









let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let inputValue = document.querySelectorAll(".quantity-input");
let price = document.querySelectorAll(".price");
let trashBTN = document.querySelectorAll(".trash");


for(let i = 0 ; i < plus.length ; i++) {
    plus[i].addEventListener("click",function(){
        inputValue[i].value++;
        price[i].innerHTML = Number(price[i].innerHTML)*inputValue[i].value   ;
    });//end plus function
}

for(let i = 0 ; i < trashBTN.length ; i++) {
  trashBTN[i].addEventListener("click",function(e){
    swalDelete(i);
  });
}



for(let i = 0 ; i < minus.length ; i++) {
    minus[i].addEventListener("click",function(e){
        let current = --inputValue[i].value;
        price[i].innerHTML = Number(price[i].innerHTML) / (++current)   ;
        if(inputValue[i].value == "0") {
          price[i].innerHTML = Number(price[i].innerHTML)   ;
            swalDelete(i);
        }
    });//end plus function
}


function swalDelete(index) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger"
        },
        buttonsStyling: false
      });
      swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
          trashBTN[index].parentNode.parentNode.parentNode.remove();
          minus[index].parentNode.parentNode.parentNode.parentNode.remove();
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error"
          });
          inputValue[index].value ="1";
        }
      });
}

