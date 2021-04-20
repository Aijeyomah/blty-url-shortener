import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import config, { appConfig } from './config';
import initLogger from './config/logger';
import { typeDefs, resolvers } from './app/graphql';

const app = express();

const winstonLogger = initLogger(config.NODE_ENV);
// sets logger as a global variable
global.logger = winstonLogger;

// instantiate apollo server and Pass schema definition and resolvers to the
// ApolloServer constructor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});
// app config
appConfig(app, server);

export default app;
