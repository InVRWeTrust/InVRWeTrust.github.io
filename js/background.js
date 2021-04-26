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

//var iOS14 = 'iPhone OS 14';
//var iPadOS14 = 'Version/14';

var ios = false;
ios = isIpadPro();
if (ios) {
  ios = true;
} else {
  ios = isIOS();
}

//if (NavigatorID.userAgent.includes(iOS14) || NavigatorID.userAgent.includes(iPadOS14) ) {
//  ios = false;
//}
//ios = true;
if (ios) {
  $('head').append('<link rel="stylesheet" type="text/css" href="./css/iOS.css?4">');
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
  $("#prop").css("height", viewHeight);
  //console.log('fillBack conv: ' + ios + ' ' + viewHeight);
}

//var height = $('#container').height();
//console.log(height);
//$("#static1").offset({top: height, left: 0 });
