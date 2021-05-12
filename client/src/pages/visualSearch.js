import React, { useState, useEffect } from "react"
import { constructNetwork } from '../utils/constructNetwork'

import Layout from "../components/core/Layout"
import { ForceGraph } from "../components/graph/ForceGraph"
import SearchPanel from "../components/search/SearchPanel"
import axios from 'axios'
import DedicatedSearch from "../components/search/DedicatedSearch"
import SubmitButton from "../components/buttons/SubmitButton"

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

    const [value, setValue] = useState('')
    const [results, setResults] = useState([])
    const [network, setNetwork] = useState({nodes:[], links:[]})

    const handleChange = (e) => setValue(e.target.value)
    
    // const handleNetworkChange = () => {
    //     console.log("in handleNetworkChange: results:", results)
    //     const newArr = constructNetwork(results)
    //     setNetwork(newArr)
    // }

    const handleSearch = (e) => {
        e.preventDefault();

        // replace with appropriate search query structure for API endpoint
        axios.get(`http://localhost:3000/api/v1/_search/${value}`)
            // Set the results
            .then(response => {
                const results = response.data
                console.log({ results })
                setResults(results);
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

    const [panelData, setPanelData] = useState(tempObj);

    const nodeHoverTooltip = node => (`<div>${node.title}</div>`)

    const searchPanel = (node) => {
        const newNode = {...node}
        setPanelData(newNode)
    }

    // check if state changes -> if results changes update links and nodes
    // todo: should I be using useLayoutEffect?
    // todo: write post about different hooks
    useEffect(() => {
        // this is console logging different panelData    
        console.log("in useEffect: results:", results)
        const newArr = constructNetwork(results)
        setNetwork(newArr)
    }, [results])

    return (
        <Layout>
            <div className="container pt-8">
                <h3 className="py-4">Search...</h3>
                <form onSubmit={handleSearch} className="w-full mb-8">
                    <div className="grid grid-cols-4 gap-4">
                        <input
                            value={value}
                            onChange={handleChange}
                            className="col-span-4 sm:col-span-3 bg-white border p-3 mr-3 rounded text-gray-600 w-full"
                            placeholder="Explore publications..."
                        />
                        <SubmitButton
                            type="submit"
                            text="Search"
                        />
                    </div>
                </form>
                
                {
                    network.length != 0 ? (
                        <div className="col-span-9">
                            <ForceGraph
                                nodesData={network.nodes}
                                linksData={network.links}
                                nodeHoverTooltip={nodeHoverTooltip}
                                searchPanel={searchPanel} 
                            />
                        </div>
                    ) : 
                    <p>Loading</p>
                }

                { results.map(result => <div>hi</div>) }
            </div>
        </Layout>
    )
}