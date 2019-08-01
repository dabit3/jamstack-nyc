import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

import Amplify from 'aws-amplify'
import config from '../aws-exports'
Amplify.configure(config)

console.log('Amplify: ', Amplify)

export const query = graphql`
  query list {
    talks {
      listTalks {
        items {
          id
          name
          description
          speakerName
        }
      }
    }
  }
`

const IndexPage = ({ data }) => {
  console.log('data: ', data)
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
     
      {
        data.talks.listTalks.items.map((i, index) => (
          <div>
            <h2 key={index}>{i.speakerName}</h2>
            <p key={index}>{i.name}</p>
            <p key={index}>{i.description}</p>
          </div>
        ))
      }
      <Link to="/protected">Protected</Link>
    </Layout>
  )
}

export default IndexPage
