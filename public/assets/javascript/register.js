
$(document).ready(function(){	
	$("#register").on("click", function(evt){
		evt.preventDefault();
		
		var newUser = {
			firstname: $("#firstname").val().trim(),
			lastname: $("#lastname").val().trim(),
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		};
		
		if(newUser.firstname == "" || newUser.lastname == "" || newUser.email == "" || newUser.password == ""){
			return;
		}

		registerUser(newUser);
	});

	function registerUser(user){
		console.log(user);
		$.post("/api/register", {
			firstname: user.firstname,
			lastname: user.lastname,
			email: user.email,
			password: user.password
		}).then(function(data){
			console.log(data);
			window.location.replace(data);
		}).catch(function(err){
			console.log(err);
		});
	}
});		