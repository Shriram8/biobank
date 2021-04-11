import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
      uri: 'http://10.0.0.67:1337/graphql',
      cache: new InMemoryCache()
});
