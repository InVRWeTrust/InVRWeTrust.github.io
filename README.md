# InVRWeTrust.github.io

## Adding contents

### general content

There are 3 steps to adding general content:

1. Write the content:  
Create a file in [`./md/LANGUAGE/`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/tree/master/md) with the name of the content, e.g. 
[`CONTENT.md`](https://raw.githubusercontent.com/InVRWeTrust/InVRWeTrust.github.io/master/md/en/impressum-fold.md).  
The content can be markdown ([showdown.js flavor](https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax)),
HTML or a mix of both.  
It's also possible to embed another content (for example for repeating phrases)
by referencing it with a `span` element with a class consisting of that content,
prefixed with `md-`, e.g. [`<span class="md-policiesSoundcloud"></span>`](https://raw.githubusercontent.com/InVRWeTrust/InVRWeTrust.github.io/bc984c5fac98b2be7fcddd8101f1a060df76b46b/md/en/consentInfo.md).

2. Define its role in the template:  
[`./index.html`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/master/index.html) contains the template. Elements that should end up containing the
added content must either have the ID named after content or carry the name
prefixed with `md-` as a class, e.g. [`<div id="co-curation-fold"></div>`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/index.html#L84),
[`<button class="md-saveAndClose"</button>`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/index.html#L78).

3. Enable the content:  
The variable [`texts`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/settings.js#L3) in [`./settings.js`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/master/settings.js) is a JSON object
containing named arrays. Add a new array with the name of the content, e.g.
`CONTENT: []`. If you embedded other contents in that content, add their names
as an item to the array, e.g.
[`'consentInfo': ['policiesSoundcloud','policiesVimeo','privacyLink']`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/settings.js#L5).

### special content

#### embeds from other platforms

[`./settings.js`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/master/settings.js)
includes arrays for every supported platform (currently
[`sounds`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/settings.js#L24)
for Soundcloud and
[`vimeos`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/settings.js#L30)
for Vimeo).  
For every embed create one item in the corresponding array in form of JSON data.
The data should hold two name/value pairs, `title` and `url`,
[e.g.](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/settings.js#L24-L29):
```
var sounds = [
  {
    'title': 'Baruch Gottlieb in conversation with Clemens Schöll',
    'url': 'https://soundcloud.com/invrwetrust/baruch-gottlieb'
  }
]
```  
The title will be used as text for the link to the content.

For every embed item add a `div` element to [`./index.html`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/master/index.html) holding a class with the name of
the platform, e.g.
[`<div class="soundcloud"></div>`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/bc984c5fac98b2be7fcddd8101f1a060df76b46b/index.html#L87).  
The `div` elements will be filled with the embeds in order of appearance in the
arrays.

#### background text

This is set by an
[array](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/b628289a1de62f3d6b703ced83f7e8af2011ed21/settings.js#L34-L40)
in
[`./settings.js`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/master/settings.js).  
Each array item will be one line. The whole array of lines will be repeated as
many times as set with [`bgRepeats`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/b628289a1de62f3d6b703ced83f7e8af2011ed21/settings.js#L41). Set this to a high
number to make sure the background does not run out of lines. The scrollable
size of the page will be determined independent of this.


## Languages

[`langs`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/b628289a1de62f3d6b703ced83f7e8af2011ed21/settings.js#L1)
in
[`./settings.js`](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/master/settings.js)
is an array containing the supported languages in
[ISO 639-1 code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).  
The
[`span` element "langChange"](https://raw.githubusercontent.com/InVRWeTrust/InVRWeTrust.github.io/master/md/en/consentInfo.md)
should also contain all supported languages which for now need to be added
manually. A link to a language takes the form `./?lang=LANGUAGE`.  

The visitors can save their preferences as `localStorage` items, which will
include the language.  
On load the language will be
[determined in following order](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/master/js/texts.js):
1. Is the GET parameter `lang` set?
2. Is the `lang` item in `localStorage` set?
3. Does the browser set a preference in form of `navigator.language` or
`navigator.userLanguage`?
4. What is the first language in the
[`langs` array](https://github.com/InVRWeTrust/InVRWeTrust.github.io/blob/b628289a1de62f3d6b703ced83f7e8af2011ed21/settings.js#L1)?


## Hosting

Everything is client side and web server agnostic. Just throw into a web facing
directory.  
The `master` branch can be seen as a [GitHub page](https://InVRWeTrust.github.io)
for review. The branch `public` is meant to be picked up by the server serving
the public URL. So merge changes from `master` to `public` after review.
