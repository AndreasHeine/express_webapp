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

const jwtKey = "mysecretkey";
const jwtExpirySeconds = 30;

const users = {
    admin: "admin",
    author: "author",
	user: "user",
}

const login = (req, res) => {
	const { username, password } = req.body
	if (!username || !password || users[username] !== password) {
		return res.status(401).end();
	}
	const token = jwt.sign({ username }, jwtKey, {
		algorithm: "HS256",
		expiresIn: jwtExpirySeconds,
	})
    res.header("key", token).send()
    res.end();
}

const authenticated = (req, res) => {
    try {
        const token = req.headers.key;
        if (!token) {
            return res.status(401).end();

        }
        let payload = jwt.verify(token, jwtKey);
        res.send(`Welcome ${payload.username}!`);
    } catch (e) {
        if (e instanceof jwt.JsonWebTokenError) {
			return res.status(401).end();
		}
        return res.status(400).end();
    }
}

/*
-----------------------------------------------------------------
Routes:
-----------------------------------------------------------------
*/

router.route("/api/v1/help")
    .get((req, res) => {
        res.send("Help!");
    })

router.route("/api/v1/login")
    .post(login)
    .get((req, res) => {
        res.redirect("/api/v1/help");
    })

router.route("/api/v1")
    .get(authenticated, (req, res) => {
        db.insert("data");
        res.send("done");
    })

module.exports = router;