const express = require('express');
const router = express.Router();
// const elastic = require('elasticsearch');
var bodyParser = require("body-parser").json();
// const { client } = require("../connection");
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

module.exports = router;