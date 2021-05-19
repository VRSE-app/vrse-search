import React, { useState } from 'react'
import axios from 'axios'

import Layout from '../components/core/Layout'
import ForceGraph from '../components/network/ForceGraph'
import SearchPanel from '../components/search/SearchPanel'
import SubmitButton from '../components/buttons/SubmitButton'

import { constructNetwork } from '../utils/constructNetwork'

const VisualSearch = () => {
    // todo: this should be proptypes or some typescript thing right?
    const tempObj = {
        id: "",
        title: "",
        year: "",
        abstract: "",
        authors: [],
        score: "",
        s2Url: "",
        doiUrl: "",
        fieldsOfStudy: ""
    }

    const [value, setValue] = useState('')
    const [network, setNetwork] = useState({})
    const [panelData, setPanelData] = useState(tempObj);
    const [searched, setSearched] = useState(false)

    const handleChange = (e) => setValue(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        console.log({value})

        axios.get(`http://localhost:3000/api/v1/_search/${value}`)
            .then(response => {
                const results = response.data
                console.log({results})
                const newNetwork = constructNetwork(results)
                setNetwork(newNetwork)
            })
            .catch(error => {
                console.log({error})
            })
            .finally(() => setSearched(true))
    }

    function formatTooltipAbstract(input) {
        var text = ""

        if (input.length === 0) {
            text = "No abstract found."
        } else if (input.length > 300) {
            text = input.substring(0,300) + '...'
        } else {
            text = input.substring(0,300)
        }

        return text
    }

    const nodeHoverTooltip = node => {
        var panel = document.getElementById("search-panel")
        panel.style.opacity = "1.0"

        return (`<div>
            <h4>${node.title}</h4>
            <p>${node.year}</p>
            <p>${formatTooltipAbstract(node.abstract)}</p>
        </div>`)
    }

    const searchPanel = node => {
        const newNode = {...node}
        setPanelData(newNode)
    }

    return (
        <Layout>
            <div className="container-md mx-auto align-middle pt-8">
                <form
                    onSubmit={handleSubmit}
                    className="w-full mb-8"
                >
                    <div className="grid grid-cols-4 gap-4">
                        <input
                            value={value}
                            onChange={handleChange}
                            className="col-span-4 sm:col-span-3 bg-white border p-3 mr-3 rounded text-gray-600 w-full"
                            placeholder="Search..."
                        />
                        <SubmitButton 
                            type="submit"
                            text="Search"
                        />
                    </div>
                </form>
            </div>
                {
                    network.length !== 0 ? (
                        <div className="grid grid-cols-12">
                            <div className="col-span-9">
                                <ForceGraph
                                    data={network}
                                    nodeHoverTooltip={nodeHoverTooltip}
                                    searchPanel={searchPanel}
                                />
                            </div>
                            <div className="col-span-3">
                                <SearchPanel 
                                    node={panelData}
                                    onChange={searchPanel}
                                />
                            </div>
                        </div>  
                    ) :
                    (<div></div>)
                }
        </Layout>
    )
}

export default VisualSearch