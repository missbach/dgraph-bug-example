import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFile } from 'fs/promises';
import gql from 'graphql-tag';

const typeDefs = gql(
  await readFile('src/schema.graphql', { encoding: 'utf-8' })
);

const orders = JSON.parse(
  await readFile('src/data.json', { encoding: 'utf-8' })
);

const getOrder = ({ id }) => orders.find(order => order.id === id);

const resolvers = {
  Query: {
    orders: () => orders,
    orderById: getOrder
  },
  Order: {
    __resolveReference: getOrder
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 }
});
console.log(`🚀  Server ready at ${url}`);
