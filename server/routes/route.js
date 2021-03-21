const { request, response } = require('express');
const express = require('express');
const { result } = require('lodash');
const router = express.Router();
const { Concurrency } = require('max-concurrency');

const { client } = require("../connection");
var bodyParser = require("body-parser").json();

// todo: keep original results
// todo: add incititations as well
// todo: fix query to only return that one result (done kind of but is this what we want?)
// todo: remove slice of only the 10 results for both the top and bottom level
// todo: refactor and make sure it all works concurrently with elastic
router.get('/_search/:input', (req, res) => {
    client.search({
        index: 'vrse-search',
        type: 'publication',
        body: {
            size: 100,
            query: {
                query_string: { query: req.params.input }
            }
        }
    })
        .then(response => {
            const hits = response.body.hits.hits
            const hitOutCitations = hits
                .map(hit => hit._source.outCitations)
                .reduce((acc, cur) => {
                cur.map(id => {
                    const presentInArr = acc.findIndex(itemId => id === itemId) > -1
                    if(!presentInArr) {
                        acc.push(id)
                    }
                })
                return acc;
            }, [])

            let outCitationPromises = hitOutCitations.slice(0, 10).map(id => {
                return new Promise((resolve, reject) => 
                    client.search({
                        index: 'vrse-search',
                        type: 'publication',
                        body: {
                            size: 1, // todo: verify this is a good method
                            query: {
                                query_string: { query: id }
                            }
                        }
                    }).then(data => {
                        console.log(`resolved inside: ${data}`)
                        resolve(data)
                    })
                    .catch(err => {
                        console.log(`rejected inside: ${err}`)
                        reject(err)
                    })
                )
            })
            
            console.log("is this an array of promises?")
            console.log(outCitationPromises.length)
            return outCitationPromises
        })
        .catch(err => {
            console.log(`rejected outside: ${err}`)
            reject(err)
        })
        .then(requests =>
            Promise.all(requests.slice(0, 10))
            .catch(err => console.log(err))
            .then(responses => {
                console.log(responses)
                // anything below here does not run for some reason
                const extendedResult = [];
                // const final = body.reduce((acc, cur) => {
                //     cur.map(result => acc.push(result.body.hits))
                // }, [])
                responses.forEach(response => {
                    extendedResult.push(response.body.hits)
                })
            
                console.log(extendedResult)

                return res.json(extendedResult);
            })
        )
        .catch(err => {
            return res.status(500).json({ "message": err })
        })
})

module.exports = router;