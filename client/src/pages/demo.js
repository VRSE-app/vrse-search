import React from 'react'
import Layout from '../components/core/Layout'
import ForceGraph from '../components/visualisation/ForceGraph'
import { constructNetwork } from '../utils/constructNetwork'
import data from '../assets/data/covid19sample.json';

const Demo = () => {
    const { links, nodes } = constructNetwork(data)
     
    const nodeHoverTooltip = React.useCallback((node) => {
        return `<div>${node.name}</div>`;
    }, []);
    console.log({ links })

    return (
        <Layout>
            <div className="root">
                <ForceGraph linksData={links} nodesData={nodes} nodeHoverTooltip={nodeHoverTooltip} />
            </div>
        </Layout>
    )
}

export default Demo;
