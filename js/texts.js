function sd(file, target, fold) {
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
  var target = anc + '-fold'

  if ( !$(target).length ) {
    // dont scroll if there is no real target
    console.log('no valid scroll target')
    return;
  }

  $('#container').animate({
      scrollTop: 0
  }, 0);

  setTimeout(function(){
    $(function(){
        $('#container').animate({
            scrollTop: $(target).offset().top
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
