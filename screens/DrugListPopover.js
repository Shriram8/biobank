import React from "react";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { Button, Portal } from "react-native-paper";
import { useQuery } from "@apollo/client";
import { GetDrugList } from "../src/graphql/queries";

const DrugListPopover = (props) => {
  const { data, refetch } = useQuery(GetDrugList);

  const renderItem = (data) => {
    return (
      <View
        style={[
          styles.headingView,
          { paddingVertical: 8 },
          data.index % 2 == 0 && { backgroundColor: "#f2f2f2" },
        ]}
      >
        <Text style={styles.drugList}>{data.item.name}</Text>
        <Text style={styles.qtyList}>{data.item.quantity}</Text>
        <Text style={styles.typeList}>{data.item.type}</Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View style={styles.mainHeaderView}>
          <Text style={styles.mainHeader}>Drugs List</Text>
          <Text style={styles.subHeader}>
            Confirm all the drugs in the list are availbale.
          </Text>
        </View>
        <View style={[styles.headingView, { marginBottom: 8 }]}>
          <Text style={styles.drugHeader}>Drug</Text>
          <Text style={styles.qtyHeader}>Qty</Text>
          <Text style={styles.typeHeader}>Type</Text>
        </View>
      </>
    );
  };

  return (
    <>
      {props.alert && (
        <Portal>
          <View style={styles.alertView}>
            <View style={styles.alertContainer}>
              <View style={{ marginBottom: 50 }}>
                <FlatList
                  data={data?.druglists}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id}
                  ListHeaderComponent={ListHeaderComponent}
                />
              </View>
            </View>
            <Button
              mode="contained"
              color={"#006bcc"}
              uppercase={false}
              style={styles.submitButton}
              labelStyle={{ fontSize: 16 }}
              onPress={props.onContinue}
            >
              Continue
            </Button>
          </View>
        </Portal>
      )}
    </>
  );
};

export default DrugListPopover;

const styles = StyleSheet.create({
  alertView: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "flex-end",
  },
  alertContainer: {
    backgroundColor: "#fff",
  },
  submitButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    justifyContent: "center",
  },
  mainHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 8,
  },
  subHeader: {
    fontWeight: "500",
    fontSize: 14,
  },
  headingView: {
    flexDirection: "row",
    paddingHorizontal: 16,
  },
  drugHeader: {
    flex: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  qtyHeader: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  typeHeader: {
    flex: 2,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  drugList: {
    flex: 5,
    fontSize: 18,
  },
  qtyList: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
  },
  typeList: {
    flex: 2,
    fontSize: 18,
    textAlign: "right",
  },
  mainHeaderView: {
    marginVertical: 26,
    marginHorizontal: 16,
  },
});
