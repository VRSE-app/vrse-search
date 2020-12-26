const express = require('express');
const router = express.Router();

const { client } = require("../connection");

// const { Client } = require('@elastic/elasticsearch');
// const { response } = require('express');

var bodyParser = require("body-parser").json();

router.get('/_search', (req, res) => {
    // const searchText = req.query.text;

    client.search({
        index: 'vrse-search',
        type: 'publication',
        body: {
            query: {
                match: { title: "number theory" }
            }
        }
    })
        .then(response => {
            return res.json(response);
        })
        .catch(err => {
            return res.status(500).json({ "message": err })
        })
})

// router.post('/search', bodyParser, (req, res) => {
//     client.index({
//         index: 'vrse-search',
//         body: req.body
//     })
//         .then(resp => {
//             return res.status(200).json({
//                 msg: 'publication indexed'
//             });
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 msg: 'Error',
//                 err
//             });
//         })
// });

// router.get('/search/:id', (req, res) => {
//     let query = {
//         index: 'vrse-search',
//         id: req.params.id
//     }

//     client.index.get(query)
//         .then(resp => {
//             if (!resp) {
//                 return res.status(404).json({
//                     publication: resp
//                 });
//             }
//             return res.status(200).json({
//                 publication: resp
//             });
//         })
//         .catch(err => {
//             return res.status(500).json({
//                 msg: 'Error not found',
//                 err
//             });
//         });
// });

// router.put('/search/:id', bodyParser, (req, res) => {
//     client.update({
//         index: 'vrse-search',
//         id: req.params.id,
//         body: {
//             doc: req.body
//         }
//     })
//         .then(resp => {
//             return res.status(200).json({
//                 msg: 'product updated'
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(500).json({
//                 msg: 'Error',
//                 err
//             });
//         })
// });

// router.delete('/search/:id', (req, res) => {
//     client.delete({
//         index: 'vrse-search',
//         id: req.params.id
//     })
//         .then(resp => {
//             res.status(200).json({
//                 'msg': 'Product deleted'
//             });
//         })
//         .catch(err => {
//             res.status(404).json({
//                 'msg': 'Error'
//             });
//         });
// });

// /_search?q=



// router.get('/search', (req, res) => {
//     // syntax is likely not to match with ES

//     // holds the value of the query param searchquery
//     const searchQuery = req.query.searchQuery;

//     // do somethign if the searchQuery is not null.
//     if (searchQuery != null) {

//         searchGoogle(searchQuery)
//             .then(results => {
//                 //Returns a 200 Status OK with Results JSON back to the client.
//                 response.status(200);
//                 response.json(results);
//             });
//     } else {
//         res.end();
//     }

// searchElastic function to interface with elastic (do we need this or can it be part of the other one)
// const searchElastic = async (searchQuery) => {

// };

// async function makeSearch() {
//     const { body } = await client.search({
//         index: 'vrse-search',
//         type: 'publication',
//         body: {
//             query: {
//                 match: { title: 'number theory' }
//             }
//         }
//     });
// }
// here we are forcing an index refresh, otherwise we will not
// get any result in the consequent search
// await client.indices.refresh({ index: 'vrse-search' })


// client.search({
//     index: 'vrse-search',
//     type: 'publication',
//     body: {
//         query: {
//             match: { title: 'number theory' }
//         }
//     }
// })
//     .then(resp => {
//         return res.status(200).json({
//             publications: resp.hits.hits
//         });
//     })
//     .catch(err => {
//         console.log(err);
//         return res.status(500).json({
//             msg: 'Error',
//             err
//         });
//     });

// By default ES returns 10 results but we can change this by adding size into the query
// Let's search!
// const { body } = await client.search({
//     index: 'vrse-search',
//     type: 'publication',
//     body: {
//         query: {
//             match: { title: 'number theory' }
//         }
//     }
// });
// })

// router.get('/search', (req, res) => {
//     let query = {
//         index: 'vrse-search',
//     }
//     if (req.query.publication) {
//         query.q = `${req.query.publication}`;
//     }
//     client.search(query)
//         .then(resp => {
//             return res.status(200).json({
//                 publications: resp.hits.hits
//             });
//         })
//         .catch(err => {
//             console.log(err);
//             return res.status(500).json({
//                 msg: 'Error',
//                 err
//             });
//         });
// });

module.exports = router;