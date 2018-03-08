$(document).ready(function(){
	$("#signIn").on("click", function(event){
		event.preventDefault();

		var user = {
			email: $("#email").val().trim(),
			password: $("#password").val().trim()
		}

		if(user.email == "" || user.password == ""){
			return;
		}

		loginUser(user)
	});

	function loginUser(user){
		$.post("/api/login", {
			email: user.email,
			password: user.password
		}).then(function(data){
			window.location.replace(data);
		}).catch(function(err){
			console.log(err);
		});
	}
});

































