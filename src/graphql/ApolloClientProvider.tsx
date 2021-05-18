import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import ConfigureStore from '../Store/ConfigureStore';
import { setContext } from '@apollo/client/link/context';
import {store} from './../../App.js'; 
// export const client = new ApolloClient({
//       uri: 'http://localhost:1337/graphql',
//       //'http://135.181.82.22:1337/graphql',
//       cache: new InMemoryCache( )
// });

 

 



export const cache = new InMemoryCache({ })
const httpLink = createHttpLink({
  uri: "http://135.181.82.22:1337/graphql" 
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  //const token = localStorage.getItem('token');
  //const state = ConfigureStore.getState();
  let store1 = store; 
  const token = store.getState().jwtToken;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: cache
});
