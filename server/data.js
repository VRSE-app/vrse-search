const elasticsearch = require('elasticsearch')

// Core ES variables for this project
const index = 'vrse-search'
// Create a type for a publication record
const type = 'publication'

const port = 9200
const host = process.env.ES_HOST || 'localhost'
const client = new elasticsearch.Client({ host: { host, port } })

/** Check the ES connection status */
async function checkConnection() {
    let isConnected = false
    while (!isConnected) {
        console.log('Connecting to ES')
        try {
            const health = await client.cluster.health({})
            console.log(health)
            isConnected = true
        } catch (err) {
            console.log('Connection Failed, Retrying...', err)
        }
    }
}

/** Clear the index, recreate it, and add mappings */
async function resetIndex() {
    if (await client.indices.exists({ index })) {
        await client.indices.delete({ index });
    }

    await client.indices.create({
        index
    }, function (e, res, status) {
        if (e) {
            console.log(e);
        } else {
            console.log("created a new index", res);
        }
    });

    await putBookMapping()
}

/** Define Mapping Schema to put mappings into the data */
async function putPubMapping() {
    const schema = {
        id: { type: 'text' },
        title: { type: 'keyword' },
        paperAbstract: { type: 'text' },
        entities: { type: 'nested' },
        s2Url: { type: 'text' },
        s2PdfUrl: { type: 'text' },
        pdfUrls: { type: 'nested' },
        authors: { type: 'nested' },
        inCitations: { type: 'nested' },
        outCitations: { type: 'nested' },
        year: { type: 'integer' },
        venue: { type: 'text' },
        journalName: { type: 'text' },
        journalVolume: { type: 'text' },
        journalPages: { type: 'text' },
        sources: { type: 'nested' },
        doi: { type: 'text' },
        doiUrl: { type: 'text' },
        pmid: { type: 'text' }
    }

    return client.indices.putMapping({ index, type, body: { properties: schema } })
}