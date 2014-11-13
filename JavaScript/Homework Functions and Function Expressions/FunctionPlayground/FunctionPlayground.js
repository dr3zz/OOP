function myFunction() {
    console.log(arguments.length);
    for (var i = 0; i < arguments.length; i++) {
        console.log(arguments[i] + " => " + typeof (arguments[i]));
    }
    console.log(this.globalScope);
}

myFunction('pesho', 1,3,4,"asen");

myFunction.call({ globalScope: 'functuion scope' }, 1234, "Goshoooo");
globalScope = 'global scope';
myFunction.apply(null, ["pesho", "tosko",123,444,3123.2]);
