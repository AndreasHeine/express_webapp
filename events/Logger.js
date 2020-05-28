const EventEmitter = require("events");
const config = require("../config");

class Logger extends EventEmitter {
    log(msg) {
        console.log(msg);
        this.emit("logged", {msg: msg, timestamp: Date.now});
    }
}

module.exports = Logger;