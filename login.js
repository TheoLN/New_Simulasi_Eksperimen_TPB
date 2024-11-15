
const firebaseConfig = {
  apiKey: "AIzaSyBtCEb7H01amJ6NM0EMqTQM6wLAWL7sZUE",
  authDomain: "login-praktikum-tpb.firebaseapp.com",
  databaseURL: "https://login-praktikum-tpb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "login-praktikum-tpb",
  storageBucket: "login-praktikum-tpb.firebasestorage.app",
  messagingSenderId: "142865773881",
  appId: "1:142865773881:web:0290faf49a0416dfdca4e8"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  // Set up our register function
  function register () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    full_name = document.getElementById('full_name').value
    
  
    // Validate input fields
    if (validate_email(email) == false ) {
      alert('Your Email is incorrect')
      return
      // Don't continue running the code
    }
    if (validate_password(password)==false){
        alert('Your password is incorrect')
        return
    }
    
    
   
    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        email : email,
        full_name : full_name,
        
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data)
  
      // DOne
      alert('User Created!! Please use login to use your account')
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  // Set up our login function
  function login () {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
  
    // Validate input fields
    if (validate_email(email) == false ) {
      alert('Your Email is incorrect')
      return
      // Don't continue running the code
    }
    if (validate_password(password)==false){
        alert('Your password is incorrect')
        return
    }

    if (validate_field(full_name) == false ) {
        alert('Please insert a correct full name')
        return
      }
  
    auth.signInWithEmailAndPassword(email, password)
    .then(function() {
      // Declare user variable
      var user = auth.currentUser
  
      // Add this user to Firebase Database
      var database_ref = database.ref()
  
      // Create User data
      var user_data = {
        last_login : Date.now()
      }
  
      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data)
  
      // DOne
      alert('User Logged In!!')
      localStorage.setItem("loggedInUser", full_name);
      window.location.href = "index.html";
  
    })
    .catch(function(error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code
      var error_message = error.message
  
      alert(error_message)
    })
  }
  
  
  
  
  // Validate Functions
  function validate_email(email) {
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
      // Email is good
      return true
    } else {
      // Email is not good
      return false
    }
  }
  
  function validate_password(password) {
    // Firebase only accepts lengths greater than 6
    return password.length >= 6;
    
  }
  
  function validate_field(field) {
    if (field == null) {
      return false
    }
  
    if (field.length <= 0) {
      return false
    } else {
      return true
    }
  }