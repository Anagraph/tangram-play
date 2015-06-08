
//  Get the indentation level of a line
//
function getIndLevel(cm, nLine){
    return Math.floor( (cm.lineInfo(nLine).text.match(/\s/g) || []).length / cm.getOption("tabSize"));
}

//  Check if a line is empty
//
function isEmpty(cm, nLine){
    var chars = cm.lineInfo(nLine).text;
    if (chars.length > 0){
        if ((cm.lineInfo(nLine).text.match(/\w/g) || []).length > 0){
            return false;
        } else {
            return true;
        }
    } else {
        return true;
    }
}

//  Check if the line is commented YAML style 
//
function isCommented(cm, nLine){
    var regex = /^\s*[\#||\/\/]/gm;
    return (regex.exec(cm.lineInfo(nLine).text) || []).length > 0;
}

// Check if a line is commented
//
function getLineTag(cm, nLine){
    if (nLine >= 0){
        var regex = /^\s*(\w+):/gm;
        var tags = ( regex.exec(cm.lineInfo(nLine).text) || []);
        console.log(tags);
        if (tags.length > 0){
            return { 'line': nLine, 'name' : tags[1] };
        } else {
            return getLineTag(cm, nLine-1);
        }
    }  
}

//  Get Parent line according to indentation
//
function getParentLine(cm, nLine){
    var level = getIndLevel(cm,nLine);
    for (var i = nLine-1; i >= 0; i--){
        if ( !isEmpty(cm, i) && getIndLevel(cm,i) === level-1 ){
            return i;
        }
    }
    return nLine;
}

//  Get array of YAML tags parent tree of a particular line in inverse order 
//
function getInverseTags(cm, nLine){
    var tags = [];
    var line = nLine;
    var level = 1;
    while (level > 0){
        var tag = getLineTag(cm,line);

        // Prevent errors
        if (tag.name){
            tags.push(tag.name);
            level = getIndLevel(cm,tag.line);
            var parentLine = getParentLine(cm,tag.line);
            line = parentLine;
        } else {
            return tags;
        }
    }
    return tags;
}

// Get array of YAML tags parent tree of a particular line
//
function getTags(cm, nLine) {
    var invTags = getInverseTags(cm, nLine);
    var tags = [];
    for (var i = invTags.length-1; i >= 0; i--){
        tags.push(invTags[i]);
    }
    return tags;
}

// Get the YAML content a specific series of tags (array of strings)
//
function getYAMLContent(sceneConfig, tags){
    var tmp = sceneConfig[ tags[0] ];
    for (var i = 1; i < tags.length; i++){
        if (tmp[ tags[i] ]){
            tmp = tmp[ tags[i] ];
        } else {
            return tmp;
        }
    }
    return tmp;
}

// Make an folder style address from an array of tags
//
function tagsToAddress(tags){
    var address = "";
    for ( var i = 0; i < tags.length; i++){
        address += "/" + tags[i] ;
    }
    return address;
}

//  Function that check if a line is inside a Color Shader Block
//
function getColorBlockShader(cm, nLine) {
    var invTags = getInverseTags(cm, nLine)
    var address = tagsToAddress( invTags );

    // console.log(address); 
    // console.log(address.indexOf("/color/blocks/shaders/"));
    if (address.indexOf("/color/blocks/shaders/") === 0){
        var styleName = invTags[3];
        console.log(styleName);
        var style = scene.styles[styleName];
        if (style){
            return style["shaders"];
        } else {
            return {};
        }
    } else {
        return {};
    }
}

//  Is posible to fold
//
function isFolder(cm, nLine){
    if ( cm.lineInfo(nLine).gutterMarkers ){
        return cm.lineInfo(nLine).gutterMarkers['CodeMirror-foldgutter'] !== null;
    } else {
        return false;
    }
}

//  Jump to a specific line
//
function jumpToLine(cm, nLine) { 
    cm.scrollTo( null, cm.charCoords({line: nLine-1, ch: 0}, "local").top );
} 

//  Select a line or a range of lines
//
function selectLines(cm, rangeString ){
    var from, to;

    if ( isNumber(rangeString) ){
        from = parseInt(rangeString)-1;
        to = from; 
    } else {
        var lines = rangeString.split('-');
        from = parseInt(lines[0])-1;
        to = parseInt(lines[1])-1;
    }

    // If folding level is on un fold the lines selected
    if (querry['foldLevel']){
        foldAllBut(cm, from,to,querry['foldLevel']);
    }
    
    cm.setSelection({ line: from, ch:0},
                    { line: to, ch:cm.lineInfo(to).text.length } );
    jumpToLine(cm,from);
}

//  Select everything except for a range of lines
//
function foldAllBut(cm, From, To, querryLevel) {
    // default level is 0
    querryLevel = typeof querryLevel !== 'undefined' ? querryLevel : 0;

    // fold everything
    foldByLevel(cm, querryLevel);

    // get minimum indentation
    var minLevel = 10;
    var startOn = To;
    var onBlock = true;

    for (var i = From-1; i >= 0; i--) {

        var level = getIndLevel(cm, i);

        if (level === 0){
            break;
        }

        if (level < minLevel ){
            minLevel = level;
        } else if (onBlock) {
            startOn = i;
            onBlock = false;
        }
    }

    minLevel = 10;
    for (var i = To; i >= From; i--) {
        var level = getIndLevel(cm, i);
        var chars = cm.lineInfo(i).text.length;
        if (level < minLevel && chars > 0){
            minLevel = level;
        }
    }
    var opts = cm.state.foldGutter.options;

    for (var i = startOn; i >= 0; i--) {
        var level = getIndLevel(cm, i);

        if (level === 0 && cm.lineInfo(i).text.length > 0){
            break;
        }

        if ( level <= minLevel ){
            cm.foldCode({ line: i }, opts.rangeFinder, "fold");
        }
    }

    for (var i = To; i < cm.lineCount() ; i++) {
        if (getIndLevel(cm, i) >= querryLevel){
            cm.foldCode({ line: i }, opts.rangeFinder, "fold");
        }
    }
}

//  Unfold all lines
//
function unfoldAll(cm) {
    var opts = cm.state.foldGutter.options;
    for (var i = 0; i < cm.lineCount() ; i++) {
        cm.foldCode({ line: i }, opts.rangeFinder, "unfold");
    }
}

//  Fold all lines above a specific indentation level
//
function foldByLevel(cm, level) {  
    unfoldAll(cm);  
    var opts = cm.state.foldGutter.options;

    var actualLine = cm.getDoc().size-1;
    while ( actualLine >= 0) {
        if ( isFolder(cm, actualLine) ){
            if (getIndLevel(cm, actualLine) >= level){
                cm.foldCode({line:actualLine,ch:0}, opts.rangeFinder);
            }
        }
        actualLine--;
    }
};