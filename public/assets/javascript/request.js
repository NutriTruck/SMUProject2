$("#request").on("submit", function(evt){
	evt.preventDefault();

	//Grab data from inputs and creatings a new object
	var request = {
		name: $("#name").val().trim(),
		age: $("#age").val().trim(),
		gender: $("#gender").val(),
		hobbies: trimArray($("#hobby").val().trim().split(',')),
		likes: trimArray($("#like").val().trim().split(',')),
		priority: $("#priority").val().toLowerCase()
	};

	requestGift(request);
});

//Function for handling creating request
function requestGift(req){
	console.log(req);
	$.get("/api/request/"+req.priority+"/"+req[req.priority], function(data){
		var result = findGift(req, data);
		$("#results").html(JSON.stringify(result));
	});
};

function findGift(giftee, gifts){
	//Create empty array to hold possible gifts
	var giftArray = [];

	//Variable for holding match closeness
	var matchValue;
	var ageDif;
	var arrIndex;

	//Check over returned results and add gifts to the array
	for(var i = 0; i < gifts.length; i++){
		//Reset match value
		matchValue = 0;

		//Calculate age difference
		ageDif = Math.abs(giftee.age - gifts[i].age);

		//Score based on how close age matches
		if(ageDif <= 5){
			matchValue += 10;
		}else if(ageDif <= 10){
			matchValue += 5;
		}

		//Check if gender matches
		if(giftee.gender.toLowerCase() === gifts[i].gender){
			matchValue += 10;
		}

		//Loop over hobbies arrays and add score if any match
		for(var j = 0; j < giftee.hobbies.length; j++){
			for(var k = 0; k < gifts[i].hobbies.length; k++){
				if(giftee.hobbies[j].toLowerCase() === gifts[i].hobbies[k]){
					matchValue += 5;
				} 
			} 
		}

		//Loop over hobbies arrays and add score if any match
		for(var j = 0; j < giftee.likes.length; j++){
			for(var k = 0; k < gifts[i].likes.length; k++){
				if(giftee.likes[j].toLowerCase() === gifts[i].likes[k]){
					matchValue += 5;
				} 
			} 
		}

		//If a gift if not present, add it, else average out the value
		arrIndex = searchGifts(giftArray, gifts[i].gift);
		if(arrIndex === -1){
			giftArray.push([gifts[i].gift, matchValue, 1]);
		} else {
			//Add match value to the total
			giftArray[arrIndex][1] += matchValue;
			//Increase number of times gift was suggested
			giftArray[arrIndex][2]++;
		}
	}

	return sortGifts(giftArray);
};

//Function for trimming array items of whitespace
function trimArray(arr){
	for(var i = 0; i < arr.length; i++){
		arr[i] = arr[i].trim().replace(/ /g,"_");
	}
	return arr;
};

//Function for searching the multidimensional array for a value
function searchGifts(arr, value){
	for(var i = 0; i < arr.length; i++){
		if(arr[i][0] === value){
			return i;
		}
	}
	return -1;
}

function sortGifts(arr){
	//Temporary array for storing sorted values
	var tempArray = [];

	for(var i = 0; i < arr.length; i++){
		//Push the array values, averaging the match closeness
		tempArray.push([arr[i][0], arr[i][1]/arr[i][2], arr[i][2]]);
	}

	tempArray.sort(function(a, b){return b[1] - a[1]});

	return tempArray;
}