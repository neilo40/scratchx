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

    var post_action = function(action_type) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("POST", "http://localhost:6001/api/player/actions", true); 
        xmlHttp.setRequestHeader("Content-type", "application/json");
        var data = JSON.stringify({"type": action_type});
        xmlHttp.send(data);
    }

    ext.move_forward = function(callback) {
        console.log("Moving forward");
        post_action("forward");
        callback();
    };

    ext.move_backward = function(callback) {
        console.log("Moving backward");
        post_action("backward");
        callback();
    };

    ext.turn_right = function(callback) {
        console.log("Turning right");
        post_action("turn-right");
        callback();
    };

    ext.turn_left = function(callback) {
        console.log("Turning left");
        post_action("turn-left");
        callback();
    };

    ext.shoot = function(callback) {
        console.log("Shooting");
        post_action("shoot");
        callback();
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'move forward', 'move_forward'],
            ['w', 'move backward', 'move_backward'],
            ['w', 'turn right', 'turn_right'],
            ['w', 'turn left', 'turn_left'],
            ['w', 'shoot', 'shoot']
        ]
    };

    // Register the extension
    ScratchExtensions.register('restful-doom interface', descriptor, ext);
})();
