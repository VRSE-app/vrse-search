function constructNetwork(data) {
    let nodes = [];
    let links = [];
    console.log({data})
    data.forEach(element => {
        // assign a paper with an id to a node
        let node = {}
        node.id = element._source.id;
        node.title = element._source.title;
        node.abstract = element._source.paperAbstract;
        node.authors = element._source.authors;
        node.score = element._score;

        // map through incitations
        // console.log(node.inCitations);
        element._source.inCitations.forEach(inCitation => {
            let link = {};
            link.source = inCitation;
            link.target = element._source.id;

            // if it does not already contain the link then push it (error handling)
            links.indexOf(link) === -1 ? links.push(link) : console.log("This item already exists");
        })

        // map through outcitations
        // console.log(node.outCitations);
        element._source.outCitations.forEach(outCitation => {
            let link = {};
            link.source = element._source.id;
            link.target = outCitation;

            // if it does not already contain the link then push it
            links.indexOf(link) === -1 ? links.push(link) : console.log("This item already exists");
        })

        // add the node to the arr of nodes
        nodes.push(node);
    });

    let newArr = {};
    newArr.nodes = nodes;
    newArr.links = links;

    console.log(newArr);
    return newArr;
}

module.exports = {
    constructNetwork,
};