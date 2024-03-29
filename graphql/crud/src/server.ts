import { UserDao } from './dao/UserDao';
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express'
import { User } from './entities/User';

const typeDefs = gql`

    type User {
        id: String
        first_name: String
    }
    
    type Query {
        users: [User]
    }

    type Mutation {
        createUser(firstName:String!): User!
        updateUser(firstName:String!): User!
        deleteUser(id:Int!): Boolean
    }
`

const userDao = new UserDao()
const resolvers = {
    Query: {
        users: () => userDao.getUsers(),
    },
    Mutation : {
        createUser: (user:User) => userDao.createUser(user)
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
