const express = require("express");
const router = express.Router();

router.route("/")
    .all((req, res, next) => {
        //console.log(req);
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
        //console.log(req);
        next()
    })
    .get((req, res) => {
        res.render("about.html");
    })

module.exports = router;