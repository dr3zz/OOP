var specialConsole = (function () {
    function writeLine() {
        var result = arguments[0];
        if (arguments.length > 1) {
            var args = Array.prototype.slice.call(arguments);
            var replacements = args.slice(1, args.length);
            for (var i = 0; i < replacements.length; i++) {
                var replace = "{" + i + "}";
                result = result.replace(replace, replacements[i]);
            }
        }
        console.log(result);
    }
    
    return {
        writeLine: writeLine,
        writeError: writeLine,
        writeWarning: writeLine
    }
    
})();
specialConsole.writeLine("Message: hello");
specialConsole.writeLine("Message: {0}", "hello");
specialConsole.writeError("Error: {0}", "A fatal error has occurred.");
specialConsole.writeWarning("Warning: {0}", "You are not allowed to do that!");
specialConsole.writeWarning("Warning: {0} {1} {2}", "You are not allowed to do that!", "warrning2", "warrning3");
