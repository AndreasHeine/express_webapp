const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const nunjucks = require("nunjucks");
const bodyParser = require('body-parser')
const bcrypt = require("bcrypt");

const dotenv = require("dotenv");
dotenv.config();

// instantiate express-app:
const app = express();

// set static folder:
app.use(express.static('public'));

// set bodyparser:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

// set security:
app.use(helmet());
app.use(cors());

// set routes:
app.use(require("./routes/main"));
app.use(require("./routes/api"));
app.use(require("./routes/api_v1"));

// set template-engine:
app.set('view engine', 'html');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// create and start server:
const PORT = process.env.PORT || 443;
https.createServer({
    key: fs.readFileSync('./private/certs/key.pem'),
    cert: fs.readFileSync('./private/certs/cert.pem'),
    passphrase: bcrypt.genSaltSync(64)
}, app)
.listen(PORT);