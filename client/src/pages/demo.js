import React, { useState, useCallback, useEffect } from "react"
import { constructNetwork } from '../utils/constructNetwork'

import realData from '../assets/data/oman.json'
import Layout from "../components/core/Layout"
import { ForceGraph } from "../components/graph/ForceGraph"
import SearchPanel from "../components/search/SearchPanel"

export default function Demo() {
    const { links, nodes } = constructNetwork(realData)

    const [panelData, setPanelData] = useState({title:"test"});

    const nodeHoverTooltip = node => (`<div>${node.title}</div>`)

    const functionThatsValueOnlyChangesWhenXDoes = useMemo(() => {
        // do super heavy stuff

        return data
    }, [x])
    const searchPanel = (node) => {
        console.log({node})
        const newNode = {...node}
        setPanelData(newNode)
    }
    // check if state changes
    useEffect(() => {
        // this is console logging different panelData
        console.log("in useEffect: panelData:", panelData)
    }, [panelData])
    
    return (
        <Layout>
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <ForceGraph 
                        linksData={links}
                        nodesData={nodes}
                        nodeHoverTooltip={nodeHoverTooltip}
                        searchPanel={searchPanel} 
                    />
                </div>
                <div className="col-span-3">
                    <SearchPanel 
                        // this does not update
                        node={panelData}
                        onChange={searchPanel}
                    />
                </div>
            </div>
        </Layout>
    )
}

// const searchPanel = (node) => {
    //     console.log(node.title)

    //     setPanelData(node.title)
    //     console.log({ panelData })
    // }

    // const searchPanel = (node) => {
    //     setPanelData(node)
    // }
