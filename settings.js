var langs = ["en", "de"];

var options = ["save", "lang", "soundcloud", "vimeo", "youtube", "trust", "q1", "q2", "q3", "q4", "q5", "q6"];
var privacyOptions = ["soundcloud", "vimeo", "youtube"];

var texts = {
  'backToTop': [],
  'toContact': [],
  'consentInfo': ['policiesSoundcloud','policiesVimeo','policiesYoutube','privacyLink'],
  'sliderDesc': [],
  'saveDesc': [],
  'youtube': [],
  'vimeo': [],
  'soundcloud': [],
  'saveBtn': [],
  'trustQ': ['yes','no'],
  'Q1': ['yes','no'],
  'Q2': ['yes','no'],
  'Q3': ['yes','no'],
  'Q4': ['yes','no'],
  'Q5': ['yes','no'],
  'Q6': ['yes','no'],
  'allBtn': [],
  'saveAndClose': [],
  'consentReminder': [],
  'intro': [],
  'interviewFarina': [],
  'interviewBroeckmann': [],
  'subscribe-fold': [],
  'curatorialStatement': [],
  'interviewBanzBowinkel': [],
  'impressum-fold': ['impressumAddress'],
  'privacy-fold': [],
  'relativty': [],
  'interviewIvana': [],
  'interviewCreativePlacesText': [],
  'commentArchitectureText': [],
  'commentEmpathyMachine': [],
  'commentLowTech': [],
};

var sounds = [
  {
    'title': 'Baruch Gottlieb in conversation with Clemens Schöll',
    'url': 'https://soundcloud.com/invrwetrust/baruch-gottlieb'
  }
];
var vimeos = [
  {
    'title': 'Peggy Schoenegge im Gespräch mit Clemens Schöll',
    'url': 'https://vimeo.com/485914908'
  },
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
        + sliderConstructor('soundcloud', 'soundcloud')
        + sliderConstructor('vimeo', 'vimeo')
        + sliderConstructor('youtube', 'youtube') +
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
    'insertAfter': '#intro',
    'template':
      '<div id="trustQ" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('trust', 'yes') +
          '<p> \n \
            <button class="md-saveAndClose" data-slider="trust" onclick=saveTrust(this)>&#10005;</button> \n \
          </p> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-1',
    'insertAfter': '#relativty',
    'template':
      '<div id="Q1" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q1', 'yes') +
          '<p> \n \
            <button class="md-saveAndClose" data-slider="q1" onclick=saveTrust(this)>&#10005;</button> \n \
          </p> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-2',
    'insertAfter': '#interviewCreativePlaces',
    'template':
      '<div id="Q2" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q2', 'yes') +
          '<p> \n \
            <button class="md-saveAndClose" data-slider="q2" onclick=saveTrust(this)>&#10005;</button> \n \
          </p> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-3',
    'insertAfter': '#commentArchitecture',
    'template':
      '<div id="Q3" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q3', 'yes') +
          '<p> \n \
            <button class="md-saveAndClose" data-slider="q3" onclick=saveTrust(this)>&#10005;</button> \n \
          </p> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-4',
    'insertAfter': '#interviewGottlieb',
    'template':
      '<div id="Q4" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q4', 'yes') +
          '<p> \n \
            <button class="md-saveAndClose" data-slider="q4" onclick=saveTrust(this)>&#10005;</button> \n \
          </p> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-5',
    'insertAfter': '#interviewIvana',
    'template':
      '<div id="Q5" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q5', 'yes') +
          '<p> \n \
            <button class="md-saveAndClose" data-slider="q5" onclick=saveTrust(this)>&#10005;</button> \n \
          </p> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-6',
    'insertAfter': '#interviewBroeckmann',
    'template':
      '<div id="Q6" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q6', 'yes') +
          '<p> \n \
            <button class="md-saveAndClose" data-slider="q6" onclick=saveTrust(this)>&#10005;</button> \n \
          </p> \n \
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
