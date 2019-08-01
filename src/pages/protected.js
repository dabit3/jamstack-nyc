import React, { useEffect, useState } from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"

import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

const Protected = () => {
  const [user, setUser] = useState({})
  useEffect(() => {

  })
  return (
    <Layout>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

export default withAuthenticator(Protected, {
  includeGreetings: true
})
