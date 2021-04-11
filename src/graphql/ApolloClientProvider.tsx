import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
      uri: 'http://10.255.126.117:1337/graphql',
      cache: new InMemoryCache()
});
