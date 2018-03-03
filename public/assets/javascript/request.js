$("#request").on("submit", function(evt){
	evt.preventDefault();

	//Grab data from inputs and creatings a new object
	var request = {
		name: $("#name").val().trim(),
		age: $("#age").val().trim(),
		gender: $("#gender").val(),
		hobbies: $("#hobby").val().trim().split(','),
		likes: $("#like").val().trim().split(','),
		priority: $("#priority").val().toLowerCase()
	};

	requestGift(request);
});

//Function for handling creating request
function requestGift(req){
	console.log(req);
	$.get("/api/request/"+req.priority+"/"+req[req.priority], function(data){
		console.log(data);
		console.log("Request submitted");
	});
}