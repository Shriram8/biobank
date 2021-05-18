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
import { Provider as PaperProvider } from "react-native-paper";
const apolloClient = client;
const initialState = {
  isLoggedIn: false,
  userId: "",
  userType: "",
  branch: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_LOGIN":
      console.log("Trying to change login", action.payload);
      return {
        isLoggedIn: true,
        userId: action.payload.userId,
        userType: action.payload.userType,
        branch: action.payload.branch,
        branchName: action.payload.branchName,
        jwtToken: action.payload.jwtToken
      };
    case "CHANGE_LOGOUT":
      return {
        isLoggedIn: false,
        userId: "",
        userType: "",
        branch: "",
        branchName: "",
        jwtToken:"",
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
export const store = createStore(persistedReducer);
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
            <PaperProvider>
              <Navigation colorScheme={colorScheme} />
              <StatusBar />
            </PaperProvider>
          </SafeAreaProvider>
        </ApolloProvider>
      </Provider>
    );
  }
}
