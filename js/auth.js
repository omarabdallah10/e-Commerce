import { UsersManagement } from './database_utilities/users.js';

// var rgex_pass = "[a-zA-Z0-9!@#$%^&*]{8,}";
// var rgex_email = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";

// function validateEmail(email_v) {
// return email_v.match(rgex_email);
// }

// function validatePassword(password_v) {
// return password_v.match(rgex_pass);
// }

$(function() {
// SignUp Handling

// Ui/Ux Indicators
// $('#signupEmail').on('keyup', function () {
//     let email = $(this).val();
//     let isValidEmail = validateEmail(email);
//     $(this).removeClass('is-valid is-invalid').addClass(isValidEmail ? 'is-valid' : 'is-invalid');
// });
// $('#signupPassword').on('keyup', function () {
//     let password = $(this).val();
//     let isValidPassword = validatePassword(password);
//     $(this).removeClass('is-valid is-invalid').addClass(isValidPassword ? 'is-valid' : 'is-invalid');
// });
// $('#signupConfirmPassword').on('keyup', function () {
//     let password = $('#signupPassword').val();
//     let passwordConfirm = $(this).val();
//     let isValidPasswordConfirm = password === passwordConfirm;
//     $(this).removeClass('is-valid is-invalid').addClass(isValidPasswordConfirm ? 'is-valid' : 'is-invalid');
// });

//Show/hide password
$('.eye').each(function() {
    $(this).on('click', function() {
            var passwordField = $(this).closest('.input-group').find('.Password');
            var eyeIcon = $(this).find('i');
            passwordField.focus();
            if (passwordField.attr('type') === 'password') {
                passwordField.attr('type', 'text');
                eyeIcon.removeClass('fa-eye').addClass('fa-eye-slash');
                console.log(eyeIcon);
            } else {
                passwordField.attr('type', 'password');
                eyeIcon.removeClass('fa-eye-slash').addClass('fa-eye');
            }
        });
    });

// Final Form Submission 
$('#signup_form').submit(function(event) {
    event.preventDefault();
    const UsersControl = new UsersManagement();
    var userMail = document.getElementById("signupEmail").value;
    var userPassword = document.getElementById("signupPassword").value;
    var userConfirmPassword = document.getElementById("signupConfirmPassword").value;
    var userId= UsersControl.generateId();
    if(userPassword===userConfirmPassword)
    {
        try {

            UsersControl.addUser(userMail, userPassword, userId, 1);
            $('#signup_feedback').text('').text("Successfully Registered!").removeClass("invalid-feedback").addClass('valid-feedback');
            setTimeout(function() {
                localStorage.setItem("activeuser", JSON.stringify({
                    email: userMail,
                    id: userId,
                    accountType: 1
                  }));
                window.location.replace("./Homepage.html");
            }, 1000);
               
        } catch (error) {
            console.log(error.message);
            $('#signup_feedback').text('').text(error.message).removeClass("valid-feedback").addClass('invalid-feedback');
        } 
    }
    else{
        $('#signup_feedback').text('').text("Passwords do not match").removeClass("valid-feedback").addClass('invalid-feedback');
    }

    
});

//Sign in Handling
$("#signin_form").submit(function(event) {

    event.preventDefault();

    const UsersControl = new UsersManagement();

    
    let email = $("#email").val();
    let password = $("#password").val();

    let user = UsersControl.authenticateUser(email, password);

    if (user) {
      localStorage.setItem("activeuser", JSON.stringify({
        email: user.email,
        id: user.id,
        accountType: user.accountType
      }));

    window.location.replace("./Homepage.html");
    } 
    else {
        $('#signin_feedback').text('').text('Invalid Credentials');
         }
  });

});
