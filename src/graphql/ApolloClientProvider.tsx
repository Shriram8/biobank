import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
      uri: 'http://135.181.82.22:1337/graphql',
      cache: new InMemoryCache()
});
