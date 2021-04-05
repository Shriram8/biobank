import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName,Image } from 'react-native';
import {Button} from 'react-native-paper';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/homeScreen'
import ProcessScreen from '../screens/processScreen'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


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
    <MainStack.Navigator  initialRouteName="login">
      <MainStack.Screen name="login"
        component={LoginScreen} options={{headerShown:false}}/>
        <MainStack.Screen name="homeScreen"
        component={HomeScreen}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: '#006bcc',
          },
          headerLeft: () => (
            <Button icon={() => (
              <MaterialCommunityIcons
              name='menu' size={30} color="white"/>
              )}>
            </Button>
          ),
          headerRight: () => (
            <Button icon={() => (
              <MaterialCommunityIcons
              name='bell' size={30} color="white"/>
              )}>
            </Button>
          ),
        }}/>
        <MainStack.Screen name="processScreen"
        component={ProcessScreen}
        initialParams={{ resourceName: "" }}
        options={({ route }) => ({ 
          title: route.params.resourceName,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerLeft: () => (
            <Button icon={() => (
              <MaterialCommunityIcons
              name='chevron-left' size={30} color="black"/>
              )}>
            </Button>
          )})}
        />
    </MainStack.Navigator>
  );
}
