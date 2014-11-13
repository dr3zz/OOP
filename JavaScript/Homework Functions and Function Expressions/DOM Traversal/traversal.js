function traverse(node) {
    'use strict';
    var parent = document.querySelector(node);
    var children = parent.children;
    for (var i = 0; i < children.length; i++) {
        traverseElement(children[i], "");
    }
  
    function traverseElement(node, spacing) {
        
        var result = spacing + node.localName + ": ";
        if (node.hasAttribute("id")) {
            result += 'id="' + node.id + '" ';
        }
        if (node.hasAttribute("class")) {
            result += 'class="' + node.className + '"';
        }
        
        console.log(spacing + result);
        for (var j = 0; j < node.childNodes.length; j++) {
            var child = node.childNodes[j];
            if (child.nodeType === 1) {
                traverseElement(child, spacing + "  ");
            }
        }
    }
}

var selector = ".birds";
traverse(selector);

