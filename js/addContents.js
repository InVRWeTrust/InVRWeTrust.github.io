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
  var text = '';
  for(var i=0; i<1000; i++) {
    text += '�'
  }
  $(div).html(text);
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
  console.log(targets + ': ' + choice)
  $('div.' + targets).each(function( index ) {
    if (choice) {
      console.log(targets + ' checked');
      addContents(this, contents, index);
    } else {
      console.log(targets + ' unchecked');
      delContents(this, targets, index);
    }
  });
}

toggleContents(false, "soundcloud", false);
toggleContents(false, "vimeo", false);
