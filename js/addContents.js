var options = ["save", "lang", "soundcloud", "vimeo", "trust"];
readSavedConsent();

function saveTrust(){
  toggleContents('#trustInput');
  hideConsent(true);
  var value = $('#trustInput').is(":checked")
  console.log("added to storage:" + 'trust' + ": " + value);
  localStorage.setItem('trust', value);
  setSaveSlider(true);
}

function setSaveSlider(choice) {
  var saveSlider = $('#dataConsent').find('[data-slider="save"]')[0];
  $(saveSlider).prop('checked', choice);
}
function readSavedConsent() {
  var saved = false;
  var savedValue = localStorage.getItem("save");
  if (savedValue == "true" || localStorage.getItem("trust")) {
    saved = true;
  }
  if (localStorage.getItem("trust")) {
    hideConsent('#trust-q');
  }
  if (saved) {
    setSaveSlider(saved);
    options.forEach(function(item, index, array) {
      var value = false;
      var choice = false;
      value = localStorage.getItem(item);
      console.log("read from storage: " + item + ": " + value);
      if (item == "save") {
        hideConsent('#dataConsent');
        return;
      }
      if (item == "trust") {
        hideConsent('#trust-q');
      }
      if (item == "lang") {
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
  var turnOn = ['soundcloud', 'vimeo', 'save'];
  turnOn.forEach(function(item, index, array) {
    toggleContents(false, item, true);
  });
  toggleContents(button);
}

function saveConsent(choice, clear) {
  if (choice) {
    options.forEach(function(item, index, array) {
      var value;
      if (item == "lang") {
        value = lang;
      } else {
        var slider = $('#dataConsent').find('[data-slider=' + item + ']')[0];
        console.log(slider);
        value = $(slider).is(":checked");
      }
      console.log("added to storage:" + item + ": " + value);
      localStorage.setItem(item, value);
    });
  } else {
    if (clear) {
      options.forEach(function(item, index, array) {
        console.log("removed from storage: " + item);
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
    html += '<div style="padding:100% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/'
    html += id
    html += '?color=25afe0&title=0&byline=0&portrait=0" style="position:absolute;top:0;left:0;width:100%;height:100%;" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>'
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
  console.log( "del " + index );
  console.log(content);
  var url = content.contents[index].url;
  var title = content.contents[index].title;
  var html = constructPlaceholder(content.targets, url, title);
  html += '<span class="placeholder-fill">'
  for(var i=0; i<1000; i++) {
    html += '�'
  }
  $(div).html(html);
  $(div).addClass('placeholder');
  if (typeof sd === "function") {
    sd('sliderDesc',['privacyLink'])
  }
}
function constructPlaceholder(targets, url, title) {
  var html = '';
  html += '<div class="link">'
  html += '<p>'
  html += '<b><a href="' + url + '">' + title + ' &rarr;</a></b>'
  html += '</p>'
  html += '</div>'
  html += '<div class="sliders">'
  html += '<p>'
  html += '<span class="slider-desc md-sliderDesc sd-nop"></span> <b>'
  // uppercase first letter
  html += targets.charAt(0).toUpperCase() + targets.slice(1);
  html += '</b>. <span class="slider-desc md-privacyLink sd-nop"></span>'
  html += '</p>'
  html += '<p>'
  html += '<label class="switch"><input data-slider="'
  html += targets
  html += '" onclick="toggleContents(this);" type="checkbox"><span class="slider '
  html += targets
  html += '"></span></label>'
  html += '</p>'
  html += '</div>'
  return html;
}

function chooseContents(type) {
  console.log("type: " + type)
  var content = {contents:[], targets:"" };
  content.targets = type;
  switch(type) {
  case "soundcloud":
    content.contents = sounds;
    break;
  case "vimeo":
    content.contents = vimeos;
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

function hideConsent(id, option) {
  if (id === true) {
    id = '#trust-q';
    option = "slow";
  }
  $(id).hide(option);
  if (id === "#dataConsent") {
    var ms = 2000;
    option = "slow";
    setTimeout(function(){
      var target = '#privacy-fold'
      $(id).insertAfter(target);
      $(id).addClass("fold");
      $(id).removeClass("window");
      var nextBtn = $(id).find('[data-slider="next"]')[0];
      $(nextBtn).hide();
      $(".consent-reminder").hide();
      $(".md-allBtn").hide();
      $(id).show(option, function() {
        fillBack();
      });
    }, ms);
  }
}

function toggleContents(slider, type, choice) {
  console.log("slider given: " + slider);
  var content,
      targets,
      contents;
  if (slider !== false) {
    console.log("slider was given")
    type = $(slider).data("slider");
    choice = $(slider).is(":checked");
    if (type !== "next" && type !== "save" && type !=="trust") {
      // reset save state after togglings
      saveConsent(false, false);
    }
  }

  console.log(type + " choice: " + choice);
  if (choice) {
    console.log(type + ": entered choice == true routine");
    console.log(type + ' checked');
    $('[data-slider="' + type + '"]').prop( "checked", true );
    content = chooseContents(type);
    targets = content.targets;
    contents = content.contents;
  } else {
    targets = type;
    console.log(type + ' unchecked');
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
  console.log(targets + ': ' + choice)
  // cycle through all divs with class "target".
  // Set their sliders and poulate wach with content from array "contents[]".
  $('div.' + targets).each(function( index ) {
    if (choice) {
      addContents(this, targets, index);
    } else {
      delContents(this, targets, index);
    }
  });
}
