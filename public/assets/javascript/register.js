
$(document).ready(function(){	
	$("#register").on("click", function(evt){
		evt.preventDefault();
		
		var newUser = {
			firstName: $("#firstname").val().trim();
			lastName: $("#lastname").val().trim();
			email: $("#email").val().trim();
			password: $("#password").val().trim();
		};
		
		if(firstname == "" || lastName == "" || email !== "" || password == ""){
			return;
		}

		registerUser(newUser);
	});

	function registerUser(user){
		$.post("/api/register", {
			firstName: user.firstname,
			lastname: user.lastname,
			email: user.email,
			password: user.password
		}).then(function(data){
			window.location.replace(data);
		}).catch(function(err){
			console.log(err);
		});
	}
});		