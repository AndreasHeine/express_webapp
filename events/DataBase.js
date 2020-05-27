const EventEmitter = require("events");

class DataBaseHandler extends EventEmitter {
    insert(data) {
        console.log(data);
    }
    delete(data) {
        console.log(data);
    }
    update(data) {
        console.log(data);
    }
}

module.exports = DataBaseHandler;