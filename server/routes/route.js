const express = require('express');
const router = express.Router();
const { client } = require("../connection");

router.get('/_search/:input', async (req, res) => {
    const articles = []
    let response
    response = await client.search({
        index: 'vrse-search',
        type: 'publication',
        body: {
            size: 100,
            query: {
                query_string: { query: req.params.input }
            }
        }
    })

    const ids = new Set()
    response.body.hits.hits.forEach(article => {
        article._source.inCitations.forEach(citation => ids.add(citation))
        article._source.outCitations.forEach(citation => ids.add(citation))
        articles.push(article)
    });

    response = await client.search({
        index: 'vrse-search',
        type: 'publication',
        body: {
            query: {
                ids: { values: [...ids] }
            }
        }
    })

    response.body.hits.hits.forEach(article => articles.push(article))
    res.send(articles)
})

module.exports = router;