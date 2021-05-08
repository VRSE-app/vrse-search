import React from "react"
import { Link } from "gatsby"
import { constructNetwork } from '../utils/constructNetwork'

import realData from '../assets/data/oman.json'
// import data from '../assets/data/data.json'
import Layout from "../components/core/Layout"
import { ForceGraph } from "../components/graph/ForceGraph"
import SearchPanel from "../components/search/SearchPanel"

export default function Demo() {
    const { links, nodes } = constructNetwork(realData)

    const nodeHoverTooltip = React.useCallback((node) => {
        return `<div>${node.name}</div>`;
    }, []);

    const keywords = ["keyword 1", "keyword 2", "keyword 3"]

    return (
        <Layout>
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <ForceGraph linksData={links} nodesData={nodes} nodeHoverTooltip={nodeHoverTooltip} />
                </div>
                <div className="col-span-3">
                    <SearchPanel title="title" date="01-01-1111" author="Author" keywords={keywords} abstract="abstract goes here"/>
                </div>
            </div>
        </Layout>
    )
}