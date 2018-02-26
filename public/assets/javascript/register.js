
$("#required").hide()
$("#register").on("click", function(event){
	if(".form-group" !== ""){
		//post to the db
		event.preventDefault();
		var name = $("#firstname").val().trim();
		 $("#lastname").val().trim();
		$("#email").val().trim();
		$("#password").val().trim();
		console.log(
			
		name
			);
		$("#firstname").val("")
		$("#lastname").val("")
		$("#email").val("")
		$("#fz").val("")
		window.location.href = "login.html";
		
	}else{
		$("#required").show()
};
})