const elasticsearch = require('@elastic/elasticsearch');
const type = 'publication';
const client = new elasticsearch.Client({ node: 'http://83.136.249.107:9200' })

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

    await client.indices.create({
        index: 'vrse-search'
    });
}

/** Delete an existing index */
async function deleteIndex() {
    await client.indices.delete({
        index: 'vrse-search'
    });
}

/** Clear the index, recreate it, and add mappings */
async function resetIndex() {
    if (await client.indices.exists({ index: 'vrse-search' })) {
        await client.indices.delete({ index: 'vrse-search' });
    }

    await client.indices.create({
        index: 'vrse-search'
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

    return client.indices.putMapping({ index: 'vrse-search', type, body: { properties: schema } });
}

module.exports = {
    client,
    type,
    checkConnection,
    createIndex,
    deleteIndex,
    resetIndex,
    initMapping
}