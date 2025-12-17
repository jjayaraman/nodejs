var express = require('express')
var { graphqlHTTP } = require('express-graphql')
var { buildSchema } = require('graphql')

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    hello: String,
    jay(name:String):String
  }
`)

// The root provides a resolver function for each API endpoint
var resolvers = {
  hello: () => {
    return 'Hello world!'
  },
  jay: (data) => {
    return `hey ${data.name}!`
  },
}

var app = express()
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
  })
)
app.listen(4000)
console.log('Running a GraphQL API server at http://localhost:4000/graphql')
