// PoC code for making an http request

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.send_http = function(callback) {
        console.log('Sending request');
        // Do http request
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", "http://localhost:6001/api/player", false); 
        callback();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'send http request', 'send_http'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('HTTP request PoC', descriptor, ext);
})();
