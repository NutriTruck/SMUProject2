
$(document).ready(function(){
$("#required").hide()
$("#register").on("click", function(){
	event.preventDefault();
	if("form-control" !== ""){
		console.log("test");
		//post to the db


		
		var firstName = $("#firstname").val().trim();
		var lastName = $("#lastname").val().trim();
		var email = $("#email").val().trim();
		var password = $("#password").val().trim();
		console.log(
			
		name
			);
		
		if(firstname !== "" && lastName !== "" && email !== "" && password !== ""){
			window.location.href = "/add";
		}
	
	}else{
		$("#required").show();

			//Grab data from inputs and creatings a new object
	var newUser = {
		firstname: firstname,
		lastname: lastname,
		email: email, 
		password: password
	};
	addUser(newUser);

		$("#firstname").val("")
		$("#lastname").val("")
		$("#email").val("")
		$("#password").val("")
};
})
		//Function for adding user
function addUser(req){
	$.post("/api/user//", req, function(){
		console.log("new user submitted");
	});
};
})


// $("#register").on("click", function(event){
// 	event.preventDefault();

// 	//Grab data from inputs and creatings a new object
// 	var newUser = {
// 		firstname: firstname,
// 		lastname: lastname,
// 		email: email, 
// 		password: password
// 	};

// // 	console.log(newUser);

// // 	addUser(newUser);
// // });

// //Function for adding user
// function addUser(req){
// 	$.post("/api/user//", req, function(){
// 		console.log("new user submitted");
// 	});
// };