function isIOS() {
  if (/iPad|iPhone|iPod/.test(navigator.platform)) {
    return true;
  } else {
    return navigator.maxTouchPoints &&
      navigator.maxTouchPoints > 2 &&
      /MacIntel/.test(navigator.platform);
  }
}
function isIpadPro() {
    var ratio = window.devicePixelRatio || 1;
    var screen = {
        width : window.screen.width * ratio,
        height : window.screen.height * ratio
    };
    return (screen.width === 2048 && screen.height === 2732) || (screen.width === 2732 && screen.height === 2048) || (screen.width === 1536 && screen.height === 2048) || (screen.width === 2048 && screen.height === 1536);
}

var ios = false;
ios = isIpadPro();
if (ios) {
  ios = true;
} else {
  ios = isIOS();
}
//ios = true;
if (ios) {
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
  //console.log('fillBack: ' + viewHeight);
  if (ios) {
    viewHeight = Math.ceil(viewHeight * 0.95);
  } else {
    viewHeight = Math.ceil(viewHeight / 3.4);
  }
  $("#prop").css("height", viewHeight);
  //console.log('fillBack conv: ' + ios + ' ' + viewHeight);
}

$( document ).ready(function() {
  fillBack();
});

$('#container').resize(function(){
  fillBack();
});

//var height = $('#container').height();
//console.log(height);
//$("#static1").offset({top: height, left: 0 });
