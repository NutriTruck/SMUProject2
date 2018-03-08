$(document).ready(function(){
	$.get("/api/user_data").then(function(data){
		if(data.id == undefined){
			$("#log").html('<a class="nav-link" href="login">Sign In</a>');
		}else{
			$("#log").html('<a class="nav-link" href="profile">Profile</a>'+
						   '<a class="nav-link" href="logout">Sign Out</a>')
		}
	});
});