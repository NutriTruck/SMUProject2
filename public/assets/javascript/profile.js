$(document).ready(function(){
	$.get("/api/user_data").then(function(data){
		console.log(data);
		$("#username").html("Hello "+data.firstname+" "+data.lastname);
	});
});