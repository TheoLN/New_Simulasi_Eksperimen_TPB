document.addEventListener("DOMContentLoaded", function() { 
    // Retrieve the user data from localStorage 
    var loggedInUser = localStorage.getItem("loggedInUser"); 
    if (loggedInUser) { 
        try { 
            var User = JSON.parse(loggedInUser); 
            // Check if loggedInUser is not null and has a name property 
            if (User.name) { document.getElementById("login").textContent = User.name; 
        } else {
             document.getElementById("login").textContent = "Login"; 
            } 
        } catch (e) { 
            console.error("Error parsing loggedInUser: ", e); 
            document.getElementById("login").textContent = "Login"; } 
        } else { 
            document.getElementById("login").textContent = "Login"; 
        } 
    });