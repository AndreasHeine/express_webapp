const express = require("express");
const Logger = require("../events/Logger")
const config = require("../config")

const router = express.Router();
const myLogger = new Logger;

router.route("/")
    .all((req, res, next) => {
        myLogger.log(req.query);
        next()
    })
    .get((req, res) => {
        res.send({
            firstname: "max",
            lastname: "mustermann"
        });
    })

module.exports = router;