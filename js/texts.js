var lang;
$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null) {
       return null;
    }
    return decodeURI(results[1]) || 0;
}

if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
} else {
  if ($.urlParam('lang')) {
    lang = $.urlParam('lang');
  } else {
    var userLang = navigator.language || navigator.userLanguage;
    lang = userLang.split('-')[0];
  }
}

// hide parameters
var url = window.location.href;
    url = url.split('?')[0];
window.history.replaceState({}, document.title, url);

$("html").attr("lang",lang);
// overwrite previous saved lang setting
$(document).on('click', 'a[href^="./?lang"]', function (event) {
  if (localStorage.getItem('lang')) {
    console.log('storage: newUrl: ' + this.href);
    var newLang = this.href.split('=')[1];
    console.log('storage: newLang: ' + newLang);
    localStorage.setItem('lang', newLang);
  }
});

function sd(target, dependents, initial) {
  var last;
  var fold = target.endsWith("-fold");
  if (!langs.includes(lang)) {
    lang = langs[0];
    console.log('lang: falling back to ' + lang);
  }
  var file = './md/' + lang + '/' + target + '.md?1';
  targetId = '#' + target;
  targetClass = '.md-' + target;
  if($(targetId).length) {
    target = targetId;
  // else we assume it's a class
  } else {
    if($(targetClass).length) {
      target = targetClass;
    } else {
      console.log('showdown: target ' + target + ' not found.');
      return;
    }
  }
  var converter = new showdown.Converter(),
      text      = '';
  //converter.setOption('noHeaderId', true);
  $.get(file, function (response) {
      text = response;
      var html      = converter.makeHtml(text);
      $(target).each(function( index ) {
        $(this).html(html);
      });
      if (fold) {
        setFold(target);
      };
      if(dependents) {
        dependents.forEach(function(item, index, array) {
          textsN++;
          sd(item, [], initial);
        });
      }
      textsI++;
      if (textsI >= textsN) {
        console.log("sd(): last text: " + textsN );
        $(".sd-nop").each(function( index ) {
          var cnt = $(this).find("p").contents();
          $(this).find("p").replaceWith(cnt);
        });
        if (initial) {
          parallaxResize();
          setTimeout(function(){
            scrollTo(window.location.hash, false);
          }, 500);
        }
        fillBack();
        intraLinks();
      }
  });
}

function uniqId() {
  return Math.round(new Date().getTime() + (Math.random() * 100));
}

function toggleFold(id) {
  $('#' + id).toggle("slow", function() {
    fillBack();
  });
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

function intraLinks() {
  $(document).on('click', 'a[href^="#"]', function (event) {
      event.preventDefault();
      scrollTo($.attr(this, 'href'), true);
  });
}

function tryFoldTarget(target) {
  console.log('scrollTo target obj: ' + JSON.stringify($(target)) );
    if ( target === '#top' || $(target).length ) {
      return target;
    } else {
      return target + '-fold';
    }
}

function scrollTo(anc, intra) {
  //console.log('scrollTo: ' + anc + ', ' + intra);
  var scrollTarget = 0;
  var toTop = false
  if (anc == "#top") {
    target = anc;
    toTop = true;
  } else {
    if (intra) {
      target = anc;
    } else {
      if ($(anc).length) {
        target = anc;
      } else {
        target = anc + '-fold';
      }
    }
  }

  //target = tryFoldTarget(target);
  //console.log('scrollTo target: ' + target);

  //console.log('scrollTo target obj: ' + JSON.stringify($(target)) );
  if ($(target).length) {
    $('#container').scrollTop(0);
    //console.log('scrollTo offset: ' + JSON.stringify($(target).offset()));
    scrollTarget = $(target).offset().top;
    var stickyHeight = $('#static1').height();
    if (ios) {
      var multiplier = 8;
    } else {
      var multiplier = 4;
    }
    scrollTarget = scrollTarget - stickyHeight * multiplier;

    if (!ios) {
      var scale = parseFloat($(target).css('transform').split(',')[5]);
      if (scale > 0) {
        scrollTarget = scrollTarget * scale;
      }
    }
    scrollToAct(target, scrollTarget);
  } else {
    if (toTop) {
      scrollTarget = 0;
      scrollToAct(null, scrollTarget);
    } else {
      console.log('scrollTo: no valid scroll target: ' + target)
      return;
    }
  }
}

function scrollToAct(target, scrollTarget) {
  var scrollTime = 2000;
  $('#container').animate({
      scrollTop: scrollTarget
  }, scrollTime);
  setTimeout(function(){
    var fold = $(target).find(".fold-start")[0];
    $(fold).show("slow");
    if (target == '#subscribe-fold') {
      $('#mce-EMAIL').focus().select();
    }
  }, scrollTime + 100);
}

var textsN = Object.keys(texts).length;
var textsI = 0;
$( document ).ready(function(){
  for (const prop in texts) {
    sd(prop, texts[prop], true);
  };
});
