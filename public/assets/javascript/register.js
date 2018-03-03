
$(document).ready(function(){
$("#required").hide()
$("#register").on("click", function(event){
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
			window.location.href = "add.html";
		}
	
	}else{
		$("#required").show()

		$("#firstname").val("")
		$("#lastname").val("")
		$("#email").val("")
		$("#password").val("")
};
})

})

