function order() {
	$('#orderForm').on('submit',function(e){
		e.preventDefault();
		$('.orderMsgs').hide();
		if ($('#ham3').is(':checked')) {
			$('#orderSubmit').addClass('progress');
			var object = {};
			const formData = new FormData(e.target);
			var object = {};
			formData.forEach(function(value, key){
				if (key == "newsletter") {
					if (value == "on") {
						value = true
					} else {
						value = false
					}
				}
			    object[key] = value;
			});
			if (!object.hasOwnProperty("newsletter")) {
				object["newsletter"] = false
			}
			var json = JSON.stringify(object);
			response = $.ajax({
				type       : $(this).attr('method'),
				cache      : false,
				url        : $(this).attr('action'),
				data       : json,
				contentType: 'application/json',
				success    : function() {
					//$("#orderResponse").css('color','green');
					$("#orderForm").hide("slow", function() {
						$(".md-orderok").css('visibility','visible');
						$(".md-orderok").show("slow")
					});
				},
				error      : function(data) {
					$(".md-ordererror").css('visibility','visible');
					$(".md-ordererror").show("slow")
					$("#orderResponse").show("slow")
					$("#orderResponse").empty().append(' (' + data.status + ')').css('visibility','visible');
				},
				complete   : function(data) {
					//console.log(data)
					//$("#orderResponse").empty().append(data.responseText).css('visibility','visible');
					$('#orderSubmit').removeClass('progress');
				}
			});
			//console.log(response);
		} else {
			$("#ham").css('background-color','lightgray');
			setTimeout(function(){
				$("#ham").css('background-color','transparent');
			}, 1000);
		}
	});
}

function hamTest() {

	var hamArray = [1, 2, 3];

	hamArray = shuffle(hamArray);

	var hamTests = '<p id="ham-test">';

	hamArray.forEach(function(item) {
		var input = '<input type="radio" name="ham" id="ham' + item + '">';
		var img = '<label for="ham' + item + '"><img class="ham" src="./graphics/ham/' + item + '.svg"></label>';
		hamTests += input + img;
	});

	hamTests += '</p>';

	$("#ham").append(hamTests);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function foldFaq() {
	$( "#order-fold h3 + p" ).hide();
	$( "#order-fold h3 + p" ).nextAll().hide();

	$( "#order-fold h3" ).click(function() {
		$( "#order-fold h3 + p" ).toggle("slow");
		$( "#order-fold h3 + p" ).nextAll().toggle("slow");
	});
}