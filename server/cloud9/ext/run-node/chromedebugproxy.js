/**
 * @copyright 2010, Ajax.org Services B.V.
 * @license GPLv3 <http://www.gnu.org/licenses/gpl.txt>
 */

var net = require("net");
var sys = require("util");
var NodeSocket = require("lib-v8debug/lib/v8debug/NodeSocket");
var ChromeDebugMessageStream = require("lib-v8debug/lib/v8debug/ChromeDebugMessageStream");
var DevToolsMessage = require("lib-v8debug/lib/v8debug/DevToolsMessage");


var DebugProxy = module.exports = function(port) {
    process.EventEmitter.call(this);
    var _self = this;

    this.connected = false;

    var socket = new NodeSocket("127.0.0.1", port);
    socket.on("end", function() {
        this.connected = false;
        _self.emit("end");
    });

    this.stream = new ChromeDebugMessageStream(socket);

    this.stream.addEventListener("connect", function(msg) {
        _self.connected = true;
        _self.emit("connection");
    });

    this.stream.addEventListener("message", function(msg) {
        _self.emit("message", msg.data.getContent());
    });
};

sys.inherits(DebugProxy, process.EventEmitter);

(function() {

    this.connect = function() {
        this.stream.connect();
    };

    this.send = function(msgJson) {
        this.service.sendRequest(DevToolsMessage.fromString(JSON.stringify(msgJson)));
    };

}).call(DebugProxy.prototype);