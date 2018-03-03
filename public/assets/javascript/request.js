$("#request").on("submit", function(evt){
	evt.preventDefault();

	//Grab data from inputs and creatings a new object
	var request = {
		name: $("#name").val().trim(),
		age: $("#age").val().trim(),
		gender: $("#gender").val().trim(),
		hobby: $("#hobby").val().trim().split(','),
		like: $("#like").val().trim().split(',')
	};

	console.log(request);

	requestGift(request);
});

//Function for handling creating request
function requestGift(req){
	$.post("/api/request/", req, function(){
		console.log("Request submitted");
	});
}