$(document).ready(function(){
	var userId;

	$.get("/api/user_data").then(function(data){
		if(data.id == undefined){
			$("#saveBox").hide();
		}else{
			userId = data.id;
			$("#saveBox").show();
		}
	});


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

			if($("#saveReq").val() == "on"){
				createGiftee(request, userId);
			}

			requestGift(request);
		}
	});

	//Toggles the modal when available
	$(document).on('click', '#modal-toggle', function(evt){
		$("#giftModal").modal('toggle');
	});
});

//Function to create a giftee
function createGiftee(req, id){
	var giftee = {
		userId: id,
		name: req.name,
		gender: req.gender,
		age: req.age,
		hobbies: req.hobbies,
		likes: req.likes
	}

	$.post("/api/giftee", giftee, function(){
		//TODO: Some notice of successfully adding friend maybe
	});
}

//Function for handling creating request
function requestGift(req){
	$.get("/api/request/"+req.priority+"/"+req[req.priority], function(data){
		//Handle no results
		if(data.length == 0){
			$("#message").addClass("alert alert-danger").html("We're very sorry but no matches were found. Please try again or change the search priority. <span style='font-size:120%; font-style:bold;'>:(</span>");
		} else {
			//Find the gift
			var results = findGift(req, data);

			//Creates a button for opening the modal if you close it
			$("#results-button").html("<button class='btn btn-lg btn-primary btn-block' id='modal-toggle'>Your Results</button>");
			$("#message").removeClass("alert alert-danger").html("Check out your amazing results! Not seeing what you want? Request more gifts below.");

			//Open modal and display results
			$("#giftModal").modal('toggle');
			displayGift(results);
		}
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

function displayGift(results){
	var highMatch = 0;
	var popular = 0;

	//Find the highest value and most popular items
	for(var i = 0; i < results.length; i++){
		if(results[i].avgVal > highMatch){
			highMatch = results[i].avgVal;
		}
		if(results[i].matches > popular){
			popular = results[i].matches;
		}
	}

	//Clear carousel
	$("#carousel-indicators").html("");
	$("#carousel-items").html("");

	//Add data into carousel
	for(var i = 0; i < results.length; i++){
		$("#carousel-indicators").append("<li data-target='#giftCarousel' data-slide-to='"+results[i]+((i == 0) ? "' class='active'></li>" : "'></li>"));
		$("#carousel-items").append("<div class='carousel-item"+((i == 0) ? " active'>" : "'>")+
            "<img class='d-block w-100' src='./assets/img/placeholder"+i+".jpeg' alt='"+results[i].gift+"'>"+
            "<div class='carousel-caption d-none d-md-block'>"+
            "<h5>"+results[i].gift+"</h5>"+
            ((results[i].avgVal == highMatch) ? 
            "<p>Average match score of "+results[i].avgVal+". Best Match!</p>":
            "<p>Average match score of "+results[i].avgVal+".</p>")+
            ((results[i].matches == popular) ?
            "<p>Matched "+results[i].matches+" times. Most Popular!</p>":
            "<p>Matched "+results[i].matches+" times.</p>")+
            "</div>"+
        "</div>");
	}
}

function validation(){
	var failure = 0;
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