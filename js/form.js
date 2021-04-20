function order() {
	$('#orderForm').on('submit',function(e){
		e.preventDefault();
		if ($('#ham3').is(':checked')) {
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
						$("div.md-orderok").css('visibility','visible');
						$("div.md-orderok").show("slow")
					});
				},
				error      : function(data) {
					$("#orderResponse").css('color','red');
					$("#orderResponse").empty().append(data.responseText).css('visibility','hidden');
				},
				complete   : function(data) {
					//console.log(data)
				//	$("#orderResponse").empty().append(data.responseText).css('visibility','visible');
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

	//$("#ham").empty();

	hamArray.forEach(function(item) {
		var input = '<input type="radio" name="ham" id="ham' + item + '">';
		var img = '<label for="ham' + item + '"><img class="ham" src="./graphics/ham/' + item + '.svg"></label>';
		$("#ham").append(input);
		$("#ham").append(img);
	});
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