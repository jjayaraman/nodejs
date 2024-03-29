"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserDao_1 = require("./dao/UserDao");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = (0, apollo_server_express_1.gql) `

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
`;
const userDao = new UserDao_1.UserDao();
const resolvers = {
    Query: {
        users: () => userDao.getUsers(),
    },
    Mutation: {
        createUser: (user) => userDao.createUser(user)
    }
};
// Apollo 
const server = new apollo_server_express_1.ApolloServer({ typeDefs, resolvers });
const app = (0, express_1.default)();
server.start().then(() => {
    server.applyMiddleware({ app });
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Express server listening on http://localhost:3000${server.graphqlPath}`);
    });
});
