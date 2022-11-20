preventLongPressMenu(document.getElementsByTagName('upBtn'));
preventLongPressMenu(document.getElementsByTagName('leftBtn'));
preventLongPressMenu(document.getElementsByTagName('rightBtn'));
preventLongPressMenu(document.getElementsByTagName('downBtn'));
preventLongPressMenu(document.getElementsByTagName('shootBtn'));

function preventLongPressMenu(nodes) {
    for(var i=0; i<nodes.length; i++){
        nodes[i].ontouchstart = absorbEvent_;
        nodes[i].ontouchmove = absorbEvent_;
        nodes[i].ontouchend = absorbEvent_;
        nodes[i].ontouchcancel = absorbEvent_;
    }
}