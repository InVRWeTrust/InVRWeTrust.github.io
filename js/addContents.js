var sounds = [];
sounds.push(
  '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/306467330&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/jackvfx" title="Jack" target="_blank" style="color: #cccccc; text-decoration: none;">Jack</a> · <a href="https://soundcloud.com/jackvfx/lil-peep-star-shopping" title="lil peep - star shopping (prod. kryptik)" target="_blank" style="color: #cccccc; text-decoration: none;">lil peep - star shopping (prod. kryptik)</a></div></div>'
)

var vimeos = [];
vimeos.push(
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/189317525?title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script><p><a href="https://vimeo.com/189317525">my lonesome hologram - a vr-installation</a> from <a href="https://vimeo.com/jithorse">daniel hengst / jitterhorse</a> on <a href="https://vimeo.com">Vimeo</a>.</p>'
)

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
    console.log('save consents');
    $('#dataConsent').css({"transform": "translateY(150vh)"});
    if (ios) {
      $('#dataConsent').hide();
    } else {
      setTimeout(function(){
        $('#dataConsent').hide();
      }, 1000);
    }
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

toggleContents(false, "soundcloud", false);
toggleContents(false, "vimeo", false);
