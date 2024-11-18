const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
if (loggedInUser) {
  console.log("User Info:", loggedInUser);
  // Use this information as needed
} else {
  alert("No user is logged in.");
  // Redirect to login page if necessary
  window.location.href = "login.html";
}