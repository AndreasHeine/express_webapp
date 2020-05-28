const express = require("express");
const Logger = require("../events/logger")
const config = require("../config")

const router = express.Router();
const l = new Logger;

router.route("/api")
    .all((req, res, next) => {
        l.log(req.query);
        res.redirect("/api/v1/help");
    })

module.exports = router;