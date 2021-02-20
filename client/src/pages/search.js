import React, { useState, useEffect } from "react";
import axios from 'axios';

import useDebounce from "../hooks/useDebounce";

import SEO from "../components/core/seo";
import Layout from "../components/core/Layout";
import DedicatedSearch from "../components/search/DedicatedSearch";
import SearchResultList from "../components/search/SearchResultList";

// const fs = require('fs')

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce(searchTerm, 500);

    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    console.log({ results });
    
    function handleSearch(e) {
        e.preventDefault();

        // replace with appropriate search query structure for API endpoint
        axios.get(`http://localhost:3000/api/v1/_search/${searchTerm}`)
            // Set the results
            .then(response => {
                const results = response.data.body.hits.hits;
                // we are not entering here
                setResults(results);
            })
            // Handle no results
            .catch(error => {
                console.log('error: ', error);
                setResults([]);
            })
            .finally(() => {
                setSearched(true);
            });
    }

    return (
        <Layout>
            <SEO title="Home" />
            <div className="container pt-8">
                <h3 className="py-4">Search...</h3>
                <DedicatedSearch
                    searchTerm={searchTerm}
                    handleChange={(value) => setSearchTerm(value)}
                    handleSearch={e => handleSearch(e)}
                />
            </div>
            {/* <SearchResultsParent results={results} searched={searched} /> */}
            <div className="pt-8 bg-gray-100">
                <div className="container">
                    <SearchResultList
                        results={results}
                        searched={searched}
                    />
                </div>
            </div>
        </Layout>
    );
}

export default Search;