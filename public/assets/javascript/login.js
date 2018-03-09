// $(document).ready(function(){
// 	$("#signIn").on("click", function(event){
// 		event.preventDefault();

// 		var user = {
// 			email: $("#email").val().trim(),
// 			password: $("#password").val().trim()
// 		}

// 		if(user.email == "" || user.password == ""){
// 			return;
// 		}

// 		loginUser(user)
// 	});

// 	function loginUser(user){
// 		$.post("/api/login", {
// 			email: user.email,
// 			password: user.password
// 		}).then(function(data){
// 			window.location.replace(data);
// 		}).catch(function(err){
// 			console.log(err);
// 		});
// 	}
// });





$(document).ready(function(){
$("#required").hide()

var firstname = $("#firstname")
var lastname = $("#lastname")
var email =  $("#email")
var password = $("#password")
$("#register").on("click", function(event){
	event.preventDefault();
	if(firstname.val().trim() !== "" && lastname.val().trim()  !== "" && email.val().trim() !=="" && password.val().trim() !== "") {
		
		window.location.href = "/add";

		//Grab data from inputs and creatings a new object
	var newUser = {
		firstname: firstname.val().trim(), 
		lastname: lastname.val().trim(),
		password: password.val().trim(),
		email: email.val().trim() 
	};

	console.log(newUser);
	//encrypt(newUser.password)
	submitUser(newUser);

	}

	$("#firstname").val("")
		$("#lastname").val("")
		$("#email").val("")
		$("#password").val("")
});
});
		//Function for adding user
function loginUser(user){

	$.post("/api/user/", user, function(){
		$.post("/api/login", {
			email: user.email,
			password: user.password
		}).then(function(data){
			window.location.replace(data);
		}).catch(function(err){
			console.log(err);
		});

	});

};




























