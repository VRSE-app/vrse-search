const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const esConnection = require('./connection-old');

/** Clear ES index, parse and index all files from the publications directory */
async function readAndInsertPublications() {
    // try {
    await esConnection.resetIndex();

    const directoryFiles = fs.readdirSync('./publications');

    // directoryFiles.forEach(filename => {
    //     // there was an invisible .DS_STORE that I couldn't delete...

    //     console.log(filename);
    //     const fileContents = fs.createReadStream(`./publications/${filename}`);
    //     const writeStream = fs.createWriteStream(`./publications/${filename}`);
    //     const unzip = zlib.createGunzip();
    //     fileContents.pipe(unzip).pipe(writeStream);
    // }
    // });

    Promise.all(directoryFiles.map(filename => {
        return new Promise((resolve, reject) => {
            if (path.extname(filename) === '.gz') {
                console.log(filename);
                const fileContents = fs.createReadStream(`./publications/${filename}`);
                const writeStream = fs.createWriteStream(`./publications/${filename.slice(0, -3)}`);
                const unzip = zlib.createGunzip();
                fileContents.pipe(unzip).pipe(writeStream).on('finish', (err) => {
                    if (err) return reject(err);
                    else resolve();
                });
                console.log(fileContents);
            }
        })
    }))
        .on("close", res)
        .then(console.log('done'));
    // can continue to do things here

    // const files = fs.readdirSync('./publications');

    // const fileContents = fs.createReadStream('./publications/s2-corpus-000.gz');
    // const writeStream = fs.createWriteStream('./publications/s2-corpus-000');
    // const unzip = zlib.createGunzip();

    // console.log(fileContents.pipe(unzip).pipe(writeStream));
    // Promise.all(files.map(filename => {
    //     return new Promise((resolve, reject) => {
    //         const fileContents = fs.createReadStream(`./publications/${filename}`);
    //         const writeStream = fs.createWriteStream(`./publications/${filename.slice(0, -3)}`);
    //         const unzip = zlib.createGunzip();

    //         fileContents.pipe(unzip).pipe(writeStream).on('finish', (err) => {
    //             if (err) {
    //                 return reject(err);
    //             } else {
    //                 resolve();
    //             }
    //         })
    //     })
    // }))
    //     .then(console.log('done!'));

    // // Read Publications directory
    // // let files = fs.readdirSync('./publications').filter(file => file.slice(-4) === '.txt')
    // let files = fs.readdirSync('./publications')
    // console.log(`Found ${files.length} Files`);

    // for (let file of files) {
    //     console.log(`Reading File - ${file}`);
    //     const filePath = path.join('./publications', file)
    //     gunzip(file, `${file}.txt`);
    //     console.log(`successfully unzipped ${file}`);
    // }
    // That is all we want to test for a start
    // } catch (err) {
    //     console.log(err);
    // }
}

readAndInsertPublications();