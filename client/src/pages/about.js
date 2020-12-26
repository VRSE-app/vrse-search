import React from "react"

import Layout from "../components/core/Layout"
import SEO from "../components/seo"

const About = () => (
    <Layout>
        <SEO title="About" />
        <div className="container pt-12">
            <h1>About</h1>
            <p>This is where the about section content can go</p>
        </div>
    </Layout>
)

export default About;
