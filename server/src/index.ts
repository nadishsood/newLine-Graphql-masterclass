

import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
// import { schema } from './graphql/index';
import { connectDatabase } from './database';
import { typeDefs, resolvers } from './graphql/index';


const port = 8000;

const mount = async (app: Application) => {
    const db = await connectDatabase();

const server = new ApolloServer({ typeDefs, resolvers, context: () => ({ db }) });

server.applyMiddleware({ app, path: '/api' });
console.log(`[app] : http://localhost:${port}`);
app.listen(port);

const listings = await db.listings.find({}).toArray();
  console.log(listings);

}

mount(express());


