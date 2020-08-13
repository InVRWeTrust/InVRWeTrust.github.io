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
function addContents(div, contents, index) {
  console.log(div, contents, index);
  console.log( index + ": " + $( contents[index] ).text() );
  $(div).removeClass('placeholder');
  $(div).html(contents[index]);
}
function delContents(div, targets, index) {
  console.log( "del " + index );
  var html = '';
  switch(targets) {
  case "soundcloud":
    html += '<div class="link">'
    html += '<p>'
    html += '<b><a href="https://soundcloud.com/invrwetrust/baruch-gottlieb">Baruch Gottlieb in conversation with Clemens Schöll &rarr;</a></b>'
    html += '</p>'
    html += '</div>'
    html += '<div class="sliders">'
    html += '<p>'
    html += '<span class="slider-desc md-sliderDesc sd-nop"></span> <b>Soundcloud</b>. <span class="slider-desc md-privacyLink sd-nop"></span>'
    html += '</p>'
    html += '<p>'
    html += '<label class="switch"><input data-slider="soundcloud" onclick="toggleContents(this);" type="checkbox"><span class="slider soundcloud"></span></label>'
    html += '</p>'
    html += '</div>'
    break;
  case "vimeo":
    html += '<div class="sliders">'
    html += '<p>'
    html += '<span class="slider-desc md-sliderDesc sd-nop"></span> <b>Vimeo</b>. <span class="slider-desc md-privacyLink sd-nop"></span>'
    html += '</p>'
    html += '<p>'
    html += '<label class="switch"><input data-slider="vimeo" onclick="toggleContents(this);" type="checkbox"><span class="slider vimeo"></span></label>'
    html += '</p>'
    html += '</div>'
    break;
  default:
    break;
  }
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
      addContents(this, contents, index);
    } else {
      delContents(this, targets, index);
    }
  });
}
