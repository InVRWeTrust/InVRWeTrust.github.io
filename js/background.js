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
for(var i=0; i<100; i++) {
  text += '<div class="prop-text">in <span class="emph">VR</span> we <span class="emph">trust</span></div>'
  text += '<div class="prop-text">we <span class="emph">trust</span> in <span class="emph">VR</span></div>'
  text += '<div class="prop-text">we <span class="emph">trusted</span> in <span class="emph">VR</span></div>'
  text += '<div class="prop-text">we <span class="emph">will trust</span> in <span class="emph">VR</span></div>'
  text += '<div class="prop-text"><span class="emph">can</span> we <span class="emph">trust</span> in <span class="emph">VR</span>?</div>'
}
$('#prop').html(text);

function fillBack() {
  var viewHeight = document.getElementById("container").scrollHeight;
  console.log(viewHeight);
  viewHeight = Math.ceil(viewHeight / 2);
  $("#prop").css("height", viewHeight);
  console.log(viewHeight);
}

$( document ).ready(function() {
  fillBack();
});

$(window).resize(function(){
  fillBack();
});

//var height = $('#container').height();
//console.log(height);
//$("#static1").offset({top: height, left: 0 });
