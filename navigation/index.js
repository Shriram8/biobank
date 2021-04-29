// import * as React from 'react';
// import { Button, View } from 'react-native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { NavigationContainer } from '@react-navigation/native';

// const Drawer = createDrawerNavigator();

// export default function Navigation() {
//   return (
//     <NavigationContainer>
//       <Drawer.Navigator initialRouteName="Home">
//         <Drawer.Screen name="Home" component={HomeScreen} />
//         <Drawer.Screen name="Notifications" component={NotificationsScreen} />
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
  useNavigation,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import {    ColorSchemeName, Image, Text, View } from "react-native";
import LoginScreen from "../screens/login";
import HomeScreen from "../screens/homeScreen";
import ProcessScreen from "../screens/processScreen";
import PreProcessScreen from "../screens/preProcessScreen";
import QuestionsScreen from "../screens/questionsScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import MenuDrawer from "react-native-side-drawer";
import { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native-paper";
import Alerts from "../screens/Alerts";
import HistoryScreen from "../screens/HistoryScreen";
import Logout from "../screens/Logout";
 
 
const Drawer = createDrawerNavigator();
const Navigation = (props) => { 
  return (
    <NavigationContainer>
      {/* <MainStackNavigator isLoggedIn={props.isLoggedIn}  /> */}
      {props.isLoggedIn ? (
        <Drawer.Navigator
        drawerContentOptions={{
          activeBackgroundColor:"#f1f1f1",
          activeTintColor: '#010101',
          // labelStyle:{ alignSelf:'center'},
          itemStyle: {  },
        }}
        initialRouteName="History">
          <Drawer.Screen 
          headerShown={true}
          options={{
            headerShown:true,
            drawerIcon:(()=><MaterialCommunityIcons  name={"home"}  size={30} color="#010101"/>),
            headerRight: () => (
                <Button
                  
                  icon={() => (
                    <MaterialCommunityIcons
                      name="bell"
                      size={30}
                      color="#000"
                    />
                  )}
                ></Button>
              )
          }}
          name="Home" component={MainStackNavigator} />
          <Drawer.Screen 
          headerShown={true}
          options={{
            headerShown:true,
            drawerIcon:(()=><MaterialCommunityIcons  name={"alert-box"}  size={30} color="#010101"/>)
          }}
          name="Alerts" component={Alerts} />
          <Drawer.Screen 
          headerShown={true}
          options={{
            headerShown:true,
            drawerIcon:(()=><Image style={{height:30,width:30 }} source={require("./../assets/screenIcons/history.svg")} />) 
          }}
          name="History" component={HistoryScreen} />
          <Drawer.Screen 
          headerShown={true}
          options={{
            headerShown:true,
            drawerIcon:(()=><Image style={{height:30,width:30 }} source={require("./../assets/screenIcons/logout.svg")} />) 
          }}
          name="Logout" component={Logout} />
          
        </Drawer.Navigator>
      ) : (
        <MainStack.Navigator initialRouteName="login">
          <MainStack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
});
export default connect(mapStateToProps)(Navigation);

const MainStack = createStackNavigator();
const MainStackNavigator = (props) => {
  return (
    <MainStack.Navigator initialRouteName="login">
      
        <>
          <MainStack.Screen
            name="homeScreen"
            component={HomeScreen}
            options={{
              title: "",
              headerStyle: {
                elevation: 0,
                backgroundColor: "#006bcc",
              },
              headerLeft: () => (
                <Button
                  onPress={() => {
                     props.navigation.openDrawer();
                  }}
                  icon={() => (
                    <MaterialCommunityIcons
                      name="menu"
                      size={30}
                      color="white"
                    />
                  )}
                ></Button>
              ),
              headerRight: () => (
                <Button
                  icon={() => (
                    <MaterialCommunityIcons
                      name="bell"
                      size={30}
                      color="white"
                    />
                  )}
                ></Button>
              ),
            }}
          />
          <MainStack.Screen
            name="preProcessScreen"
            component={PreProcessScreen}
            initialParams={{ operationTheaterName: "" }}
            options={({ route }) => ({
              title: route.params.operationTheaterName,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "white",
              },
            })}
          />
          <MainStack.Screen
            name="processScreen"
            component={ProcessScreen}
            initialParams={{ resourceName: "" }}
            options={({ route }) => ({
              title: route.params.resourceName,
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "white",
              },
            })}
          />
          <MainStack.Screen
            name="questionsScreen"
            component={QuestionsScreen}
            initialParams={{ resourceName: "" }}
            options={({ route }) => ({
              title: route.params.resourceName,
              headerTitleAlign: "center",
              headerStyle: {
                elevation: 0,
                backgroundColor: "#ff8d48",
              },
            })}
          />
        </> 
    </MainStack.Navigator>
  );
};
