const express = require("express");
const Logger = require("../events/logger")
const config = require("../config")

const router = express.Router();
const l = new Logger;

router.route("/api/v1")
    .all((req, res, next) => {
        l.log(req.query);
        next();
    })
    .get((req, res) => {
        res.send("done");
    })

router.route("/api/v1/help")
    .all((req, res, next) => {
        l.log(req.query);
        next();
    })
    .get((req, res) => {
        res.send("Help!");
    })

module.exports = router;