var windowHeight = $(window).height();
console.log("windowHeight: " + windowHeight);
var tolerance = -100;
var openCall = $('#static1');
var position = $(openCall).css("position");
var top = $(openCall).css("top");
var left = $(openCall).css("left");
var margin = $(openCall).css("margin");
$('#container').scroll(function (event) {
    var scroll = $('#container').scrollTop();
    scroll = scroll - tolerance;
    if (scroll > windowHeight) {
      console.log("scrolled past windowHeight");
      $(openCall).appendTo("body");
      $(openCall).css("position", "fixed");
      $(openCall).css("top", "2ex");
      $(openCall).css("left", "3em");
      $(openCall).css("margin", "0");
    } else {
      $(openCall).insertAfter("#static2");
      $(openCall).css("position", position);
      $(openCall).css("top", top);
      $(openCall).css("left", left);
      $(openCall).css("margin", margin);
    }
});
