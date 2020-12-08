import React, { useState } from "react";
import { Link } from "gatsby";
import axios from 'axios';
import Layout from "../components/core/Layout";
import SEO from "../components/seo";

import SearchBar from '../components/search/SearchBar';
import SearchResultList from "../components/search/SearchResultList";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  const key = process.env.GATSBY_UNSPLASH_API_KEY;

  function handleSearch(e) {
    e.preventDefault();

    axios.get(`http://localhost:3000/vrse-search/search_/?title=${key}`)
      // Set the results
      .then(response => {
        const images = response.data.results;

        setResults(images);
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
      <div className="bg-teal-100 h-64">
        <div className="container mx-auto align-middle">
          <SearchBar
            searchTerm={searchTerm}
            handleChange={(value) => setSearchTerm(value)}
            handleSearch={e => handleSearch(e)}
          />
        </div>
      </div>
      <div className="container mx-auto mt-6">
        <SearchResultList
          results={results}
          searched={searched}
        />
      </div>
    </Layout>
  );
}

export default Index;
