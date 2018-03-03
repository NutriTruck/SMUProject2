// $(function(){
//     $('.button-checkbox').each(function(){
    	
// 		var $widget = $(this),
// 			$button = $widget.find('button'),
// 			$checkbox = $widget.find('input:checkbox'),
// 			color = $button.data('color'),
// 			settings = {
// 					on: {
// 						icon: 'glyphicon glyphicon-check'
// 					},
// 					off: {
// 						icon: 'glyphicon glyphicon-unchecked'
// 					}
// 			};

// 		$button.on('click', function () {
// 			$checkbox.prop('checked', !$checkbox.is(':checked'));
// 			$checkbox.triggerHandler('change');
// 			updateDisplay();
// 		});

// 		$checkbox.on('change', function () {
// 			updateDisplay();
// 		});

// 		function updateDisplay() {
// 			var isChecked = $checkbox.is(':checked');
// 			// Set the button's state
// 			$button.data('state', (isChecked) ? "on" : "off");

// 			// Set the button's icon
// 			$button.find('.state-icon')
// 				.removeClass()
// 				.addClass('state-icon ' + settings[$button.data('state')].icon);

// 			// Update the button's color
// 			if (isChecked) {
// 				$button
// 					.removeClass('btn-default')
// 					.addClass('btn-' + color + ' active');
// 			}
// 			else
// 			{
// 				$button
// 					.removeClass('btn-' + color + ' active')
// 					.addClass('btn-default');
// 			}
// 		}
// 		function init() {
// 			updateDisplay();
// 			// Inject the icon if applicable
// 			if ($button.find('.state-icon').length == 0) {
// 				$button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
// 			}
// 		}
// 		init();
// 	});
// });

$(document).ready(function(){
	var email =""; 
	var password = "";

	$("#failed").hide();
	$("#signIn").on("click", function(event){
		event.preventDefault(); 
		if(".form-control" !== ""){
			var email = $("#password").val().trim();
			var password = $("#email").val().trim();
			console.log( email + password)
			if(email !== "" && password !== ""){
			window.location.href = "profile.html";
			}
			 
		}else{

			$("#failed").show();
		}

		$("#password").val(""); 
		$("#email").val("")

	});


function encrypt()
{
var password = $("#email").val().trim();
var hide=$('#hide').val();
if(password=="")
{
document.getElementById('err').innerHTML='Error:Password is missing';
return false;
}
else
{
document.getElementById("hide").value = document.getElementById("password").value;
var hash = CryptoJS.MD5(password);
document.getElementById('password').value=hash;
return true;
}
}
});





































