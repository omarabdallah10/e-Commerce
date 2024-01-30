window.addEventListener('load', function() {
  // let signupDismiss = document.getElementById("signup-dismiss");
  let signupDismiss = document.getElementById("dismisser");
  let signupNotice = document.getElementById("signup-notice");
  if(JSON.parse(localStorage.getItem('activeuser'))){
    signupNotice.classList.add("d-none");
  }
  signupDismiss.addEventListener("click", () => {
    // signupNotice.style.display = "none";
    signupNotice.classList.add("d-none");
    console.log("signup Clicked!!");
  });

  signupNotice.addEventListener("click", () => {
    var myModal = new bootstrap.Modal($("#authModal"));
      myModal.show();
  });

  function sendEmail() {
    var recipientEmail = 'iti-ecommerce@support.com';
  
    var emailSubject = 'Support or Buisness';
  
    var mailtoUrl = 'mailto:' + recipientEmail +
                    '?subject=' + encodeURIComponent(emailSubject);
  
    window.location.href = mailtoUrl;
  }
  $('#SendEmail').on('click', sendEmail);
});

