function saveTrust(button){
  var type = $( button ).data('slider');
  var box = $( button ).parent().closest('.consent');
  var ID = $(box).attr('id');
  var input = $(box).find("input");
  var value = $(input).is(":checked");
  localStorage.setItem(type, value);
  setSaveSlider(true);
  saveConsent(true);
  hideConsent('#' + ID);
}

function setSaveSlider(choice) {
  var saveSlider = $('#dataConsent').find('[data-slider="save"]')[0];
  $(saveSlider).prop('checked', choice);
}

function readSavedConsent() {
  var saved = false;
  var savedValue = localStorage.getItem("save");
  if (savedValue == "true") {
    saved = true;
  }
  if (saved) {
    setSaveSlider(saved);
    options.forEach(function(item, index, array) {

      if (item == "lang") {
        return;
      }

      if (localStorage.getItem(item) !== null) {
        var box = $('[data-slider="' + item + '"]').closest('.consent');
        var ID = $(box).attr('id');
        hideConsent('#' + ID);
      }

      var value = false;
      var choice = false;
      value = localStorage.getItem(item);
      if (item == "save") {
        hideConsent('#dataConsent');
        return;
      }
      if (value === "true") {
        choice = true;
      }
      toggleContents(false, item, choice);
    });
  } else {
    options.forEach(function(item, index, array) {
      toggleContents(false, item, false);
    });
  }
}

function allAndClose(button) {
  var turnOn = privacyOptions;
  turnOn.push("save");
  turnOn.forEach(function(item, index, array) {
    toggleContents(false, item, true);
  });
  toggleContents(button);
}

function saveConsent(choice, clear) {
  if (choice) {
    var choices = privacyOptions;
    choices.push("save");
    choices.push("lang");
    choices.forEach(function(item, index, array) {
      var value;
      if (item == "lang") {
        value = lang;
      } else {
        var slider = $('[data-slider=' + item + ']')[0];
        value = $(slider).is(":checked");
      }
      localStorage.setItem(item, value);
    });
  } else {
    if (clear) {
      options.forEach(function(item, index, array) {
        localStorage.removeItem(item);
      });
    }
  }
  setSaveSlider(choice);
}
function addContents(div, targets, index) {
  var html = '';
  // use helper function to determine content type
  var contents = chooseContents(targets).contents;
  switch(targets) {
  case "soundcloud":
    var url = contents[index].url;
    $.get(
      // construct url that returns info needed for the embed
      'https://soundcloud.com/oembed?format=json&url=' + url,
      function (result) {
        // we need the id, but it's not its own json key
        var id = result.html.match("tracks%2F(.*)\u0026show_artwork")[1];
        // construct the embed iframe
        html += '<iframe width="100%" height="166" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'
        html += id
        html += '&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"></iframe>'
        // put into DOM
        placeholderReplace(div, html);
      }
    );
  break;
  case "vimeo":
    // id is part of url
    var id = contents[index].url.match("vimeo.com/([0-9]+)")[1];
    html += '<div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/'
    html += id
    html += '?color=25afe0&title=0&byline=0&portrait=0&texttrack='
    if ( lang != 'de' ) {
      html += lang
    }
    html += '" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
    // put into DOM
    placeholderReplace(div, html);
    break;
  case "youtube":
    // id is part of url
    var url = contents[index].url;
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var id = url.match(regExp)[7];
    html += '<div class="yt-container"><iframe src="https://www.youtube-nocookie.com/embed/'
    html += id
    html += '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
    // put into DOM
    placeholderReplace(div, html);
    break;
  default:
    break;
  }
}
function placeholderReplace(div, html) {
  $(div).removeClass('placeholder');
  $(div).html(html);
}

function delContents(div, type, index) {
  // use helper function to determine content type
  var content = chooseContents(type);
  var url = content.contents[index].url;
  var title = content.contents[index].title;
  var html = constructPlaceholder(content.targets, url, title);
  $(div).html(html);
  $(div).addClass('placeholder');
  if (typeof sd === "function") {
    sd('sliderDesc',['privacyLink'])
  }
}
function constructPlaceholder(targets, url, title) {
  var html = '';
  if (targets == 'vimeo' || targets == 'youtube')  {
    html += '<div style="height:0;padding:56.25% 0 0 0;position:relative;"><div class="video-window" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;overflow:hidden;">'
  }
  html += '<div class="link">'
  html += '<p>'
  html += '<b><a href="' + url + '">' + title + ' &rarr;</a></b>'
  html += '</p>'
  html += '</div>'
  html += '<div class="sliders">'
  html += '<p>'
  html += '<label class="switch"><input data-slider="'
  html += targets
  html += '" onclick="toggleContents(this);" type="checkbox"><span class="slider '
  html += targets
  html += '"></span></label>'
  html += '<span class="slider-desc md-sliderdesc sd-nop"></span> <b>'
  // uppercase first letter
  html += targets.charAt(0).toUpperCase() + targets.slice(1);
  html += '</b>. <span class="slider-desc md-privacylink sd-nop"></span>'
  html += '</p>'
  html += '</div>'
  html += '<span class="placeholder-fill">'
  for(var i=0; i<1000; i++) {
    html += '�'
  }
  html += '</span>'
  if (targets == 'vimeo' || targets == 'youtube') {
    html += '</div></div>'
  }
  return html;
}

function chooseContents(type) {
  var content = {contents:[], targets:"" };
  content.targets = type;
  switch(type) {
  case "soundcloud":
    content.contents = sounds;
    break;
  case "vimeo":
    content.contents = vimeos;
    break;
  case "youtube":
    content.contents = youtubes;
    break;
  case "next":
    content.contents = 'next';
    break;
  case "save":
    content.contents = 'save';
    break;
  default:
    content.contents = null;
  }
  return content;
}

function hideConsent(element) {
  var id = '#' + $(element).closest('.consent').attr('id');
  $(id).hide("slow");
  if (id === "#dataConsent") {
    var ms = 2000;
    setTimeout(function(){
      var target = '#privacy-fold'
      $(id).insertAfter(target);
      $(id).addClass("fold");
      $(id).removeClass("window");
      var nextBtn = $(id).find('[data-slider="next"]')[0];
      $(nextBtn).hide();
      $(".consent-reminder").hide();
      $(".md-allbtn").hide();
      $(id).show("slow", function() {
        fillBack();
      });
    }, ms);
  }
}

function toggleContents(slider, type, choice) {
  var content,
      targets,
      contents;
  if (slider !== false) {
    type = $(slider).data("slider");
    choice = $(slider).is(":checked");
    if ( $.inArray(type, privacyOptions) !== -1 ) {
      // reset save state after togglings
      saveConsent(false, false);
    }
  }

  if (choice) {
    $('[data-slider="' + type + '"]').prop( "checked", true );
    content = chooseContents(type);
    targets = content.targets;
    contents = content.contents;
  } else {
    targets = type;
    $('[data-slider="' + type + '"]').prop( "checked", false );
  }

  if (targets === 'next') {
    hideConsent('#dataConsent', "slow");
    // it's a button, we don't need the following slider logic
    return;
  }
  if (targets === 'save') {
    saveConsent(choice, true);
    // There is only one save slider in privacy.
    // We will handle it in the function above.
    return;
  }
  // cycle through all divs with class "target".
  // Set their sliders and poulate wach with content from array "contents[]".
  $('div.' + targets).each(function( index ) {
    if (choice) {
      addContents(this, targets, index);
      resizeFunctions();
    } else {
      delContents(this, targets, index);
      resizeFunctions();
    }
  });
}
