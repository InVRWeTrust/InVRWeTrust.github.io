var options = ["save", "soundcloud", "vimeo"];

var sounds = [];
sounds.push(
  '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/306467330&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe><div style="font-size: 10px; color: #cccccc;line-break: anywhere;word-break: normal;overflow: hidden;white-space: nowrap;text-overflow: ellipsis; font-family: Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif;font-weight: 100;"><a href="https://soundcloud.com/jackvfx" title="Jack" target="_blank" style="color: #cccccc; text-decoration: none;">Jack</a> · <a href="https://soundcloud.com/jackvfx/lil-peep-star-shopping" title="lil peep - star shopping (prod. kryptik)" target="_blank" style="color: #cccccc; text-decoration: none;">lil peep - star shopping (prod. kryptik)</a></div></div>'
)

var vimeos = [];
vimeos.push(
  '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/189317525?title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script><p><a href="https://vimeo.com/189317525">my lonesome hologram - a vr-installation</a> from <a href="https://vimeo.com/jithorse">daniel hengst / jitterhorse</a> on <a href="https://vimeo.com">Vimeo</a>.</p>'
)

$( document ).ready(function() {

sd('backToTop', false);
sd('consentInfo-1', false);
sd('co-curation-fold', true);
sd('impressum-fold', true);
sd('privacy-fold', true);

////////////////////////////////////////////////////////
readSavedConsent();
scrollTo(window.location.hash, false);
});
