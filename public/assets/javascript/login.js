			
$(document).ready(function(){
	var email =""; 
	var password = "";

	$("#failed").hide();
	$("#signIn").on("click", function(event){
		event.preventDefault(); 
		if(".form-control" !== ""){
			var email = $("#password").val().trim();
			var password = $("#email").val().trim();
			console.log( email + password)
			if(email !== "" && password !== ""){
			window.location.href = "profile.html";
			}
			 
		}else{

			$("#failed").show();
		}

		$("#password").val(""); 
		$("#email").val("")

	});


function encrypt()
{
var password = $("#email").val().trim();
var hide=$('#hide').val();
if(password=="")
{
document.getElementById('err').innerHTML='Error:Password is missing';
return false;
}
else
{
document.getElementById("hide").value = document.getElementById("password").value;
var hash = CryptoJS.MD5(password);
document.getElementById('password').value=hash;
return true;
}
}
});






































