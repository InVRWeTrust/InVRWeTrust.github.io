var windowHeight = $(window).height();
//console.log("windowHeight: " + windowHeight);
var backToTop = $('#tocontact');
//var openCall = $('#static1');
//var tolerance = Math.ceil( $(openCall).height() * 10 );
//console.log("windowHeight tol: " + tolerance)
//var position = $(openCall).css("position");
//var top = $(openCall).css("top");
//var left = $(openCall).css("left");
//var margin = $(openCall).css("margin");


function scrollCheck() {
  var scroll = $('#container').scrollTop();
  //scroll = scroll + tolerance;
  if (scroll > windowHeight) {
    //console.log("scrolled past windowHeight");
    //$(openCall).appendTo("body");
    //$(openCall).css("position", "fixed");
    //$(openCall).css("top", "2ex");
    //$(openCall).css("left", "3em");
    //$(openCall).css("margin", "0");
    $(backToTop).show();
  } else {
    //$(openCall).insertAfter("#static2");
    //$(openCall).css("position", position);
    //$(openCall).css("top", top);
    //$(openCall).css("left", left);
    //$(openCall).css("margin", margin);
    $(backToTop).hide();
  }
}

$('#container').scroll(function (event) {
  scrollCheck();
});

scrollCheck();

