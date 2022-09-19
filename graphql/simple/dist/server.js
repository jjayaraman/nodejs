"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const customer_json_1 = __importDefault(require("./fakedata/customer.json"));
const typeDefs = (0, apollo_server_express_1.gql) `

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
`;
const resolvers = {
    Query: {
        customers: () => customer_json_1.default
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
