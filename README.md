# JAMstack with Gatsby & AWS Amplify

To get started, first initialize an Amplify project:

```
amplify init
```

## GraphQL Static Queries

1. Install dependencies

```sh
npm install gatsby-source-graphql aws-amplify aws-amplify-react
```

2. Add the GraphQL API

```sh
amplify add api
```

3. Set the GraphQL Schema

```graphql
type Talk @model {
  id: ID!
  name: String!
  description: String!
  speakerName: String!
}
```

4. Deploy the API

```sh
amplify push
```

5. Set the plugin configuration in the plugins array of `gatsby-config.js`

```js
plugins: [
  {
    resolve: 'gatsby-source-graphql',
    options: {
      typeName: 'Talk',
      fieldName: 'talks',
      url: '<APPSYNC_URL>',
      headers: {
        'x-api-key': '<APPSYNC_API_KEY>'
      }
    }
  }
  // ...
]
```

6. Query from the client

```js
/* import graphql */
import { Link, graphql } from "gatsby"

/* define query */
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

/* data is available in the app */
const IndexPage = ({ data }) => {}
```

## Authentication

1. Add authentication

```sh
amplify add auth

? Do you want to use the default authentication and security configuration? Default configuration
? How do you want users to be able to sign in? Username
? Do you want to configure advanced settings? No, I am done.
```

2. Configure Amplify

```js
import Amplify from '@aws-amplify/core'
import config from '../aws-exports'
Amplify.configure(config)
```

3. Create new protected route with basic component. Here, add the `withAuthenticator` HOC to render auth flow:

```js
import React, { useEffect, useState } from "react"
import { Link } from 'gatsby'

import Layout from "../components/layout"

import { withAuthenticator } from 'aws-amplify-react'
import { Auth } from 'aws-amplify'

const Protected = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => console.log({ user }))
      .catch(err => console.log('user not signed in!: ', err))
  }, [])
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
```

