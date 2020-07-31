$( document ).ready(function() {
function sd(file, target) {
  var converter = new showdown.Converter(),
      text      = '';
  $.get(file, function (response) {
      text = response;
      var html      = converter.makeHtml(text);
      $(target).html(html);
      fillBack();
  });
}

sd('./md/co-curation_en.md', '#cocuration');
});
