// Interface with restful doom

new (function() {
    var ext = this;

    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.move_forward = function(callback) {
        console.log("Moving forward");
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "http://localhost:6001/api/player/actions", true); 
	xmlHttp.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({"type": "forward"});
	xmlHttp.send(data);
        callback();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'move forward', 'move_forward'],
        ]
    };

    // Register the extension
    ScratchExtensions.register('restful-doom interface', descriptor, ext);
})();
