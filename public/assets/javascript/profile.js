$(document).ready(function(){
	$.get("/api/user_data").then(function(data){
		$("#username").html("Welcome, "+data.firstname+" "+data.lastname);

		$.get("/api/giftee/"+data.id, function(res){
			if(res.length == 0){
				$("#gifteesTable").html("<p>It looks like you haven't saved any requests yet!</p>");
			}else{
				for(var i = 0; i < res.length; i++){
					var date = new Date(res[i].createdAt);
					console.log(date);
					var dateStr = date.getMonth()+1 + "/" + date.getDate();

					$("#gifteesTable").append("<div style='padding: 10px'>"+
	    									  "<div style='display: inline-block; margin-right: 10px'>"+res[i].name+" on "+dateStr+"</div>"+ 
	    									  "<button style='margin: 10px' class='request btn btn-primary' data-id='"+res[i].id+"'>Request a gift</button>"+
	    									  "<button style='margin: 10px' class='delete btn btn-danger' data-id='"+res[i].id+"'>Delete</button>"+
	  										  "</div>");
				}
			}
		});
	});

	$(document).on("click", ".delete", function(evt){
		var id = $(this).data("id");
		$.ajax("/api/giftee/"+id, 
			{type: 'DELETE'}).then(function(){
				location.reload();
		});
	});

	$(document).on("click", ".request", function(evt){
		window.location.href = "request";
	});

});