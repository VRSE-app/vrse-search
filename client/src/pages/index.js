import React, { useState } from "react";
import axios from 'axios';
import Layout from "../components/core/Layout";
import SEO from "../components/core/seo";
import SearchBar from '../components/search/SearchBar';
import Logo from "../assets/images/logo.svg";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(false);

  const key = process.env.GATSBY_UNSPLASH_API_KEY;

  const handleSearch = () => {

  }
  
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container-md mx-auto align-middle pt-28">
        <img className="h-64" src={Logo} alt="logo"/>
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
