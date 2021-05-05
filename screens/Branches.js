import React from "react";
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

  const ListHeaderComponent = () => {
    return (
      <View style={styles.topView}>
        <Text style={styles.userText}>User</Text>
        <Button
          icon="plus"
          mode="contained"
          color={"#006bcc"}
          uppercase={false}
          style={{ borderRadius: 7 }}
          onPress={() => props.navigation.navigate("addbranch")}
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
          props.navigation.navigate("users", {
            branch: data.item.id,
            from: "branches",
          });
        }}
      >
        <Text style={{ fontSize: 18 }}>{data.item.name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={data?.branches}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
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
    paddingHorizontal: 13,
    paddingVertical: 18,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
