const express = require("express");
const router = express.Router();
const Logger = require("../events/Logger")
const config = require("../config")

const myLogger = new Logger;

router.route("/api")
    .all((req, res, next) => {
        myLogger.log(req.url);
        next()
    })
    .get((req, res) => {
        res.send({
            firstname: "max",
            lastname: "mustermann"
        });
    })

module.exports = router;