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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Button } from "react-native-paper";



const Drawer = createDrawerNavigator();
const Navigation = (props) => {
  const logoutFunction = () => {
    props.changeLogOut();
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          icon={() => (
            <Image
              style={{ height: 30, width: 30 }}
              source={require("./../assets/screenIcons/logout.svg")}
            />
          )}
          label={() => (
            <Text
              style={{ fontWeight: "bold", fontSize: 16, color: "#707070" }}
            >
              Logout
            </Text>
          )}
          onPress={logoutFunction}
        />
      </DrawerContentScrollView>
    );
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
          drawerContent={(props) => <CustomDrawerContent {...props} />}
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
              backgroundColor: "#3c7d4d",
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
        
       
        
        
      </>
    </MainStack.Navigator>
  );
};

const UserStack = createStackNavigator();
const UserStackNavigator = (props) => {
  return (
    <UserStack.Navigator
    // initialRouteName={type === "OTSuperUser" ? "branches" : "users"}
    >
    </UserStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackNavigator = (props) => {
  return (
    <ProfileStack.Navigator initialRouteName="profile">
      
      
    </ProfileStack.Navigator>
  );
};
