import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName,Image } from 'react-native';
import {Button} from 'react-native-paper';
import LoginScreen from '../screens/login';
import HomeScreen from '../screens/homeScreen'
import ProcessScreen from '../screens/processScreen';
import PreProcessScreen from '../screens/preProcessScreen';
import QuestionsScreen from '../screens/questionsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';


const Navigation = (props) => {
  return (
    <NavigationContainer>
      <MainStackNavigator isLoggedIn={props.isLoggedIn}/>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});
export default connect(mapStateToProps)(Navigation);

const MainStack = createStackNavigator();
const MainStackNavigator = (props) => {
  return (
    <MainStack.Navigator  initialRouteName="login">
      {console.log("Logged in ----",props.isLoggedIn)}
      {!props.isLoggedIn?(<> 
       <MainStack.Screen name="login"
        component={LoginScreen} options={{headerShown:false}}/>
        </>):(<>
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
        <MainStack.Screen name="preProcessScreen"
        component={PreProcessScreen}
        initialParams={{ operationTheaterName: "" }}
        options={({ route }) => ({ 
          title: route.params.operationTheaterName,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          })}
        />
        <MainStack.Screen name="processScreen"
        component={ProcessScreen}
        initialParams={{ resourceName: "" }}
        options={({ route }) => ({ 
          title: route.params.resourceName,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
          },
          })}
        />
        <MainStack.Screen name="questionsScreen"
        component={QuestionsScreen}
        initialParams={{ resourceName: "" }}
        options={({ route }) => ({ 
          title: route.params.resourceName,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#ff8d48',
          },
          })}
        />
        </>)
    }  
    </MainStack.Navigator>
  );
}
