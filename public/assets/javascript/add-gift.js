//Wait for form to be submitted
$("#add-gift").on("submit", function(evt){
	evt.preventDefault();

	if(validation()){
	//Grab data from inputs and create a new object
		var gift = {
			gift: $("#gift").val().trim(),
			age: $("#age").val().trim(),
			gender: $("#gender").val().trim(),
			hobbies: trimArray($("#hobbies").val().trim().split(',')),
			likes: trimArray($("#likes").val().trim().split(','))
		};
		addGift(gift);
	}
});

//Function for handling creating request
function addGift(gift){
	$.post("/api/gift/", gift, function(){
		//TODO: Some notification of adding gift

		//Reset inputs
		$("#gift").val('');
		$("#age").val('');
		$("#hobby").val('');
		$("#like").val('');
	});
}

//Function for trimming array items of whitespace
function trimArray(arr){
	for(var i = 0; i < arr.length; i++){
		arr[i] = arr[i].trim().replace(/ /g,"_");
	}
	return arr;
}

function validation(){
	var failure = 0;
	console.log($("#hobbies").val());

	//Clear any alerts
	$(".alert").removeClass('alert alert-danger');
	$(".error").html("");

	if($("#gift").val() === ""){
		$("#gift").addClass('alert alert-danger');
		$("#giftErr").html("Please fill out this field.").addClass("alert alert-danger");
		failure++;
	}
	if($("#age").val() === ""){
		$("#age").addClass('alert alert-danger');
		$("#ageErr").html("Please fill out this field.").addClass("alert alert-danger");
		failure++;
	}else if(isNaN($("#age").val())){
		$("#age").addClass('alert alert-danger');
		$("#ageErr").html("Please enter a number.").addClass("alert alert-danger");
		failure++;
	}
	if($("#hobbies").val() == ""){
		$("#hobbies").addClass('alert alert-danger');
		$("#hobbyErr").html("Please fill out this field.").addClass("alert alert-danger");
		failure++;
	}
	if($("#likes").val() == ""){
		$("#likes").addClass('alert alert-danger');
		$("#likeErr").html("Please fill out this field.").addClass("alert alert-danger");
		failure++;
	}

	if(failure == 0){
		return true;
	} else {
		return false;
	}
}