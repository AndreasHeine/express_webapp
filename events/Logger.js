const EventEmitter = require("events");

class Logger extends EventEmitter {
    log(msg) {
        console.log(msg);
        this.emit("logged", {msg: msg, timestamp: Date.now});
    }
}

module.exports = Logger;