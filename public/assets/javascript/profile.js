$(document).ready(function(){
	$.get("/api/user_data").then(function(data){
		$("#username").html("Hello "+data.firstname+" "+data.lastname);

		$.get("/api/giftee/"+data.id, function(res){
			if(res.length == 0){

			}else{
				for(var i = 0; i < res.length; i++){
					$("#gifteesTable").append("<tr>"+
	    									  "<td>"+res[i].name+"</td>"+ 
	    									  "<td><button class='request btn btn-primary' data-id='"+res[i].id+"'>Request a gift</button></td>"+
	    									  "<td><button class='delete btn btn-danger' data-id='"+res[i].id+"'>Delete</button></td>"+
	  										  "</tr>");
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

});