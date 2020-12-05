const elasticsearch = require('elasticsearch');

// Core ES variables for this project
const indexName = 'vrse-search';
const type = 'publication';
const port = 9200;
const host = process.env.ES_HOST || 'localhost';
const client = new elasticsearch.Client({ host: { host, port } });
console.log(client);
/** Check the ES connection status */
async function checkConnection() {
    let isConnected = false;
    while (!isConnected) {
        console.log('Connecting to ES');
        try {
            const health = await client.cluster.health({});
            isConnected = true;
            console.log(health);
        } catch (err) {
            console.log('Connection Failed, Retrying...', err);
        }
    }
}

/** Create an index */
async function createIndex() {
    await client.indices.create({
        index: indexName
    });
}

/** Delete an existing index */
async function deleteIndex() {
    await client.indices.delete({
        index: indexName
    });
}

/** Clear the index, recreate it, and add mappings */
async function resetIndex() {
    if (await client.indices.exists({ indexName })) {
        await client.indices.delete({ indexName });
    }

    await client.indices.create({
        indexName
    }, function (e, res, status) {
        if (e) {
            console.log(e);
        } else {
            console.log("created a new index", res);
        }
    });

    await initMapping();
}

/** Define Mapping Schema to put mappings into the data */
async function initMapping() {
    const schema = {
        id: { type: 'text' },
        title: { type: 'keyword' },
        paperAbstract: { type: 'text' },
        authors: { type: 'nested' },
        inCitations: { type: 'nested' },
        outCitations: { type: 'nested' },
        year: { type: 'integer' },
        s2Url: { type: 'text' },
        sources: { type: 'nested' },
        pdfUrls: { type: 'nested' },
        venue: { type: 'text' },
        journalName: { type: 'text' },
        journalVolume: { type: 'text' },
        journalPages: { type: 'text' },
        doi: { type: 'text' },
        doiUrl: { type: 'text' },
        pmid: { type: 'text' },
        fieldsOfStudy: { type: 'nested' },
        s2PdfUrl: { type: 'text' },
        entities: { type: 'nested' }
    }

    return client.indices.putMapping({ indexName, type, body: { properties: schema } });
}

module.exports = {
    checkConnection,
    createIndex,
    deleteIndex,
    resetIndex
}