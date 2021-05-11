import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Layout from '../components/core/Layout'
import ForceGraph from '../components/network/ForceGraph'
import { constructNetwork } from '../utils/constructNetwork'

const NetworkPage = () => {
    const [value, setValue] = useState('')
    const [network, setNetwork] = useState({})

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

    return (
        <Layout>
            <div className="container pt-8">
                <form onSubmit={handleSubmit}>
                    <input
                        value={value}
                        onChange={handleChange}
                        placeholder="Search..."
                    />
                    <button type="submit" className="submit-btn">
                        Search
                    </button>
                </form>
            </div>
            <div className="container">
                <ForceGraph
                    data={network}
                    width={`100%`}
                    height={`100%`}
                />
            </div>
        </Layout>
    )
}

export default NetworkPage


//     const [data, setData] = useState(0);

//     const changeData = () => {
//         setData(constructNetwork(data))
//     }

//     useEffect(
//         () => {
//             setData(constructNetwork())
//         }, [!data]
//     )

//     return (
//         <div>
//             <button onClick={changeData}>Transform</button>
//             <ForceGraph={data} />
//         </div>
//     )