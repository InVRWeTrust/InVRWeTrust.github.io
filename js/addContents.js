function addContents(div, contents, index) {
  console.log( index + ": " + $( contents[index] ).text() );
  $(div).removeClass('placeholder');
  $(div).html(contents[index]);
}
function delContents(div, targets, index) {
  console.log( "del " + index );
  var html = '';
  html += '<div class="sliders">'
  switch(targets) {
  case "soundcloud":
    html += '<p>'
    html += 'Soundcloud <a href="https://soundcloud.com/pages/cookies">Cookie Policy &rarr;</a>, <a href="https://soundcloud.com/pages/privacy">Privacy Policy &rarr;</a>';
    html += '</p>'
    html += '<p>'
    html += '<span class="slider-desc">Click to enable/disable contents from <b>soundcloud</b></span>'
    html += '<label class="switch"><input data-slider="soundcloud" onclick="toggleContents(this);" type="checkbox"><span class="slider soundcloud"></span></label>'
    html += '</p>'
    break;
  case "vimeo":
    html += '<p>'
    html += 'Vimeo <a href="https://vimeo.com/cookie_policy">Cookie Policy &rarr;</a>, <a href="https://vimeo.com/privacy">Privacy Policy &rarr;</a>.'
    html += '</p>'
    html += '<p>'
    html += '<span class="slider-desc">Click to enable/disable contents from <b>vimeo</b></span>'
    html += '<label class="switch"><input data-slider="vimeo" onclick="toggleContents(this);" type="checkbox"><span class="slider vimeo"></span></label>'
    html += '</p>'
    break;
  default:
    break;
  }
  html += '</div>'
  html += '<span class="placeholder-fill">'
  for(var i=0; i<1000; i++) {
    html += '�'
  }
  $(div).html(html);
  $(div).addClass('placeholder');
}

function chooseContents(type) {
  console.log(type)
  var content = {contents:[], targets:"" };
  content.targets = type;
  switch(type) {
  case "soundcloud":
    content.contents = sounds;
    break;
  case "vimeo":
    content.contents = vimeos;
    break;
  default:
    content.contents = null;
  }
  return content;
}

function hideConsent() {
  if (ios) {
    $('#dataConsent').hide();
  } else {
    $('#dataConsent').css({"transform": "translateY(150vh)"});
    setTimeout(function(){
      $('#dataConsent').hide();
    }, 1000);
  }
}
function saveConsent() {
  console.log('save consents');
  var nextInfo = '<p class="trust-q"><b>Do <span class="emph">You</span> Trust <span class="emph">In</span> VR?</b></p>'
  $("#consentInfo").html(nextInfo);
  var nextSliders = '<p class="trust-btn"><button class="btn-yes" onclick="hideConsent(true);">Yes</button>'
  nextSliders += '<button class="btn-no" onclick="hideConsent(false);">No</button></p>'
  $("#consentSliders").html(nextSliders);
}

function toggleContents(slider, type, choice) {
  if (slider !== false) {
    type = $(slider).data("slider");
    choice = $(slider).is(":checked");
  }
  content = chooseContents(type);
  targets = content.targets;
  contents = content.contents;

  // is this the save routine?
  if (contents === null) {
    saveConsent();
    return;
  }
  console.log(targets + ': ' + choice)
  $('div.' + targets).each(function( index ) {
    if (choice) {
      console.log(targets + ' checked');
      $('[data-slider="' + targets + '"]').prop( "checked", true );
      addContents(this, contents, index);
    } else {
      console.log(targets + ' unchecked');
      $('[data-slider="' + targets + '"]').prop( "checked", false );
      delContents(this, targets, index);
    }
  });
}
