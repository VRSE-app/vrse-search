import React, { useState } from 'react'
import axios from 'axios'

import Layout from '../components/core/Layout'
import SubmitButton from '../components/buttons/SubmitButton'
import SearchResultList from '../components/search/SearchResultList'

const Search = () => {
    const [value, setValue] = useState('')
    const [results, setResults] = useState([])
    const [searched, setSearched] = useState(false)

    const handleChange = (e) => setValue(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        
        console.log({value})

        axios.get(`http://localhost:3000/api/v1/_search/${value}`)
            .then(response => {
                const newResults = response.data
                setResults(newResults)
            })
            .catch(error => {
                console.log({error})
            })
            .finally(() => setSearched(true))
    }

    return (
        <div className="bg-gray-100">
            <Layout>
                <div className="container align-middle pt-8">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full mb-8"
                    >
                        <div className="grid grid-cols-4 gap-4">
                            <input
                                value={value}
                                onChange={handleChange}
                                className="col-span-4 m-0 sm:col-span-3 bg-white border p-3 mr-3 rounded text-gray-600 w-full"
                                placeholder="Search..."
                            />
                            <SubmitButton 
                                type="submit"
                                text="Search"
                            />
                        </div>
                    </form>
                </div>
                <div className="bg-gray-100">
                    <div className="container">
                        <SearchResultList 
                            results={results} 
                            searched={searched}
                        />
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Search

// todo: make progress on report
// todo: send bob email update again
// todo: check deadlines for this project... 
// todo: start planning data upload
// todo: clear network on new search

// DONE
// todo: add back nodeHoverToolTip
// todo: add back searchPanel
// todo: fix box sizing
// todo: single colour scale for search representing year based on follow up with some of the user interviews
// todo: clean up code / performance optimisations
// todo: unify two search experiences