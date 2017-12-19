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

    var get_action = function(endpoint, field, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == XMLHttpRequest.DONE) {
                if (field == "ammo"){
                    callback(JSON.parse(xmlHttp.response)["ammo"]["Bullets"]);
                } else {
                    callback(JSON.parse(xmlHttp.response)[field]);
                }
            }
        }
        xmlHttp.open("GET", "http://localhost:6001/api/" + endpoint, true); 
        xmlHttp.setRequestHeader("Content-type", "application/json");
        xmlHttp.send(null);
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

    ext.health = function(callback) {
        console.log("Getting health");
        get_action("player", "health", callback);
    };
 
    ext.ammo = function(callback) {
        console.log("Getting ammo");
        get_action("player", "ammo", callback);
    };
 
    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ['w', 'move forward', 'move_forward'],
            ['w', 'move backward', 'move_backward'],
            ['w', 'turn right', 'turn_right'],
            ['w', 'turn left', 'turn_left'],
            ['w', 'shoot', 'shoot'],
            ['R', 'player health', 'health'],
            ['R', 'player ammo', 'ammo']
        ]
    };

    // Register the extension
    ScratchExtensions.register('restful-doom interface', descriptor, ext);
})();
