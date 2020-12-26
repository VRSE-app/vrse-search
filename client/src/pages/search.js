import React from "react";
import SEO from "../components/seo";
import Layout from "../components/core/Layout";
import SearchParent from "../components/search/SearchParent";

const Search = () => {
    return (
        <Layout>
            <SEO title="Home" />
            <div className="container pt-8">
                <h3 className="py-4">Search...</h3>
                <SearchParent />
            </div>
        </Layout>
    );
}

export default Search;