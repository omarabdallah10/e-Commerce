let sellers = [];

let nameRegex = /^[A-Z][a-zA-Z]{2,12}/; // Ahmed Mohamed
let emailRegex = /^\w{4,15}@(yahoo|gmail|outlook).(com|net)$/; // ahmed@gmail.com
let passRegex = /^[A-Z][a-zA-Z]{5,12}\d{1,}\D{1}[a-zA-Z]{3,12}$/; // Ahmedd99@ahd
let numberRegex = /^01[0125]\d{8}$/; // 01026340338
let numberZip = /^\d{5}$/;
let imagesAllow = /\.(jpg|jpeg|png)$/i; //.jpg / .png

let errorPhone = document.querySelector("#error-phone");
let errorZip = document.querySelector("#error-Zip");
let errorImg = document.querySelector("#error-img");
let errorPdf = document.querySelector("#error-pdf");

class Seller {
  constructor(firstName, lastName, password, email, phone, zip) {
    this.UserFirstName = firstName;
    this.UserLastName = lastName;
    this.UserPass = password;
    this.UserMail = email;
    this.UserPhone = phone;
    this.UserZip = zip;
  }
}

let specialDIV = document.querySelector(".special");
let BTN = document.querySelector(".btn");
BTN.addEventListener("click",function(){
  if(validateForm()) {
    specialDIV.innerText = "You have Signed Up Succssefully";
    clearVal();
  }
});


if (localStorage.getItem("sellers") != null) {
  sellers = sellers = JSON.parse(localStorage.getItem("sellers"));
}

document
  .getElementById("registrationForm")
  .addEventListener("submit", function (event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });

function validateForm() {
  var userNameFirst = document.getElementById("FirstName").value;
  var userNameLast = document.getElementById("LastName").value;
  var userPassword = document.getElementById("userPassword").value;
  var confirmPassword = document.getElementById("confirmPassword").value;
  var userMail = document.getElementById("userMail").value;
  let userPhone = document.querySelector("#userPhone").value;
  let userZip = document.querySelector("#userZip").value;
  let userImg = document.querySelector("#inputfile").value;

  var elErrorNameOne = document.getElementById("error_name1");
  var elErrorNameTwo = document.getElementById("error_name2");
  var elErrorPass = document.getElementById("error_pass");
  var elErrorConfirm = document.getElementById("error_confirm");
  var elErrorMail = document.getElementById("error_mail");


  //to check the mail exist or not
  if (isUsermailExists(userMail)) {
    elErrorMail.innerText =
      "Usermail already exists. Please choose a different one.";
    document.getElementById("userMail").style.border = "2px solid red";
    return false;
  }

  if (userNameFirst == "" || userNameFirst == null) {
    elErrorNameOne.innerText = "Please Provide Your First Name";
    document.getElementById("FirstName").style.border = "2px solid red";
    return false;
  }

  if (!nameRegex.test(userNameFirst)) {
    elErrorNameOne.innerText = "Invalid Name Format";
    document.getElementById("FirstName").style.border = "2px solid red";
    return false;
  }

  elErrorNameOne.innerText = "";
  document.getElementById("FirstName").style.border = "2px solid green";

  if (userNameLast == "" || userNameLast == null) {
    elErrorNameTwo.innerText = "Please Provide Your First Name";
    document.getElementById("LastName").style.border = "2px solid red";
    return false;
  }

  if (!nameRegex.test(userNameLast)) {
    elErrorNameTwo.innerText = "Invalid Name Format";
    document.getElementById("LastName").style.border = "2px solid red";
    return false;
  }

  elErrorNameTwo.innerText = "";
  document.getElementById("LastName").style.border = "2px solid green";


  if (userPassword == "" || userPassword == null) {
    elErrorPass.innerText =
      "Please Enter Pass With 6 Digits and Numbers and Special Characters";
    document.getElementById("userPassword").style.border = "2px solid red";
    return false;
  }

  if (!passRegex.test(userPassword)) {
    elErrorPass.innerText = "Invalid Password Format";
    document.getElementById("userPassword").style.border = "2px solid red";
    return false;
  }

  elErrorPass.innerText = "";
  document.getElementById("userPassword").style.border = "2px solid green";

  if (confirmPassword == "" || confirmPassword == null) {
    elErrorConfirm.innerText = "Please Confirm Your Password";
    document.getElementById("confirmPassword").style.border = "2px solid red";
    return false;
  }

  if (userPassword !== confirmPassword) {
    elErrorConfirm.innerText = "Passwords do not match";
    document.getElementById("confirmPassword").style.border = "2px solid red";
    return false;
  }

  elErrorConfirm.innerText = "";
  document.getElementById("confirmPassword").style.border = "2px solid green";

  if (userMail == "" || userMail == null) {
    elErrorMail.innerText = "Please Enter Valid Mail";
    document.getElementById("userMail").style.border = "2px solid red";
    return false;
  }

  if (!emailRegex.test(userMail)) {
    elErrorMail.innerText = "Invalid Email Format";
    document.getElementById("userMail").style.border = "2px solid red";
    return false;
  }

  elErrorMail.innerText = "";
  document.getElementById("userMail").style.border = "2px solid green";

  if (userPhone == "" || userPhone == null) {
    errorPhone.innerHTML = "You can't Add empty number";
    document.querySelector("#userPhone").style.border = "2px solid red";
    return false;
  }

  if (!numberRegex.test(userPhone)) {
    errorPhone.innerHTML = "Invalid Pattern";
    document.querySelector("#userPhone").style.border = "2px solid red";
    return false;
  }
  errorPhone.innerHTML = "";
  document.querySelector("#userPhone").style.border = "2px solid green";

  if (userZip == "" || userZip == null) {
    errorZip.innerHTML = "You can't Add empty Zip";
    document.querySelector("#userZip").style.border = "2px solid red";
    return false;
  }

  if (!numberZip.test(userZip)) {
    errorZip.innerHTML = "Invalid Pattern";
    document.querySelector("#userZip").style.border = "2px solid red";
    return false;
  }
  errorZip.innerHTML = "";
  document.querySelector("#userZip").style.border = "2px solid green";

  if (userImg == "" || userImg == null) {
    errorImg.innerHTML = "You must enter the photo of product";
    document.querySelector("#inputfile").style.border = "2px solid red";
    return false;
  }
  if (!imagesAllow.test(userImg)) {
    errorImg.innerHTML = "you must enter a valid extension";
    document.querySelector("#inputfile").style.border = "2px solid red";
    return false;
  }
  errorImg.innerHTML = "";
  document.querySelector("#inputfile").style.border = "2px solid green";

  let seller = new Seller(
    userNameFirst,
    userNameLast,
    userPassword,
    userMail,
    userPhone,
    userZip
  );

  sellers.push(seller);
  localStorage.setItem("sellers", JSON.stringify(sellers));

  return true;
} //end validation form

let userPassword = document.getElementById("userPassword");
let confirmPassword = document.getElementById("confirmPassword");

let withIconFirst = document.querySelector(".with-first");
let withIconSecond = document.querySelector(".with-second");

//first input password
withIconFirst.addEventListener("click", function () {
  if (userPassword.type == "password") {
    userPassword.type = "text";
    withIconFirst.src = "../images/eye-open.png";
  } else {
    userPassword.type = "password";
    withIconFirst.src = "../images/eye-close.png";
  }
});

//second input password
withIconSecond.addEventListener("click", function () {
  if (confirmPassword.type == "password") {
    confirmPassword.type = "text";
    withIconSecond.src = "../images/eye-open.png";
  } else {
    confirmPassword.type = "password";
    withIconSecond.src = "../images/eye-close.png";
  }
});


//function to check the user mail
function isUsermailExists(usermail) {
  return sellers.some((seller) => seller.UserMail === usermail);
}



function clearVal() {
  document.getElementById("FirstName").value = "";
  document.getElementById("LastName").value = "";
  document.getElementById("userPassword").value = "";
  document.getElementById("confirmPassword").value = "";
  document.getElementById("userMail").value = "";
  document.querySelector("#userPhone").value ="";
  document.querySelector("#userZip").value = "";
  document.querySelector("#inputfile").value = "";

  document.getElementById("userMail").style.border = "";
  document.querySelector("#userPhone").style.border = "";
  document.getElementById("userPassword").style.border = "";
  document.getElementById("confirmPassword").style.border = "";
  document.getElementById("FirstName").style.border = "";
  document.getElementById("LastName").style.border = "";
  document.querySelector("#inputfile").style.border = "";
  document.querySelector("#userZip").style.border = "";
};//end clear values