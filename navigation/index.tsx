import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/homeScreen'


export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

const MainStack = createStackNavigator();
function MainStackNavigator() {
  return (
    <MainStack.Navigator screenOptions={{
    headerShown: false}} initialRouteName="login">
      <MainStack.Screen name="login"
        component={LoginScreen}/>
        <MainStack.Screen name="homeScreen"
        component={HomeScreen}/>
    </MainStack.Navigator>
  );
}
