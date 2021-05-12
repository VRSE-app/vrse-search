import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Layout from '../components/core/Layout'
import ForceGraph from '../components/network/ForceGraph'
import SearchPanel from '../components/search/SearchPanel'
import SubmitButton from '../components/buttons/SubmitButton'

import { constructNetwork } from '../utils/constructNetwork'
const NetworkPage = () => {
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
    }

    const nodeHoverTooltip = node => (`<div>${node.title}</div>`)

    const searchPanel = (node) => {
        const newNode = {...node}
        setPanelData(newNode)
    }

    return (
        <Layout>
            <div className="container pt-8">
                <h3 className="py-4">Search...</h3>
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
                        // this does not update
                        node={panelData}
                        onChange={searchPanel}
                    />
                </div>
            </div>
        </Layout>
    )
}

export default NetworkPage

// todo: fix box sizing
// todo: add back nodeHoverToolTip
// todo: add back searchPanel
// todo: clean up code and remove all unused versions of this file
// todo: unify two search experiences
// todo: make progress on report
// todo: check deadlines for this project... 
// todo: start planning data upload