import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import ConfigureStore from '../Store/ConfigureStore';
import { setContext } from '@apollo/client/link/context';

export const client = new ApolloClient({
      uri: 'http://localhost:1337/graphql',
      cache: new InMemoryCache( { addTypename: false })
});