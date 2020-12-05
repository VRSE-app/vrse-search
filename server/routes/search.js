// const { client, index, type } = require('../connection')
const { client, indexName, type } = require('../data');

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
            highlight: { fields: { text: {} } }
        }

        return client.search({ indexName, type, body })
    },

    /** Get the specified range of paragraphs from a book */
    getParagraphs(bookTitle, startLocation, endLocation) {
        const filter = [
            { term: { title: bookTitle } },
            { range: { location: { gte: startLocation, lte: endLocation } } }
        ]

        const body = {
            size: endLocation - startLocation,
            sort: { location: 'asc' },
            query: { bool: { filter } }
        }

        return client.search({ indexName, type, body })
    }
}