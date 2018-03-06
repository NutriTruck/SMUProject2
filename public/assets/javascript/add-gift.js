//Wait for form to be submitted
$("#add-gift").on("submit", function(evt){
	evt.preventDefault();

	//Grab data from inputs and create a new object
	var gift = {
		gift: $("#gift").val().trim(),
		age: $("#age").val().trim(),
		gender: $("#gender").val().trim(),
		hobbies: trimArray($("#hobby").val().trim().split(',')),
		likes: trimArray($("#like").val().trim().split(','))
	};

	//TODO: Validation

	requestGift(gift);

	//Reset inputs
	$("#gift").val('');
	$("#age").val('');
	$("#hobby").val('');
	$("#like").val('');
});

//Function for handling creating request
function requestGift(gift){
	$.post("/api/gift/", gift, function(){
		
	});
}

//Function for trimming array items of whitespace
function trimArray(arr){
	for(var i = 0; i < arr.length; i++){
		arr[i] = arr[i].trim().replace(/ /g,"_");
	}
	return arr;
}