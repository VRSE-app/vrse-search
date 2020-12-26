import React, { useState } from "react";
import axios from 'axios';

import SEO from "../components/seo";
import Layout from "../components/core/Layout";
import DedicatedSearch from "../components/search/DedicatedSearch";
import SearchResultList from "../components/search/SearchResultList";

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [searched, setSearched] = useState(false);

    function handleSearch(e) {
        e.preventDefault();

        const key = process.env.GATSBY_UNSPLASH_API_KEY;
        // replace with appropriate search query structure for API endpoint
        axios.get(`http://localhost:3000/api/v1/_search`)
            // Set the results
            .then(response => {
                console.log(response);
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
                {/* <SearchResultsParent results={results} searched={searched} /> */}
                <SearchResultList
                    results={results}
                    searched={searched}
                />
            </div>
        </Layout>
    );
}

export default Search;