const { request, response } = require('express');
const express = require('express');
// const { result } = require('lodash');
const router = express.Router();
// const { Concurrency } = require('max-concurrency');

const { client } = require("../connection");
// var bodyParser = require("body-parser").json();
function chunk(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i=0,len=arr.length; i<len; i+=chunkSize)
      R.push(arr.slice(i,i+chunkSize));
    return R;
  }

// todo: keep original results
// todo: add incititations as well
// todo: fix query to only return that one result (done kind of but is this what we want?)
// todo: remove slice of only the 10 results for both the top and bottom level
// todo: refactor and make sure it all works concurrently with elastic
router.get('/_search/:input', async (req, res) => {
    const response = await client.search({
        index: 'vrse-search',
        type: 'publication',
        body: {
            size: 100,
            query: {
                query_string: { query: req.params.input }
            }
        }
    })

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
    const chunkedHitOutCitations = chunk(hitOutCitations.slice(0,45), 36)
    let results = []
    for await (const batch of chunkedHitOutCitations) {
        let promises = batch.map((id) => {
            console.log(`Requesting ${id}`)
            return client.search({
            index: 'vrse-search',
            type: 'publication',
            body: {
                size: 1, // todo: verify this is a good method
                query: {
                    query_string: { query: id }
                }
            }}).then(
                result => result.body.hits.hits
            )
        })
        const data = await Promise.all(promises)
        results.push(...data)
    }
    res.send({
        origin: response,
        results
    });
})

module.exports = router;