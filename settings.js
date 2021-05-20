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
  'nav': [],
  'nav-fold': [],
  'opencall': [],
  'TheGrassSmellsSoSweet': [],
  'TheGrassSmellsSoSweetInterview': [],
  'Virtualshamanism': [],
  'VirtualshamanismInterview': [],
  'Gliese667Cc': [],
  'Gliese667CcInterview': [],
  'ChinesePavilion': [],
  'ChinesePavilionInterview': [],
  'order-fold': ['orderOK', 'orderError'],
  'toexhibition': [],
  'talks': [],
  'talk-augmenting-bodies': [],
  'talk-moving-in-space': [],
  'talk-crossing-sensations': [],
  'talk-a-matter-of-course': [],
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
      '<div id="consentinfo" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
        <span class="slider-desc md-sliderdesc"></span> \n \
        </p> \n \
        <p>'
        + sliderConstructor('soundcloud', 'soundcloud')
        + sliderConstructor('vimeo', 'vimeo')
        + sliderConstructor('youtube', 'youtube') +
        '</p> \n \
        <p> \n \
        <span id="savedesc"></span><span id="consentreminder" class="consent-reminder"></span> \n \
        </p> \n \
        <p> \n \
        <label class="switch"><input data-slider="save" onclick="toggleContents(this);" type="checkbox"><span class="slider"></span></label> \n \
        <span class="md-savebtn slider-label"></span> \n \
        <button class="md-allbtn" data-slider="next" onclick="allAndClose(this);"></button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'trust-q',
    'insertAfter': '#intro',
    'template':
      '<div id="trustq" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('trust', 'yes') +
        '</p> \n \
        <p> \n \
          <button class="md-saveandclose" data-slider="trust" onclick=saveTrust(this)>&#10005;</button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-1',
    'insertAfter': '#thegrasssmellssosweetinterview',
    'template':
      '<div id="q1" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q1', 'yes') +
        '</p> \n \
        <p> \n \
          <button class="md-saveandclose" data-slider="q1" onclick=saveTrust(this)>&#10005;</button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-2',
    'insertAfter': '#gliese667ccinterview',
    'template':
      '<div id="q2" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q2', 'yes') +
         '</p> \n \
        <p> \n \
          <button class="md-saveandclose" data-slider="q2" onclick=saveTrust(this)>&#10005;</button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-3',
    'insertAfter': '#interviewbanzbowinkel',
    'template':
      '<div id="q3" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q3', 'yes') +
        '</p> \n \
        <p> \n \
          <button class="md-saveandclose" data-slider="q3" onclick=saveTrust(this)>&#10005;</button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-4',
    'insertAfter': '#interviewcreativeplaces',
    'template':
      '<div id="q4" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q4', 'yes') +
        '</p> \n \
        <p> \n \
          <button class="md-saveandclose" data-slider="q4" onclick=saveTrust(this)>&#10005;</button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-5',
    'insertAfter': '#interviewgottlieb',
    'template':
      '<div id="q5" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q5', 'yes') +
        '</p> \n \
        <p> \n \
          <button class="md-saveandclose" data-slider="q5" onclick=saveTrust(this)>&#10005;</button> \n \
        </p> \n \
      </div>'
  },
  {
    'id': 'q-6',
    'insertAfter': '#interviewfarina',
    'template':
      '<div id="q6" class="consentInfo"></div> \n \
      <div class="consentSliders sliders"> \n \
        <p> \n \
          <span class="md-no slider-label"></span> \n'
          + sliderConstructor('q6', 'yes') +
        '</p> \n \
        <p> \n \
          <button class="md-saveandclose" data-slider="q6" onclick=saveTrust(this)>&#10005;</button> \n \
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
