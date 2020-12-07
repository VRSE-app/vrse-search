import React from "react";
import { Link } from "gatsby";

import Layout from "../components/core/Layout";
import Image from "../components/image";
import SEO from "../components/seo";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div className="container bg-primary">
      <h1>Hi people</h1>
    </div>
    <p className="text-blue-400">Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
  </Layout>
)

export default IndexPage
