function iOS() {
  return [
    'iPad Simulator',
    'iPhone Simulator',
    'iPod Simulator',
    'iPad',
    'iPhone',
    'iPod'
  ].includes(navigator.platform)
  // iPad on iOS 13 detection
  || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
}
let isIOS = /iPad|iPhone|iPod/.test(navigator.platform)
|| (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)

//if (iOS()) {
if (isIOS == 1) {
  console.log('iOS detected');
  $('head').append('<link rel="stylesheet" type="text/css" href="./css/iOS.css">');
}

var text = '';
for(var i=0; i<200; i++) {
  text += 'in <span class="emph">VR</span> we <span class="emph">trust</span> ';
}
$('#prop').html(text);

function fillBack() {
  var viewHeight = document.getElementById("container").scrollHeight;
  console.log(viewHeight);
  viewHeight = Math.ceil(viewHeight * 1.3);
  $("#prop").css("height", viewHeight);
  console.log(viewHeight);
}
fillBack();

$(window).resize(function(){
  fillBack();
});

//var height = $('#container').height();
//console.log(height);
//$("#static1").offset({top: height, left: 0 });
