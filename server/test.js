const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const readline = require('readline');
require('array.prototype.flatmap');
const { client, deleteIndex, checkConnection, initMapping, createIndex, resetIndex } = require('./connection');

const directoryFiles = fs.readdirSync('./publications');

// If you want to clear everything and re-import run resetIndex()
// resetIndex();

// Concurrently process all files in directory (cannot do )
Promise.all(directoryFiles.map(filename => {
    return new Promise(async (resolve, reject) => {
        if (path.extname(filename) === '.gz') {
            console.log(filename);
            let readPath = `./publications/${filename}`
            let writePath = `./publications/${filename.slice(0, -3)}`
            try {
                await upload_data(readPath, writePath);
                resolve("done")
            } catch (err) {
                console.log(err);
                reject(err);
            }

        }
    })
}))

async function upload_data(directoryPath, writePath) {
    const unzip = zlib.createGunzip();
    const writeStream = fs.createWriteStream(writePath);

    fs.createReadStream(directoryPath).pipe(unzip).pipe(writeStream)
        .on('finish', (err) => {
            const reader = readline.createInterface({
                input: fs.createReadStream(writePath),
                output: null,
                terminal: false
            });

            const array = [];

            reader.on('line', line => {
                array.push(JSON.parse(line));
            });

            reader.on('close', () => writeToES(array, writePath));
        });
}

async function insertPublications(chunk) {
    const body = chunk.flatMap(doc => [{ index: { _index: 'vrse-search', _type: 'publication' } }, doc])

    await client.bulk({ refresh: true, body });

    const res = await client.count({ index: 'vrse-search' })
    console.log("Count: ", res.count)
}

async function writeToES(array, writePath) {
    console.log("Array Length:", array.length);

    const chunk_size = 100; // chunk size
    const num_chunks = Math.ceil(array.length / chunk_size);

    for (let i = 0; i < num_chunks; i++) {
        let t = array.slice(i * chunk_size, (i * chunk_size) + chunk_size)
        await insertPublications(t);
    }

    // delete the unzipped file
    fs.unlink(writePath, (err) => {
        console.log("Error:", err);
    });
}
