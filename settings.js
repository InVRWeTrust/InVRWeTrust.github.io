var langs = ["en", "de"];

var texts = {
  'backToTop': [],
  'toContact': [],
  'consentInfo': ['policiesSoundcloud','policiesVimeo','policiesYoutube','privacyLink'],
  'sliderDesc': [],
  'saveDesc': [],
  'saveBtn': [],
  'trustQ': [],
  'yes': [],
  'no': [],
  'allBtn': [],
  'saveAndClose': [],
  'consentReminder': [],
  'intro': [],
  'interviewFarina': [],
  'interviewBroeckmann': [],
  'subscribe-fold': [],
  'co-curation': [],
  'impressum-fold': ['impressumAddress'],
  'privacy-fold': [],
  'relativty': [],
  'interviewIvana': [],
  'interviewCreativePlacesText': [],
  'commentArchitectureText': [],
  'commentEmpathyMachine': [],
};

var sounds = [
  {
    'title': 'Baruch Gottlieb in conversation with Clemens Schöll',
    'url': 'https://soundcloud.com/invrwetrust/baruch-gottlieb'
  }
];
var vimeos = [
  {
    'title': '“Creative Places” 2020 - Projekt ‘DE TACHED’',
    'url': 'https://vimeo.com/462674377'
  }
];
var youtubes = [
  {
    'title': 'VR Meeting Rooms - MeetinVR',
    'url': 'https://www.youtube.com/watch?v=UfCG3KWmh2Y'
  }
];

var questions = [
  {
    'id': 'dataConsent',
    'insertAfter': '#toContact',
    'template':
      '<div id="consentInfo" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
        <span class="slider-desc md-sliderDesc"></span> \n \
        </p> \n \
        <p>'
        + sliderConstructor('soundcloud', 'Soundcloud')
        + sliderConstructor('vimeo', 'Vimeo')
        + sliderConstructor('youtube', 'YouTube') +
        '</p> \n \
        <p> \n \
        <span id="saveDesc"></span><span id="consentReminder" class="consent-reminder"></span> \n \
        </p> \n \
        <p> \n \
        <label class="switch"><input data-slider="save" onclick="toggleContents(this);" type="checkbox"><span class="slider"></span></label> \n \
        <span class="md-saveBtn slider-label"></span> \n \
        <button class="md-allBtn" data-slider="next" onclick="allAndClose(this);"></button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'trust-q',
    'insertAfter': '#toContact',
    'template':
      '<div id="trustQ" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
        <span id="no" class="slider-label"></span>'
        + sliderConstructor('youtube', 'YouTube') +
        '<p> \n \
          <button class="md-saveAndClose" data-slider="yes" onclick=saveTrust()>&#10005;</button> \n \
        </p> \n \
      </div>'
  }
];

var bgText = [
  'in <span class="emph">VR</span> we <span class="emph">trust</span>',
  'we <span class="emph">trust</span> in <span class="emph">VR</span>',
  'we <span class="emph">trusted</span> in <span class="emph">VR</span>',
  'we <span class="emph">will trust</span> in <span class="emph">VR</span>',
  '<span class="emph">can</span> we <span class="emph">trust</span> in <span class="emph">VR</span>?'
];
var bgRepeats = 100;
