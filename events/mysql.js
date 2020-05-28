const EventEmitter = require("events");
const config = require("../config");
const mysql = require('mysql');

class DataBaseHandler extends EventEmitter {
    connect() {
        console.log("connected");
    }
    disconnect() {
        console.log("disconnected");
    }
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