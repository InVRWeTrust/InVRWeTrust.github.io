$( document ).ready(function() {
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
  $(target).click(function(){
    toggleFold(foldStartId);
  });
  toggleFold(foldStartId);
}

function scrollTo() {
  var anc = window.location.hash;
  console.log(anc);
  var target = anc + '-fold'

  if ( !$(target).length ) {
    // dont scroll if there is no real target
    console.log('no valid scroll target')
    return;
  }

  setTimeout(function(){
    $(function(){
        $('#container').animate({
            scrollTop: $(target).offset().top
        }, 2000);
        return false;
    });
  }, 1000);
  setTimeout(function(){
    $(target).trigger( "click" );
  }, 3000);
}

sd('./md/co-curation_en.md', '#ko-kuration-fold', true);
scrollTo();
});
