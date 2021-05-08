// not sure this is the right way to import
const { scaleScore } = require("./scaleScore")

function constructNetwork(data) {
    let nodes = []
    let links = []

    data.forEach(element => {
        // assign a paper with an id to a node
        let node = {}
        // console.log(element._source)
    
        // scale into 4 sizes based on middle percentiles
        if (element._source != null) {
            node.id = element._source.id
            node.title = element._source.title
            node.abstract = element._source.paperAbstract
            node.authors = element._source.authors

            // initial value that is overwritten
            node.score = element._score

            // map through incitations
            element._source.inCitations.forEach(inCitation => {
                let link = {}
                link.source = inCitation
                link.target = element._source.id
    
                // if it does not already contain the link then push it (error handling)
                links.indexOf(link) === -1 ? links.push(link) : console.log("This item already exists")
            })
    
            // map through outcitations
            element._source.outCitations.forEach(outCitation => {
                let link = {}
                link.source = element._source.id
                link.target = outCitation
    
                // if it does not already contain the link then push it
                links.indexOf(link) === -1 ? links.push(link) : console.log("This item already exists")
            })
        }

        nodes.push(node);
    });

    console.log({ nodes })
    // should no longer contain 2s
    let scores = nodes.map(node => node.score).filter(score => score > 1)

    console.log({scores})
    nodes.forEach(node => {
        switch(node.score) {
            case node.score === 1:
                console.log("case 1")
                node.score = 10
                break
            default:
                node.score = scaleScore(node.score, [Math.min(...scores), Math.max(...scores)], [10,40])
        }
    })

    let newArr = {};
    // todo: would have to remove empty nodes by this approach
    newArr.nodes = nodes;
    newArr.links = links;

    return newArr;
}

module.exports = {
    constructNetwork,
};