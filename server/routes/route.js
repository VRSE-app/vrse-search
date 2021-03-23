const express = require('express');
const router = express.Router();
const { client } = require("../connection");

function chunk(arr, chunkSize) {
    if (chunkSize <= 0) throw "Invalid chunk size";
    var R = [];
    for (var i=0,len=arr.length; i<len; i+=chunkSize)
        R.push(arr.slice(i,i+chunkSize));
    return R;
}

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

    const outCitations = hits
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

    const inCitations = hits
        .map(hit => hit._source.inCitations)
        .reduce((acc, cur) => {
        cur.map(id => {
            const presentInArr = acc.findIndex(itemId => id === itemId) > -1
            if(!presentInArr) {
                acc.push(id)
            }
        })
        return acc;
    }, [])

    const chunkedOutCitations = chunk(outCitations.slice(0, 100), 40)
    const chunkedInCitations = chunk(outCitations.slice(0, 100), 40)

    let inResults = []
    let outResults = []

    for await (const batch of chunkedOutCitations) {
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
                }
            }).then(
                result => result.body.hits.hits
            )
        })
        const data = await Promise.all(promises)
        outResults.push(...data)
    }

    for await (const batch of chunkedInCitations) {
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
                }
            }).then(
                result => result.body.hits.hits
            )
        })
        const data = await Promise.all(promises)
        inResults.push(...data)
    }

    // maybe we don't want them all in one array - maybe we want to colour the main hits differently
    // todo: filter out dubplicates to be sure
    res.send(hits.concat(outResults, inResults));
})

module.exports = router;