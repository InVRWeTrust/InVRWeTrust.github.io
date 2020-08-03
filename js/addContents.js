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
      if (item == "save") {
        hideConsent('#dataConsent');
        return;
      }
      var value = false;
      var choice = false;
      value = localStorage.getItem(item);
      console.log("read from storage: " + item + ": " + value);
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

function saveConsent(choice) {
  if (choice) {
    options.forEach(function(item, index, array) {
      var slider = $('#dataConsent').find('[data-slider=' + item + ']')[0];
      console.log(slider);
      var value = $(slider).is(":checked");
      console.log("added to storage:" + item + ": " + value);
      localStorage.setItem(item, value);
    });
  } else {
    options.forEach(function(item, index, array) {
      console.log("removed from storage: " + item);
      localStorage.removeItem(item);
    });
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
  html += '<div class="sliders">'
  switch(targets) {
  case "soundcloud":
    html += '<p>'
    html += 'Soundcloud <a href="https://soundcloud.com/pages/cookies">Cookie Policy &rarr;</a>, <a href="https://soundcloud.com/pages/privacy">Privacy Policy &rarr;</a>';
    html += '</p>'
    html += '<p>'
    html += '<label class="switch"><input data-slider="soundcloud" onclick="toggleContents(this);" type="checkbox"><span class="slider soundcloud"></span></label>'
    html += '<span class="slider-desc">Click to enable/disable contents from <b>soundcloud</b></span>'
    html += '</p>'
    break;
  case "vimeo":
    html += '<p>'
    html += 'Vimeo <a href="https://vimeo.com/cookie_policy">Cookie Policy &rarr;</a>, <a href="https://vimeo.com/privacy">Privacy Policy &rarr;</a>.'
    html += '</p>'
    html += '<p>'
    html += '<label class="switch"><input data-slider="vimeo" onclick="toggleContents(this);" type="checkbox"><span class="slider vimeo"></span></label>'
    html += '<span class="slider-desc">Click to enable/disable contents from <b>vimeo</b></span>'
    html += '</p>'
    break;
  default:
    break;
  }
  html += '</div>'
  html += '<span class="placeholder-fill">'
  for(var i=0; i<1000; i++) {
    html += '�'
  }
  $(div).html(html);
  $(div).addClass('placeholder');
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
    setTimeout(function(){
      $('#trust-q').show("slow");
      var target = '#privacy-fold'
      $(id).insertAfter(target);
      $(id).addClass("fold");
      $(id).removeClass("window");
      var nextBtn = $(id).find('[data-slider="next"]')[0];
      $(nextBtn).hide();
      $(".consent-reminder").hide();
      $(id).show("slow");
    }, 2000);
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
    if (type !== "next" && type !== "save") {
      // reset save state after toggling
      saveConsent(false);
    }
  }

  console.log(type + " choice: " + choice);
  if (choice) {
    console.log(type + ": entered choice == true routine");
    content = chooseContents(type);
    targets = content.targets;
    contents = content.contents;
  } else {
    targets = type;
  }

  if (targets === 'next') {
    hideConsent('#dataConsent', "slow");
    // it's a button, we don't need the following slider logic
    return;
  }
  if (targets === 'save') {
    saveConsent(choice);
    // There is only one save slider in privacy.
    // We will handle it in the function above.
    return;
  }
  console.log(targets + ': ' + choice)
  // cycle through all divs with class "target".
  // Set their sliders and poulate wach with content from array "contents[]".
  $('div.' + targets).each(function( index ) {
    if (choice) {
      console.log(targets + ' checked');
      $('[data-slider="' + targets + '"]').prop( "checked", true );
      addContents(this, contents, index);
    } else {
      console.log(targets + ' unchecked');
      $('[data-slider="' + targets + '"]').prop( "checked", false );
      delContents(this, targets, index);
    }
  });
}
