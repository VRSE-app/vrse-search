const { client } = require('./connection.js');

client.search({
    index: 'vrse-search',
    type: 'publications',
    size: 5,
    body: {
        query: {
            "match_all": {}
        },
    }
}, function (error, response, status) {
    if (error) {
        console.log('search error: ' + error)
    }
    else {
        console.log('--- Response ---');
        console.log('Total hits: ', response.hits.total);
        console.log('--- Hits ---');
        response.hits.hits.forEach(function (hit) {
            console.log(hit);
        })
    }
});