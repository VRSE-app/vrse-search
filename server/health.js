var client = require("./connection.js");

console.log(client);
/* Get the health status */
client.cluster.health({}, function (err, resp, status) {
    console.log("-- Client Health --", resp);
});