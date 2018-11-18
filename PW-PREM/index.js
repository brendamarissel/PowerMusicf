firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";
	 document.getElementById("imagen").style.display = "none";
	  document.getElementById("imagen2").style.display = "none";
	  document.getElementById("imagen3").style.display = "block";
	document.getElementById("app").style.display = "block";
	
    var user = firebase.auth().currentUser;
	
	
	
    if(user != null){

      var email_id = user.email;
     

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";
	document.getElementById("app").style.display = "none";
	document.getElementById("imagen3").style.display = "none";
	 document.getElementById("imagen").style.display = "block";
	  document.getElementById("imagen2").style.display = "block";
  }
});

function login(){

  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}

function logout(){
  firebase.auth().signOut();
}
