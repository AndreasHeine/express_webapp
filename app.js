const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const https = require("https");
const fs = require("fs");
const nunjucks = require("nunjucks");

const app = express();

app.use(express.static('public'));

// Security:
app.use(helmet());

// Simple Usage (Enable All CORS Requests)
app.use(cors());

// Template-Engine:
app.set('view engine', 'html');
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

// URL-Routes:
app.use(require("./routes/main"));
app.use(require("./routes/api"));
app.use(require("./routes/api_v1"));

// Create and start https Server:
const PORT = process.env.PORT || 443;
https.createServer({
    key: fs.readFileSync('./private/certs/key.pem'),
    cert: fs.readFileSync('./private/certs/cert.pem'),
    passphrase: fs.readFileSync('./private/secretstuff/key.txt', "utf-8")
}, app)
.listen(PORT);