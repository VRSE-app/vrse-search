require("dotenv").config();

// Import API routes
const express = require("express");
const app = express();
const routes = require('./routes/route');
var bodyParser = require("body-parser");
const { checkConnection } = require("./connection");

const port = process.env.PORT || 3000;

// enable CORS
app.use(function (_, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');
    next();
});

app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
    checkConnection()
})

// defined the base route and return HTML file called index.html
app.get('/', function (req, res) {
    res.sendFile('index.html', {
        root: __dirname
    });
})

// Log percolated errors to the console
app.on('error', err => {
    console.error('Server Error', err)
})