require("dotenv").config();

// Import API routes
const express = require("express");
const app = express();
const routes = require('./routes/route');
// const { client } = require("./connection");
// const { client, indexName, type } = require('./connection');
var bodyParser = require("body-parser");
const { format } = require("date-fns");
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");
const _ = require("lodash");
// const elasticsearch = require('@elastic/elasticsearch');
const { client, checkConnection } = require("./connection");

// const { Client } = require('@elastic/elasticsearch');
// const client = new Client({ node: 'http://localhost:9200' })

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);
})

// const { getAuthor } = require("./routes/getAuthor.js");
// For XML parsing: app.use(bodyParser.xml());

// enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

// app.get('/search', async (req, res, next) => {
//     // should add middleware to validate the endpoint or it is brittle
//     console.log("calling /search route");
//     console.log("req params are:");
//     console.log(req);
//     const { term, offset } = req.query;
//     res.json(await search.queryTerm(term, offset));
// });

// app
// .use(logger) // Add logger to the stack
// .use((req, res) => res.sendFile(INDEX, { root: __dirname })) // use HTML file to show response (?)
// .use(router.routes())
// .use(router.allowedMethods())
// .listen(port, () => {
//     console.log(`VRSE API listening on port ${port}`);
// })

// // Log each request to the console
// var logger = function (req, res, next) {
//     console.log("RECEIVED REQUEST: ", res);
//     next(); // passing the request to the next handler in the stack
// }

// Set permissive CORS header
// app.use(async (ctx, next) => {
//     ctx.set('Access-Control-Allow-Origin', '*')
//     return next()
// })

// ADD ENDPOINTS HERE