import React, { useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import { getBranchDetails } from "../src/graphql/queries";
import { useQuery } from "@apollo/client";

const Branches = (props) => {
  const { data, refetch } = useQuery(getBranchDetails, {
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (props.route?.params?.from === "addbranch") {
      refetch();
    }
  }, [props.route]);

  const ListHeaderComponent = () => {
    return (
      <View style={styles.topView}>
        <Text style={styles.userText}>User</Text>
        <Button
          icon="plus"
          mode="contained"
          color={"#006bcc"}
          labelStyle={{ fontSize: 16 }}
          uppercase={false}
          style={{ borderRadius: 7 }}
          onPress={() =>
            props.navigation.navigate("userManagement", { screen: "addbranch" })
          }
        >
          Add
        </Button>
      </View>
    );
  };

  const emptyComponent = () => {
    return <Text style={styles.empty}>No members</Text>;
  };

  const renderItem = (data) => {
    return (
      <TouchableOpacity
        style={styles.ItemContainer}
        onPress={() => {
          props.navigation.navigate("userManagement", {
            screen: "users",
            params: {
              branch: data.item.id,
              from: "branches",
            },
          });
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {data.item.name}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={data?.branches}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ backgroundColor: "#fff" }}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={emptyComponent}
    />
  );
};
export default Branches;

const styles = StyleSheet.create({
  ItemContainer: {
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 60,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 6,
  },
  topView: {
    marginTop: 28,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  userText: {
    fontSize: 18,
    paddingLeft: 1,
    fontWeight: "bold",
  },
  empty: {
    textAlign: "center",
    paddingVertical: 20,
  },
});
