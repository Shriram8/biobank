import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { ApolloProvider } from "@apollo/client";
import { client } from "./src/graphql/ApolloClientProvider";

import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import configureStore from "./src/Store/ConfigureStore";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { PersistGate } from "redux-persist/integration/react";

const apolloClient = client;
const initialState = {
  isLoggedIn: false,
  userId: "",
};
const reducer = (state = initialState, action) => {
  //console.log("Action type__",action.type);
  switch (action.type) {
    case "CHANGE_LOGIN":
      //console.log("Trying to change login",action.payload.userId);
      return {
        isLoggedIn: true,
        userId: action.payload.userId,
      };
    case "CHANGE_LOGOUT":
      console.log("----CALLED");
      return {
        isLoggedIn: false,
        userId: "",
      };
    default:
      break;
  }
  return state;
};

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};
const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(persistedReducer);
const persister = persistStore(store);

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <ApolloProvider client={apolloClient}>
          <SafeAreaProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </SafeAreaProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}
