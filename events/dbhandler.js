const EventEmitter = require("events");
const config = require("../config");
const mysql = require('mysql');

class DataBaseHandler extends EventEmitter {
    // db = mysql.createConnection({
    //     host: config.database.ip,
    //     user: config.database.user,
    //     password: config.database.pw,
    //     database: config.database.db
    // });
    insert(data) {
        // this.db.connect((err) => {
        //     if (err) throw err;
        //     console.log("Connected!");
        //     var sql = "INSERT INTO querys (query) VALUES (?)";
        //     this.db.query(sql, data, (err, result) => {
        //         if (err) throw err
        //         console.log(result);
        //     });
        // });
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