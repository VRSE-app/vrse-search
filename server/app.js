require("dotenv").config();

const express = require("express");
const fs = require('fs');
const fetch = require("node-fetch");
const _ = require("lodash");
const { format } = require("date-fns");
var bodyParser = require("body-parser");
const path = require('path');

// Import API routes
// const search = require('./search')
// const { getAuthor } = require("./routes/getAuthor.js");
// ... others here, q: do we need the .js or not?

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
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

app
    // .use(logger) // Add logger to the stack
    // .use((req, res) => res.sendFile(INDEX, { root: __dirname })) // use HTML file to show response (?)
    // .use(router.routes())
    // .use(router.allowedMethods())
    .listen(port, () => {
        console.log(`VRSE API listening on port ${port}`);
    })

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

/**
 * GET /search
 * Search for a term in the library
 * Query Params -
 * term: string under 60 characters
 * offset: positive integer
 */
// router.get('/search',
//     validate({
//         query: {
//             term: joi.string().max(60).required(),
//             offset: joi.number().integer().min(0).default(0)
//         }
//     }),
//     async (ctx, next) => {
//         const { term, offset } = ctx.request.query
//         ctx.body = await search.queryTerm(term, offset)
//     }
// )

/**
 * GET /paragraphs
 * Get a range of paragraphs from the specified book
 * Query Params -
 * bookTitle: string under 256 characters
 * start: positive integer
 * end: positive integer greater than start
 */
// router.get('/paragraphs',
//     validate({
//         query: {
//             bookTitle: joi.string().max(256).required(),
//             start: joi.number().integer().min(0).default(0),
//             end: joi.number().integer().greater(joi.ref('start')).default(10)
//         }
//     }),
//     async (ctx, next) => {
//         const { bookTitle, start, end } = ctx.request.query
//         ctx.body = await search.getParagraphs(bookTitle, start, end)
//     }
// )