$(document).ready(function(){
	$.get("/api/user_data").then(function(data){
		$("#username").html("Hello "+data.firstname+" "+data.lastname);
	});
});