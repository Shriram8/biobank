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
import {
  createStackNavigator,
  HeaderBackButton,
} from "@react-navigation/stack";
import * as React from "react";
import { ColorSchemeName, Image, Text, View } from "react-native";
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
import Users from "../screens/Users";
import AddUser from "../screens/AddUser";
import Profile from "../screens/Profile";
import ProfilePassword from "../screens/ProfilePassword";
import Branches from "../screens/Branches";
import AddBranch from "../screens/AddBranch";

const Drawer = createDrawerNavigator();
const Navigation = (props) => {
  const logoutFunction = () => {
    props.changeLogOut();
    return null;
  };
  return (
    <NavigationContainer>
      {props.isLoggedIn ? (
        <Drawer.Navigator
          drawerContentOptions={{
            activeBackgroundColor: "#f1f1f1",
            activeTintColor: "#010101",
            headerShown: false,
            labelStyle: {
              fontSize: 16,
              fontWeight: "bold",
            },
            itemStyle: {
              flex: 1,
              justifyContent: "center",
            },
          }}
          drawerStyle={{
            paddingTop: 75,
          }}
          initialRouteName="Home"
        >
          <Drawer.Screen
            headerShown={false}
            options={{
              headerShown: false,
              drawerIcon: () => (
                <MaterialCommunityIcons
                  name={"home"}
                  size={30}
                  color="#010101"
                />
              ),
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
              ),
            }}
            name="Home"
            component={MainStackNavigator}
          />
          {props.userType !== "OTStaff" && (
            <Drawer.Screen
              headerShown={true}
              options={{
                headerShown: true,
                drawerIcon: () => (
                  <MaterialCommunityIcons
                    name={"alert-box"}
                    size={30}
                    color="#010101"
                  />
                ),
              }}
              name="Alerts"
              component={Alerts}
            />
          )}
          {props.userType !== "OTStaff" && props.userType !== "OTIncharge" && (
            <Drawer.Screen
              headerShown={true}
              options={{
                headerShown: true,
                drawerIcon: () => (
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("./../assets/screenIcons/history.svg")}
                  />
                ),
              }}
              name="History"
              component={HistoryScreen}
            />
          )}
          <Drawer.Screen
            headerShown={true}
            options={{
              // headerShown: true,
              drawerIcon: () => (
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("./../assets/screenIcons/profile.png")}
                />
              ),
            }}
            name="Profile"
            component={ProfileStackNavigator}
          />
          {props.userType !== "OTStaff" && props.userType !== "OTIncharge" && (
            <Drawer.Screen
              headerShown={true}
              options={{
                // headerShown: true,
                drawerIcon: () => (
                  <Image
                    style={{ height: 30, width: 30 }}
                    source={require("./../assets/screenIcons/group.png")}
                  />
                ),
              }}
              name="Users"
              component={(params) => UserStackNavigator(params, props.userType)}
            />
          )}
          <Drawer.Screen
            headerShown={true}
            options={{
              headerShown: true,
              drawerIcon: () => (
                <Image
                  style={{ height: 30, width: 30 }}
                  source={require("./../assets/screenIcons/logout.svg")}
                />
              ),
            }}
            name="Logout"
            component={logoutFunction}
          />
        </Drawer.Navigator>
      ) : (
        <MainStack.Navigator initialRouteName="login">
          <MainStack.Screen
            name="login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <MainStack.Screen
            name="setPassword"
            component={ProfilePassword}
            options={({ route }) => ({
              title: "Set Password",
              headerTitleAlign: "center",
              headerStyle: {
                backgroundColor: "white",
              },
            })}
          />
        </MainStack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: state.isLoggedIn,
  userType: state.userType,
});
const mapDispatchToProps = (dispatch) => {
  return {
    changeLogOut: () =>
      dispatch({
        type: "CHANGE_LOGOUT",
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);

const MainStack = createStackNavigator();
const MainStackNavigator = (props) => {
  return (
    <MainStack.Navigator initialRouteName="login">
      <>
        <MainStack.Screen
          name="homeScreen"
          component={HomeScreen}
          options={{
            headerShown: true,
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
                  <MaterialCommunityIcons name="menu" size={30} color="white" />
                )}
              ></Button>
            ),
            headerRight: () => (
              <Button
                icon={() => (
                  <MaterialCommunityIcons name="bell" size={30} color="white" />
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
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
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
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          })}
        />
        <MainStack.Screen
          name="questionsScreen"
          component={QuestionsScreen}
          initialParams={{ resourceName: "" }}
          options={({ route }) => ({
            headerShown: true,
            title: route.params.resourceName,
            headerTitleAlign: "center",
            headerStyle: {
              elevation: 0,
              backgroundColor: route.params.backgroundColor,
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: "bold",
            },
          })}
        />
      </>
    </MainStack.Navigator>
  );
};

const UserStack = createStackNavigator();
const UserStackNavigator = (props, type) => {
  return (
    <UserStack.Navigator
      initialRouteName={type === "OTSuperUser" ? "branches" : "users"}
    >
      <UserStack.Screen
        name="users"
        component={Users}
        options={({ route }) => ({
          title: "Users",
          headerTitleAlign: type === "OTSuperUser" ? "center" : "left",
          headerLeft: () => (
            <Button
              onPress={() => {
                if (type === "OTSuperUser") {
                  props.navigation.navigate("branches");
                } else {
                  props.navigation.openDrawer();
                }
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name={type === "OTSuperUser" ? "arrow-left" : "menu"}
                  size={25}
                  color="black"
                  style={{ marginLeft: 2 }}
                />
              )}
            ></Button>
          ),
        })}
      />
      <UserStack.Screen
        name="branches"
        component={Branches}
        options={({ route }) => ({
          title: "User Management",
          headerLeft: () => (
            <Button
              onPress={() => {
                props.navigation.openDrawer();
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name="menu"
                  size={25}
                  color="black"
                  style={{ marginLeft: 2 }}
                />
              )}
            ></Button>
          ),
        })}
      />
      <UserStack.Screen
        name="adduser"
        component={AddUser}
        options={({ route }) => ({
          headerShown: false,
          title: "Add a new user",
          headerTitleAlign: "center",
        })}
      />
      <UserStack.Screen
        name="addbranch"
        component={AddBranch}
        options={({ route }) => ({
          title: "Add a new branch",
          headerTitleAlign: "center",
        })}
      />
    </UserStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackNavigator = (props) => {
  return (
    <ProfileStack.Navigator initialRouteName="profile">
      <ProfileStack.Screen
        name="profile"
        component={Profile}
        options={({ route }) => ({
          title: "Profile",
          headerLeft: () => (
            <Button
              onPress={() => {
                props.navigation.openDrawer();
              }}
              icon={() => (
                <MaterialCommunityIcons
                  name="menu"
                  size={25}
                  color="black"
                  style={{ marginLeft: 2 }}
                />
              )}
            ></Button>
          ),
        })}
      />
      <ProfileStack.Screen
        name="profilepassword"
        component={ProfilePassword}
        options={({ route }) => ({
          title: "Change Password",
          headerTitleAlign: "center",
        })}
      />
    </ProfileStack.Navigator>
  );
};
