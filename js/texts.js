function sd(target, fold) {
  var lang = 'de';
  var file = './md/' + lang + '/' + target + '.md';
  target = '#' + target;
  var converter = new showdown.Converter(),
      text      = '';
  $.get(file, function (response) {
      text = response;
      var html      = converter.makeHtml(text);
      $(target).html(html);
      fillBack();
      if (fold) {
        setFold(target);
      };
  });
}

function uniqId() {
  return Math.round(new Date().getTime() + (Math.random() * 100));
}

function toggleFold(id) {
  $('#' + id).toggle("slow");
}
function setFold(target) {
  var title = $(target).find( "h2" )[0];
  var foldStartId = uniqId();
  var foldStart = '<div id="' + foldStartId + '"class="fold-start"></div>';
  $(target).children().wrapAll(foldStart);
  $(title).prependTo(target);
  $(title).click(function(){
    toggleFold(foldStartId);
  });
  toggleFold(foldStartId);
}

$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    scrollTo($.attr(this, 'href'));
});

function scrollTo(anc) {
  console.log(anc);
  var scrollTarget = 0;
  var toTop = false
  if (anc == "#top") {
    target = anc;
    toTop = true;
  } else {
    target = anc + '-fold';
  }

  if ($(target).length) {
    $('#container').animate({
        scrollTop: 0
    }, 0);
    scrollTarget = $(target).offset().top;
  } else {
    if (toTop) {
      scrollTarget = 0;
    } else {
    console.log('no valid scroll target')
    return;
    }
  }

  setTimeout(function(){
    $(function(){
        $('#container').animate({
            scrollTop: scrollTarget
        }, 2000);
        return false;
    });
  }, 1000);
  setTimeout(function(){
    var title = $(target).find("h2")[0];
    var fold = $(target).find(".fold-start")[0];
    $(fold).show("slow");
  }, 3000);
}
