const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

// client.info(console.log)
// migrate to es7.10.0

async function run() {
    // here we are forcing an index refresh, otherwise we will not
    // get any result in the consequent search
    await client.indices.refresh({ index: 'vrse-search' })

    // Let's search!
    const { body } = await client.search({
        index: 'vrse-search',
        type: 'publication',
        body: {
            query: {
                match: { title: 'number theory' }
            }
        }
    })

    console.log(body.hits.hits)
}

run().catch(console.log);