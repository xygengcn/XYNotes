var Textarea_tab;
var tabStr = '\t';
function Tap(id) {
    Textarea_tab = document.querySelector('#EditArea');
    if (Textarea_tab.addEventListener) {
        Textarea_tab.addEventListener('keydown', keyHandler, false);
    } else if (Textarea_tab.attachEvent) {
        Textarea_tab.attachEvent('onkeydown', keyHandler); /* damn IE hack */
    }
}
function keyHandler(e) {
    var TABKEY = 9;
    if (e.keyCode == TABKEY) {
        insertText(Textarea_tab, tabStr);
        if (e.preventDefault) {
            e.preventDefault();
        }
    }
}
function insertText(obj, tabStr) {
    if (document.selection) {
        var sel = document.selection.createRange();
        sel.text = tabStr;
    } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
        var startPos = obj.selectionStart,
            endPos = obj.selectionEnd,
            cursorPos = startPos,
            tmpStr = obj.value;
        obj.value = tmpStr.substring(0, startPos) + tabStr + tmpStr.substring(endPos, tmpStr.length);
        cursorPos += tabStr.length;
        obj.selectionStart = obj.selectionEnd = cursorPos;
    } else {
        obj.value += tabStr;
    }
}
export default Tap