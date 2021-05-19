import React from "react";
// import axios from 'axios';
import Layout from "../components/core/Layout";
import SEO from "../components/core/seo";
// import SearchBar from '../components/search/SearchBar';
import Logo from "../assets/images/logo.svg";
import { Link } from "gatsby"

const Index = () => {
  // const [searchTerm, setSearchTerm] = useState('');
  // const [searched, setSearched] = useState(false);
  
  return (
    <Layout>
      <SEO title="Home" />
      <div className="container-md mx-auto align-middle pt-28">
        <img className="h-64" src={Logo} alt="logo"/>
        <div className="mt-8 bg-white p-5 rounded-md">
          <p>
            VRSE is short for the <strong>Visual Research Search Engine</strong>. 
            This is a proof of concept for using visual search result 
            representation to encode publication metadata. The data was obtained 
            from the <strong>Semantic Scholar Open Research Corpus</strong> and contains approximately 
            <strong> 25 million</strong> research publications on a range of subjects.
            <br/><br/>
            <Link to="/visualSearch" className="underline font-bold hover:text-blue-700">Why not give visual search a try</Link>
          </p>
        </div>
        {/* <SearchBar
          searchTerm={searchTerm}
          handleChange={(value) => setSearchTerm(value)}
          handleSearch={e => handleSearch(e)}
        /> */}
      </div>
    </Layout>
  );
}

export default Index;
