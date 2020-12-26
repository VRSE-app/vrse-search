import React, { useState } from "react";
import { Link } from "gatsby";
import axios from 'axios';
import Layout from "../components/core/Layout";
import SEO from "../components/seo";
import SearchBar from '../components/searchOld/SearchBar';
import Logo from "../assets/images/logo.svg";

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
      <div className="container-md mx-auto align-middle pt-28">
        <img className="h-64" src={Logo} />
        <SearchBar
          searchTerm={searchTerm}
          handleChange={(value) => setSearchTerm(value)}
          handleSearch={e => handleSearch(e)}
        />
      </div>
    </Layout>
  );
}

export default Index;
