//Variables for keeping track of result data
var result;
var count;

$("#request").on("submit", function(evt){
	evt.preventDefault();

	//Validates form input
	if(validation()){
		//Grab data from inputs and create a new object
		var request = {
			name: $("#name").val().trim(),
			age: $("#age").val().trim(),
			gender: $("#gender").val(),
			hobbies: trimArray($("#hobbies").val().trim().split(',')),
			likes: trimArray($("#likes").val().trim().split(',')),
			priority: $("#priority").val().toLowerCase()
		};

		requestGift(request);
	}
});

//Control buttons for switching between gift options
$("#prevGift").on('click', function(evt){
	if(count-1 == -1){
		count = result.length-1;
	} else {
		count--;
	}
	displayGift(result[count]);
});

$("#nextGift").on('click', function(evt){
	if(count+1 == 10 || count+1 == result.length){
		count = 0;
	} else {
		count++;
	}
	displayGift(result[count]);
});

//Toggles the modal when available
$(document).on('click', '#modal-toggle', function(evt){
	$("#giftModal").modal('toggle');
});

//Function for handling creating request
function requestGift(req){
	$.get("/api/request/"+req.priority+"/"+req[req.priority], function(data){
		//Log the results to the page
		count = 0;
		result = findGift(req, data);

		//Creates a button for opening the modal if you close it
		$("#results-button").html("<button id='modal-toggle'>Your Results</button>");

		//Open modal and display results
		console.log(result);
		$("#giftModal").modal('toggle');
		displayGift(result[count]);
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
			giftArray.push({gift: gifts[i].gift, totalVal: matchValue, matches: 1});
		} else {
			//Add match value to the total
			giftArray[arrIndex].totalVal += matchValue;
			//Increase number of times gift was suggested
			giftArray[arrIndex].matches++;
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

//Function for searching the object for a value
function searchGifts(arr, value){
	for(var i = 0; i < arr.length; i++){
		if(arr[i].gift === value){
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
		tempArray.push({gift: arr[i].gift, avgVal: arr[i].totalVal/arr[i].matches, matches: arr[i].matches});
	}

	tempArray.sort(function(a, b){return b.avgVal - a.avgVal});

	return tempArray;
}

function displayGift(result){
	$("#gift-result").html(result.gift);
	$("#gift-score").html(result.avgVal);
	$("#gift-matches").html(result.matches);
}

function validation(){
	var failure = 0;
	console.log($("#hobbies").val());

	//Clear any alerts
	$(".alert").removeClass('alert alert-danger');
	$(".error").html("");

	if($("#name").val() === ""){
		$("#name").addClass('alert alert-danger');
		$("#nameErr").html("Please fill out this field.").addClass("alert alert-danger");
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