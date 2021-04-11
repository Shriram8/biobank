import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { ApolloProvider } from '@apollo/client';
import {client} from "./src/graphql/ApolloClientProvider";

import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './src/Store/ConfigureStore';


import {createStore} from 'redux';


const apolloClient = client;
const initialState ={
  isLoggedIn : false
}
const reducer = (state = initialState, action) =>{
  console.log("Action type__",action.type);
  switch (action.type) {
    case 'CHANGE_LOGIN':
      console.log("Trying to change login");
      return {
        isLoggedIn: true
      }
    default:
      break;
  }
  return state
}
const store = createStore(reducer);


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
    <Provider store = { store }>
      <ApolloProvider client={apolloClient}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme}/>
          {/* <LoginScreen/> */}
          <StatusBar />
        </SafeAreaProvider>
      </ApolloProvider>
    </Provider>
  
    );
  }
}
