const express = require("express");
const Logger = require("../events/logger");
const config = require("../config");

const router = express.Router();
const l = new Logger;

router.route("/")
    .all((req, res, next) => {
        l.log(req.url);
        next();
    })
    .get((req, res) => {
        res.render("index.html", {});
    })

router.route("/about")
    .all((req, res, next) => {
        l.log(req.url);
        next();
    })
    .get((req, res) => {
        res.render("about.html", {});
    })

module.exports = router;