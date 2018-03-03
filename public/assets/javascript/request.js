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
		console.log(findGift(req, data));
	});
}

function findGift(giftee, gifts){
	//Create empty array to hold possibl gifts
	var giftArray = [];

	//Variable for holding match closeness
	var matchValue = 0;

	//Check over returned results and add gifts to the array
	for(var i = 0; i < gifts.length; i++){
		matchValue += Math.abs(giftee.age - gifts[i].age);
		if(giftee.gender === gifts[i].gender){
			matchValue += 10;
		}
		if(giftee.hobbies === gifts[i].hobbies){
			matchValue += 10;
		}
		if(giftee.likes === gifts[i].likes){
			matchValue += 10;
		}

		//If a gift if not present, add it, else average out the value
		if(giftArray.indexOf(gifts[i].gift) === -1){
			giftArray.push([gifts[i].gift, matchValue]);
		} else {
			giftArray[x][1] = ((matchValue+giftArray[x][1])/2);
		}
	}
};