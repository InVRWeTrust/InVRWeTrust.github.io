function readSavedConsent() {
  var saved = localStorage.getItem("save");
  if (saved) {
    options.forEach(function(item, index, array) {
      if (item == "save") {
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
  var saveSlider = $('#dataConsent').find('[data-slider="save"]')[0];
  $(saveSlider).prop('checked', choice);
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

function hideConsent() {
  if (ios) {
    $('#dataConsent').hide();
  } else {
    $('#dataConsent').css({"transform": "translateY(150vh)"});
    setTimeout(function(){
      $('#dataConsent').hide();
    }, 1000);
  }
}
function nextConsent() {
  var nextInfo = '<p class="trust-q"><b>Do <span class="emph">You</span> Trust <span class="emph">In</span> VR?</b></p>'
  $("#consentInfo").html(nextInfo);
  var nextSliders = '<p class="trust-btn"><button class="btn-yes" onclick="hideConsent(true);">Yes</button>'
  nextSliders += '<button class="btn-no" onclick="hideConsent(false);">No</button></p>'
  $("#consentSliders").html(nextSliders);
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
    // reset save state after toggling
    saveConsent(false);
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
    nextConsent();
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
