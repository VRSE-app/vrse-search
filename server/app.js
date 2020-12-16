require("dotenv").config();

// Import API routes
const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const router = express.Router();
const { format } = require("date-fns");
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");
const _ = require("lodash");

// const routes = require('./routes');
const { client } = require("./connection");
// const { client, indexName, type } = require('./connection');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
// app.use('/api/v1', routes);

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`)
})

// const { getAuthor } = require("./routes/getAuthor.js");
// For XML parsing: app.use(bodyParser.xml());

// enable CORS
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// defined the base route and return HTML file called index.html
// app.get('/', function (req, res) {
//     res.sendFile('index.html', {
//         root: __dirname
//     });
// })

// Log percolated errors to the console
// app.on('error', err => {
//     console.error('Server Error', err)
// })

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

router.post('/search', bodyParser, (req, res) => {
    client.index({
        index: 'vrse-search',
        body: req.body
    })
        .then(resp => {
            return res.status(200).json({
                msg: 'publication indexed'
            });
        })
        .catch(err => {
            return res.status(500).json({
                msg: 'Error',
                err
            });
        })
});

router.get('/search/:id', (req, res) => {
    let query = {
        index: 'vrse-search',
        id: req.params.id
    }

    client.index.get(query)
        .then(resp => {
            if (!resp) {
                return res.status(404).json({
                    publication: resp
                });
            }
            return res.status(200).json({
                publication: resp
            });
        })
        .catch(err => {
            return res.status(500).json({
                msg: 'Error not found',
                err
            });
        });
});

router.put('/search/:id', bodyParser, (req, res) => {
    client.update({
        index: 'vrse-search',
        id: req.params.id,
        body: {
            doc: req.body
        }
    })
        .then(resp => {
            return res.status(200).json({
                msg: 'product updated'
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error',
                err
            });
        })
});

router.delete('/search/:id', (req, res) => {
    client.delete({
        index: 'vrse-search',
        id: req.params.id
    })
        .then(resp => {
            res.status(200).json({
                'msg': 'Product deleted'
            });
        })
        .catch(err => {
            res.status(404).json({
                'msg': 'Error'
            });
        });
});

router.get('/search', (req, res) => {
    let query = {
        index: 'vrse-search'
    }
    if (req.query.publication) query.q = `${req.query.publication}`;
    client.search(query)
        .then(resp => {
            return res.status(200).json({
                publications: resp.hits.hits
            });
        })
        .catch(err => {
            console.log(err);
            return res.status(500).json({
                msg: 'Error',
                err
            });
        });
});