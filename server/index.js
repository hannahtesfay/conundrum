// convention to separate dependency and relative imports
const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose'); 

const typeDefs = require('./graphQL/typeDefs')
const resolvers = require('./graphQL/resolvers');
const { MONGODB } = require('./config.js') 

const pubsub = new PubSub();

const PORT = process.env.PORT || 5000

// server instance
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req, pubsub }) // takes request body and forwards it to context and now we can access req body
});

mongoose.connect(MONGODB, { useNewUrlParser: true })
    .then(() => {
        console.log('MongoDB connected');
        return server.listen({ port: PORT });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`)
    })
    .catch(err => {
        console.error(err)
    })
// starting server


