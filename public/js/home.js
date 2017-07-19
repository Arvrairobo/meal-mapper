$(document).ready(function() {
  // Getting references to our form and inputs
  var loginButton = $("#login-button");
  var loginEmail = $("input#login-email");
  var loginPassword = $("input#login-password");
  var signupButton = $("#signup-button");
  var signupEmail = $("input#signup-email");
  var signupPassword = $("input#signup-password");
  var firstNameInput = $("input#first-name");
  var lastNameInput = $("input#last-name");

  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
      $('#modal1').modal();

      $('ul.tabs').tabs();

      $(".button-collapse").sideNav();

  // When the form is submitted, we validate there's an email and password entered
  loginButton.on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: loginEmail.val().trim(),
      password: loginPassword.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    loginEmail.val("");
    loginPassword.val("");
    $('#modal1').modal('close');
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace('/dashboard');
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

    // When the signup button is clicked, we validate the email and password are not blank
    signupButton.on("click", function(event) {
      event.preventDefault();
      var userData = {
        email: signupEmail.val().trim(),
        password: signupPassword.val().trim(),
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim()
      };

      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        return;
      }
      // If we have an email and password, run the signUpUser function
      signUpUser(userData.email, userData.password, userData.firstName, userData.lastName);
      signupEmail.val("");
      signupPassword.val("");
      firstNameInput.val("");
      lastNameInput.val("");
      $('#modal1').modal('close');
    });

    // Does a post to the signup route. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function signUpUser(email, password, firstName, lastName) {
      $.post("/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }).then(function(data) {
        window.location.replace("/dashboard");
      }).catch(function(err) {
        console.log(err);
      });
    }

});