'use strict';

// Imports
const Utils = require('./core/common.js');
const Map = require('./core/map.js');
const Editor = require('./core/editor.js');
const UI = require('./core/ui.js');
const Widgets = require('./addons/widgets.js');
const SuggestedKeys = require('./addons/suggestedKeys.js');

// Get query string and parse it
const query = Utils.parseQuery(window.location.search.slice(1));
const flags = Utils.parseFeatureFlags(query);

if (flags['fullmenu'] === true) {
    document.querySelector('html').classList.add('full-menu');
}

if (Utils.isMobile() === true) {
    document.getElementById('mobile-message').style.display = 'block';
    document.getElementById('dismiss-mobile-message').addEventListener('click', function (e) {
        document.getElementById('mobile-message').style.display = 'none';
        reflowUI();
    });
}

// Initial style when it loads
const style = query['style'] ? query['style'] : 'data/styles/basic.yaml';

// Tangram Map
const map = Map.init(style);

// Editor
const editor = Editor.init(document.getElementById('editor'), style);

// Temp expose editor & map globally
window.editor = editor;
window.map = map;

// UI
UI.init(editor, map);

// Editor Widgets
Widgets.loadWidgets(editor, 'data/widgets.json');
SuggestedKeys.loadKeys(editor, 'data/keys.json');

// Once everything is loaded
setTimeout(function () {
    if (query['foldLevel']) {
        Editor.unfoldAll(editor);
        Editor.foldByLevel(editor, parseInt(query['foldLevel']));
    }
    if (query['lines']) {
        Editor.selectLines(editor, query['lines']);
    }

    Widgets.createWidgets(editor);
    //Widgets.updateWidgets(editor);
}, 500);