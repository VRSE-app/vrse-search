import React from "react"

import Layout from "../components/core/Layout"
import SEO from "../components/core/seo"

const About = () => (
    <Layout>
        <SEO title="About" />
        <div className="container pt-12">
            <h1>About</h1>
            <p>VRSE is built on top of a number of technologies including GatbsyJS, ReactJS, SCSS, TailwindCSS, 
            Docker, UpCloud, Linux, ElasticSearch, NodeJS, ExpressJS, bash and more.</p>
        </div>
    </Layout>
)

export default About;
