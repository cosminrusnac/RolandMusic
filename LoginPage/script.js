// go to top function

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// username and password validation through API

let users = [];
let passwords = [];
let userCheckResult = document.getElementById('user-check-result');
let passwordCheckResult = document.getElementById('password-check-result');
let signIn = document.getElementById('sign-in');
let userInput = document.getElementById('user');
let passwordInput = document.getElementById('pass');


const checkUserNameAndPassword = () => {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((json) => {
      userCheckResult.innerHTML = '<span> Loading... </span> ';
      passwordCheckResult.innerHTML = '<span> Loading... </span> ';
      users.push(json);
      passwords.push(json);
      for(i=0; i<users[0].length; i++) {
        console.log(users[0][i].username);
        console.log(users[0][i].address.zipcode);
      if (userInput.value === users[0][i].username &&
        passwordInput.value === users[0][i].address.zipcode ) {
        userCheckResult.innerHTML = '<span> Valid User </span> <img src="/img/checked.png" width="30px">';
        passwordCheckResult.innerHTML = '<span> Correct Password </span> <img src="/img/checked.png" width="30px">';
        break;
      } else {
        userCheckResult.innerHTML = '<span> Invalid User </span> <img src="/img/error.png" width="30px">';
        passwordCheckResult.innerHTML = '<span> Wrong Password </span> <img src="/img/error.png" width="30px">';
      }
    }

    for(i=0; i<users[0].length; i++) {
    if (passwordInput.value === users[0][i].address.zipcode &&
      userInput.value === users[0][i].username &&
      document.getElementById('checkTerms').checked == true) {
      document.getElementsByClassName('navbar-right')[0].style.display = 'none';
      document.getElementById('welcomeMember').innerHTML = `Welcome, ${userInput.value}!`;
      document.getElementById('termsResult').innerHTML = '';
      break;
    } else {
      document.getElementById('termsResult').innerHTML = '⚠️ You have to agree our Terms and Conditions in order to Log In. '
    }
  }
  })
}

signIn.addEventListener('click', checkUserNameAndPassword)

// function to show hidden character on passwords

showPassword = e => e.type === "password" ? e.type = "text" : e.type = "password";

// Validate email address through regex

const emailInput = document.getElementById('email');
const emailCheckResult = document.getElementById('email-check-result');

const verifyEmail = () => {
  if (emailInput.value.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi)) {
    emailCheckResult.innerHTML = 'Excellent! "' + emailInput.value + '" is a valid email address. <img src="/img/checked.png" width="30px">';
  } else {
    emailCheckResult.innerHTML = 'Sorry, but "' + emailInput.value + '" is not a valid email address. <img src="/img/error.png" width="30px">';
  }
}

emailInput.addEventListener('keyup', verifyEmail);

//password validation

var passwordInput1 = document.getElementById("pass-input");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
passwordInput1.onfocus = function() {
  document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
passwordInput1.onblur = function() {
  document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
passwordInput1.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(passwordInput1.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(passwordInput1.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(passwordInput1.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(passwordInput1.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}


const passwordRepeatInput = document.getElementById('pass-repeat');
const passwordRepeatInputResult = document.getElementById('pass-rep-res');
const signUp = document.getElementById('signUpBtn');

function checkRepeat () {

  if(passwordRepeatInput.value === passwordInput1.value) {
    passwordRepeatInputResult.innerHTML = 'Perfect! Passwords match! <img src="/img/checked.png" width="30px">';
  
  } else {
    passwordRepeatInputResult.innerHTML = 'No match! Please re-enter it! <img src="/img/error.png" width="30px"';
  }
}

passwordRepeatInput.addEventListener('keyup', checkRepeat);


const addUser = () => {
 var userName = document.getElementById('user1');
 console.log(userName.value);
fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify({
        username: userName.value,
        email: emailInput.value,
        address: {
          zipcode: passwordInput1.value
        }
    }),  
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
.then(response => response.json())
.then(json => console.log(json));
}

signUp.addEventListener('click', addUser);

// check CAPS Lock key if pressed


let warningText = document.getElementById('warning');
let userName = document.getElementById('user1');

const capsOn = e => e.getModifierState("CapsLock") ? 
warningText.style.display = "block" : warningText.style.display = "none";

userInput.addEventListener("keyup", capsOn);
passwordInput.addEventListener("keyup", capsOn);
userName.addEventListener("keyup", capsOn);
passwordInput1.addEventListener("keyup", capsOn);
emailInput.addEventListener("keyup", capsOn);
passwordRepeatInput.addEventListener("keyup", capsOn);







