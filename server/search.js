// const { client, index, type } = require('../connection')
const { client, indexName, type } = require('./connection');

module.exports = {

    /** Query ES index for the provided term */
    queryTerm(term, offset = 0) {
        const body = {
            from: offset,
            query: {
                match: {
                    text: {
                        query: term,
                        operator: 'and',
                        fuzziness: 'auto'
                    }
                }
            },
            highlight: { fields: { title: {} } }
        }

        return client.search({ indexName, type, body })
    },
}