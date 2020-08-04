var options = ["save", "lang", "soundcloud", "vimeo", "trust"];

var sounds = [];

var vimeos = [];

var langs = ["en", "de"];

$( document ).ready(function() {

sd('backToTop', false);
sd('consentInfo', false, ['policiesSoundcloud','policiesVimeo']);
sd('sliderDesc', false);
sd('saveDesc', false);
sd('saveBtn', false);
sd('trustQ', false);
sd('yes', false);
sd('no', false);
sd('allBtn', false);
sd('saveAndClose', false);
sd('consentReminder', false);
sd('intro', false);
sd('interviewFarina', false);
sd('co-curation-fold', true);
sd('impressum-fold', true);
sd('privacy-fold', true);

////////////////////////////////////////////////////////
readSavedConsent();
scrollTo(window.location.hash, false);
intraLinks();
});
