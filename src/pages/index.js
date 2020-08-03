import React from "react"
import Video from "../components/video"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Click the button to watch a random video</h1>
    <h4>Break your video-watching habits</h4>
    <Video />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}></div>
  </Layout>
)

export default IndexPage
