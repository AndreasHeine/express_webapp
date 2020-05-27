const express = require("express");
const Logger = require("../events/Logger")

const router = express.Router();
const myLogger = new Logger;

router.route("/")
    .all((req, res, next) => {
        myLogger.log(req.url);
        next()
    })
    .get((req, res) => {
        res.render("index.html", {
            firstname: "max",
            lastname: "mustermann"
        });
    })

router.route("/about")
    .all((req, res, next) => {
        myLogger.log(req.url);
        next()
    })
    .get((req, res) => {
        res.render("about.html");
    })

module.exports = router;