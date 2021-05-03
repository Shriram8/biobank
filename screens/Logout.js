import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { connect } from "react-redux";
const Logout = (props) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button mode="contained" color={"#006bcc"} onPress={props.changeLogOut}>
        Logout
      </Button>
    </View>
  );
};
const mapStateToProps = () => ({
  isLoggedIn: false,
});

const mapDispatchToProps = (dispatch) => {
  return {
    changeLogOut: () =>
      dispatch({
        type: "CHANGE_LOGOUT",
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);
