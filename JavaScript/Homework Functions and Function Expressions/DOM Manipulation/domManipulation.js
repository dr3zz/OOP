var domModule = function () {

    function appendChild() {
        document.querySelector(arguments[1]).appendChild(arguments[0]);
    }

    function removeChild() {
        var from = document.querySelector(arguments[0]);
        var removeElement = from.querySelector(arguments[1]);
        from.removeChild(removeElement);
    }

    function addHandler() {
        var elements = document.querySelectorAll(arguments[0]);
        for (var i = 0; i < elements.length; i++) {
            elements[i].addEventListener(arguments[1], arguments[2]);
        }
    }

    function retrieveElements() {
        return document.querySelectorAll(arguments[0]);
    }

    return {
        appendChild: appendChild,
        removeChild: removeChild,
        addHandler: addHandler,
        retrieveElements: retrieveElements

    }
}();

var liElement = document.createElement("li");
domModule.appendChild(liElement, ".birds-list");
domModule.removeChild("ul.birds-list", "li:first-child");
domModule.addHandler("li.bird", 'click', function () { alert("I'm a bird!") });
var elements = domModule.retrieveElements(".bird");
console.log(elements);
