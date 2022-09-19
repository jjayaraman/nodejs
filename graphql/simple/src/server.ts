import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express'
import { default as customers } from './fakedata/customer.json'

const typeDefs = gql`

    type Customer {
        id: String
        first_name: String
        last_name: String
        email: String
        phone: String
        house_number: Int
        street: String
        post_code: String
        city: String
        country: String
    }
    
    type Query {
        customers: [Customer]
    }
`

const resolvers = {
    Query: {
        customers: () => customers
    }

}

// Apollo 
const server = new ApolloServer({ typeDefs, resolvers })
const app = express()

server.start().then(() => {
    server.applyMiddleware({ app })

    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Express server listening on http://localhost:3000${server.graphqlPath}`);
    })
})