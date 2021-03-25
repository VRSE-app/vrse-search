import React from "react";
import { Link } from "gatsby";
import { constructNetwork } from '../utils/constructNetwork'

import realData from '../assets/data/covid19sample.json';
import data from '../assets/data/data.json';
import Layout from "../components/core/Layout";
import { ForceGraph } from "../components/graph/ForceGraph";

export default function Demo() {
    const { links, nodes } = constructNetwork(realData)

    const nodeHoverTooltip = React.useCallback((node) => {
        return `<div>${node.name}</div>`;
    }, []);

    return (
        <Layout>
            <ForceGraph linksData={links} nodesData={nodes} nodeHoverTooltip={nodeHoverTooltip} />
        </Layout>
    )
}