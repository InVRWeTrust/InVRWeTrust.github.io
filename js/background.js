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
for(var i=0; i<bgRepeats; i++) {
  for (let phrase of bgText) {
    text += '<div class="prop-text">' + phrase + '</div>'
  }
}
$('#prop').html(text);

function fillBack() {
  var viewHeight = document.getElementById("container").scrollHeight;
  //console.log('fillBack: ' + viewHeight);
  if (ios) {
    viewHeight = viewHeight;
  } else {
    viewHeight = viewHeight * (1 / 3);
  }
  $("#prop").css("height", viewHeight);
  //console.log('fillBack conv: ' + ios + ' ' + viewHeight);
}

//var height = $('#container').height();
//console.log(height);
//$("#static1").offset({top: height, left: 0 });
