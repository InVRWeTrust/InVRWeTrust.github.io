function qBox(id, location, template) {
  var html ='';
  html += '<div id="' + id.toLowerCase() + '" class="window consent">';
  html += '<button class="md-closebtn closeBtn" data-slider="next" onclick="hideConsent(this);">&#10005;</button>';

  html += template;

  html += '</div>';

  $( html ).insertAfter( location.toLowerCase() );
}

function sliderConstructor(type, label) {
  return '<label class="switch"><input data-slider="'
  + type
  + '" onclick="toggleContents(this);" type="checkbox"><span class="slider '
  + type
  + '"></span></label>'
  + '\n'
  + '<span class="md-' + label + ' slider-label"><b>'
  + label
  + '</b></span>'
  + '\n';
}