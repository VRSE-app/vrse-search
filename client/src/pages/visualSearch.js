import React, { useState, useEffect } from "react"
import { constructNetwork } from '../utils/constructNetwork'

import Layout from "../components/core/Layout"
import { ForceGraph } from "../components/graph/ForceGraph"
import SearchPanel from "../components/search/SearchPanel"
import axios from 'axios'
import DedicatedSearch from "../components/search/DedicatedSearch"

export default function VisualSearch() {
    const tempObj = {
        id: "id", 
        title: "title",
        year: "year",
        abstract: "abstract",
        authors: [],
        score: "",
        s2Url: "",
        doiUrl: "",
        fieldsOfStudy: ""
    }

    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [nodes, setNodes] = useState([])
    const [links, setLinks] = useState([])
    // var { links, nodes } = constructNetwork(results);
    // const [searched, setSearched] = useState(false);
    
    const [panelData, setPanelData] = useState(tempObj);

    const nodeHoverTooltip = node => (`<div>${node.title}</div>`)

    const searchPanel = (node) => {
        const newNode = {...node}
        setPanelData(newNode)
    }

    // const searchNodes = () => {
    //     const newArr = constructNetwork(results)
    //     setNodes(newArr.nodes)
    // }

    // const searchLinks = () => {
    //     const newArr = constructNetwork(results)
    //     setLinks(newArr.links)
    // }

    function handleSearch(e) {
        e.preventDefault();

        // replace with appropriate search query structure for API endpoint
        axios.get(`http://localhost:3000/api/v1/_search/${searchTerm}`)
            // Set the results
            .then(response => {
                const results = response.data
                console.log({ results })
                // we are not entering here
                setResults(results);
                // const newArr = constructNetwork(results)
                // setNodes(newArr.nodes)
                // setLinks(newArr.links)
            })
            // Handle no results
            .catch(error => {
                console.log('error: ', error);
                setResults([]);
            })
            // .finally(() => {
            //     setSearched(true);
            // });
    }

    // check if state changes -> if results changes update links and nodes
    // todo: should I be using useLayoutEffect?
    // todo: write post about different hooks
    useEffect(() => {
        // this is console logging different panelData    
        console.log("in useEffect: results:", results)
        const newArr = constructNetwork(results)
        setNodes(newArr.nodes)
        setLinks(newArr.links)
    }, [results])

    useEffect(() => {
        // this is console logging different panelData    
        console.log("in useEffect: nodesNew:", nodes)
    }, [nodes])

    useEffect(() => {
        // this is console logging different panelData    
        console.log("in useEffect: linksNew:", links) 
    }, [links])

    return (
        <Layout>
            <div className="container pt-8">
                <h3 className="py-4">Search...</h3>
                <DedicatedSearch
                    searchTerm={searchTerm}
                    handleChange={(value) => setSearchTerm(value)}
                    handleSearch={e => handleSearch(e)}
                />
            </div>
            <div className="grid grid-cols-12">
                <div className="col-span-9">
                    <ForceGraph 
                        nodesData={nodes}
                        linksData={links}
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