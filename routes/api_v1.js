const express = require("express");
const Logger = require("../events/logger");
const config = require("../config");
const DbHandler = require("../events/dbhandler");

const router = express.Router();
const l = new Logger;
const db = new DbHandler;

function isAuthenticated(req, res, next) {
    try {
        if (req.user.authenticated) {
            return next();
        }
    } catch {
        return res.status(401).send({ error: 'Unauthorized' });
    }
}

router.route("/api/v1")
    .all((req, res, next) => {
        l.log(req.query);
        next();
    })
    .get(isAuthenticated, (req, res) => {
        db.insert("data")
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