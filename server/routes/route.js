const express = require('express');
const router = express.Router();
const { client } = require("../connection");

router.get('/_search/:input', async (req, res) => {
    const articles = []
    let response = []
    
    response = await client.search({
        index: 'vrse-search',
        body: {
            size: 100,
            query: {
                query_string: { query: req.params.input }
            }
        }
    })

    const ids = new Set()
    response.body.hits.hits.forEach(article => {
        article._source.inCitations.forEach(id => ids.add(id))
        article._source.outCitations.forEach(id => ids.add(id))
        articles.push(article)
    });

    // does this really behave as expected? could try to show some links
    response = await client.search({
        index: 'vrse-search',
        body: {
            query: {
                ids: { values: [...ids] }
            }
        }
    })

    response.body.hits.hits.forEach(article => articles.push(article))

    console.log(articles)
    res.send(articles)
    console.log(articles)
})

module.exports = router;