const express = require("express");
const Logger = require("../events/logger");
const config = require("../config");
const DbHandler = require("../events/dbhandler");

const router = express.Router();
const l = new Logger;
const db = new DbHandler;

/*
-----------------------------------------------------------------
Authentification:
-----------------------------------------------------------------
*/

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const jwtKey = bcrypt.genSaltSync(10);
const jwtExpirySeconds = 30;

/*
Users and passwords should come from database, i implement it later!
*/
const users = {
    admin: "password"
}

const login = (req, res) => {
	const { username, password } = req.body
	if (!username || !password || users[username] !== password) {
		return res.status(401).send({ auth: false, message: "Wrong user or password", timestamp: Date.now() });
    }
	const token = jwt.sign({ username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
    res.status(200).send({ auth: true, token: token });
}

const authenticated = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send({ auth: false, message: "No token provided.", timestamp: Date.now() });
    }
    jwt.verify(token, jwtKey, (err, decoded) => {
        if (err) return res.status(401).send({ auth: false, message: "Failed to authenticate token.", timestamp: Date.now() });
        next();
    }
    );
}

/*
-----------------------------------------------------------------
Routes:
-----------------------------------------------------------------
*/

router.route("/api/v1/help")
    .get((req, res) => {
        res.render("index.html", {})
    })

router.route("/api/v1/login")
    .post(login)
    .get((req, res) => {
        res.redirect("/api/v1/help");
    })

router.route("/api/v1/test")
    .get(authenticated, (req, res) => {
        res.status(200).send({ message: "your requested data", timestamp: Date.now() });
    })
    .post(authenticated, (req, res) => {
        res.status(200).send({ message: "data saved", valid: true , timestamp: Date.now() });
    })

module.exports = router;