import { UsersManagement } from './Authentication/users.js';
import AuthModule from './Authentication/AuthModule.js';

var authModalComponent = `
<div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="text-center mb-4">
                        <!-- Add your logo here -->
                        <a href="#" class="text-decoration-none text-black fw-bold fs-3">
            SHOP.CO
          </a>

                    </div>
            
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item w-50 text-center">
                            <a class="nav-link active" id="signin-tab" data-bs-toggle="tab" href="#signin" role="tab" aria-controls="signin" aria-selected="true">Sign In</a>
                        </li>
                        <li class="nav-item w-50 text-center">
                            <a class="nav-link" id="signup-tab" data-bs-toggle="tab" href="#signup" role="tab" aria-controls="signup" aria-selected="false">Sign Up</a>
                        </li>
                    </ul>
                    <!-- Sign in Form -->
                    <div class="tab-content">
                        <div class="tab-pane fade show active" id="signin" role="tabpanel" aria-labelledby="signin-tab">
                                <form class="form p-3" id="signin_form">

                                    <div class="mb-3">
                                        <!-- Email -->
                                        <label for="email" class="form-label">Email</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <input type="email" class="form-control" id="email"  placeholder="Enter your Email" required>
                                        </div>
                                    </div>
                
                                    <div class="mb-3">
                                        <!-- Password -->
                                        <label for="password" class="form-label ">Password</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <input type="password" class="form-control Password" id="password"  required>
                                            <span class="input-group-text eye"><i class="fas fa-eye"></i></span>
                                        </div>
                                    </div>
                
                                    <div class="mb-3 form-check">
                                        <input type="checkbox" class="form-check-input" id="rememberMe">
                                        <label class="form-check-label" for="rememberMe">Remember me</label>
                                        <a href="#" class="span ms-2">Forgot password?</a>
                                    </div>
                                    <div class="d-flex justify-content-center flex-column align-items-center">
                                        <div id="signin_feedback" class="invalid-feedback d-block text-center ">
                                        </div>
                                        <button class="btn text-bg-dark mt-3">Sign In</button>
                                    </div>
                                </form>
                        </div>
                        <!-- Sign UP -->
                        <div class="tab-pane fade" id="signup" role="tabpanel" aria-labelledby="signup-tab">
                                <!-- Sign Up Form Content -->
                                <form class="form p-3" id="signup_form">
                                <!-- Full Name -->
                                <div class="mb-3">
                                    <label for="fullName" class="form-label">Full Name</label>
                                    <div class="input-group">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        <input type="text" class="form-control" id="fullName" placeholder="Enter your Full Name" required>
                                    </div>
                                </div>
                                    <!-- Email -->
                                    <div class="mb-3">
                                        <label for="signupEmail" class="form-label">Email</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            <input class ="form-control "type="email"  id="signupEmail" placeholder="Enter your Email" required >
                                            
                                        </div>
                                    </div>
                                    <!-- Password -->
                                    <div class="mb-3">
                                        <label for="signupPassword" class="form-label">Password</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <input type="password" class="form-control Password" id="signupPassword" placeholder="Enter your Password" pattern="[a-zA-Z0-9!@#$%^&*]{8,}" title="Password must contain at least 8 characters, including letters, numbers, and special characters: !@#$%^&*" required>
                                            <span class="input-group-text eye" ><i class="fas fa-eye"></i></span>
                                        </div>
                                    </div>
                                    <!-- Confirm Password -->
                                    <div class="mb-3">
                                        <label for="confirmPassword" class="form-label">Confirm Password</label>
                                        <div class="input-group">
                                            <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                            <input type="password" class="form-control Password" id="signupConfirmPassword" placeholder="Confirm your Password">
                                            <span class="input-group-text eye"><i class="fas fa-eye"></i></span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-center flex-column align-items-center">
                                    <!-- Submit Btn -->
                                        <div id="signup_feedback" class="invalid-feedback text-center d-block ">
                                        </div>
                                    <button class="btn  text-bg-dark mt-3 ">Sign Up</button>
                                    </div>
                                </form>
                        
                </div>
                <!-- <div class="modal-footer"> -->
                    <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                    <!-- You can add additional buttons here if needed -->
                </div>
            </div>
        </div>`;
$(function () {
  $(document).ready(function () {
    $("#authModal").html(authModalComponent);

    $(".fa-circle-user").on("click", function () {
      // Trigger the modal using Bootstrap's modal method
      var myModal = new bootstrap.Modal($("#authModal"));
      myModal.show();
    });
    $(".eye").each(function () {
      $(this).on("click", function () {
        var passwordField = $(this).closest(".input-group").find(".Password");
        var eyeIcon = $(this).find("i");
        passwordField.focus();
        if (passwordField.attr("type") === "password") {
          passwordField.attr("type", "text");
          eyeIcon.removeClass("fa-eye").addClass("fa-eye-slash");
          console.log(eyeIcon);
        } else {
          passwordField.attr("type", "password");
          eyeIcon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
      });
    });

    // Final Form Submission
    $("#signup_form").submit(function (event) {
      event.preventDefault();
      const UsersControl = new UsersManagement();
      var full_name= document.getElementById("fullName").value;
      var userMail = document.getElementById("signupEmail").value;
      var userPassword = document.getElementById("signupPassword").value;
      var userConfirmPassword = document.getElementById(
        "signupConfirmPassword"
      ).value;
      var userId = UsersControl.generateId();
      if (userPassword === userConfirmPassword) {
        try {
          UsersControl.addUser(userMail, userPassword, userId, "Customer",full_name,2);
          $("#signup_feedback")
            .text("")
            .text("Successfully Registered!")
            .removeClass("invalid-feedback")
            .addClass("valid-feedback");
          setTimeout(function () {
            localStorage.setItem(
              "activeuser",
              JSON.stringify({
                email: userMail,
                id: userId,
                role: "Customer",
                full_name:full_name,
                status: 2,
              })
            );
            window.location.replace("./Homepage.html");
          }, 1000);
        } catch (error) {
          console.log(error.message);
          $("#signup_feedback")
            .text("")
            .text(error.message)
            .removeClass("valid-feedback")
            .addClass("invalid-feedback");
        }
      } else {
        $("#signup_feedback")
          .text("")
          .text("Passwords do not match")
          .removeClass("valid-feedback")
          .addClass("invalid-feedback");
      }
    });

    //Sign in Handling
    $("#signin_form").submit(function (event) {
      event.preventDefault();

      const UsersControl = new UsersManagement();

      let email = $("#email").val();
      let password = $("#password").val();

      let user = UsersControl.authenticateUser(email, password);

      if (user) {
        localStorage.setItem(
          "activeuser",
          JSON.stringify({
            email: user.email,
            id: user.id,
            role: user.role,
            full_name:user.full_name,
            status: user.status,
          })
        );

        window.location.replace("./Homepage.html");
      } else {
        $("#signin_feedback").text("").text("Invalid Credentials");
      }
    });
  });
});
