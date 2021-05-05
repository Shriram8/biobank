import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SectionList } from "react-native";
import { Button, IconButton, Title } from "react-native-paper";
import { GetUsers, DeactivateUser } from "../src/graphql/queries";
import { useQuery, useMutation } from "@apollo/client";
// import Popover from "react-native-popover-view";
import { TouchableOpacity } from "react-native";
import { client } from "../src/graphql/ApolloClientProvider";
import { connect } from "react-redux";

const apolloClient = client;

const Users = (props) => {
  // const [showPop, setShowPop] = useState(false);
  const [sectionData, setSectionData] = useState([]);
  // const [deactivateId, setDeactivateId] = useState("");

  const { data, refetch } = useQuery(GetUsers, {
    fetchPolicy: "network-only",
    variables: {
      branch:
        props.route.params?.from === "branches"
          ? props.route.params?.branch
          : props.branch,
    },
  });

  let [deactivateUser, { data: deactivatedData }] = useMutation(
    DeactivateUser,
    {
      onCompleted: () => {
        refetch();
        // setShowPop(false);
      },
    }
  );

  const DATA = [
    {
      title: "Staff",
      data: [],
    },
    {
      title: "Incharge",
      data: [],
    },
    {
      title: "Admin",
      data: [],
    },
  ];

  useEffect(() => {
    if (data) {
      for (let index = 0; index < data.appUsers.length; index++) {
        switch (data.appUsers[index].userType) {
          case "OTStaff":
            DATA[0].data.push(data.appUsers[index]);
            break;
          case "OTIncharge":
            DATA[1].data.push(data.appUsers[index]);
            break;
          case "OTAdmin":
            DATA[2].data.push(data.appUsers[index]);
            break;
        }
      }
      setSectionData(DATA);
    }
  }, [data]);

  const emptyComponent = () => {
    return <Text style={styles.empty}>No members</Text>;
  };

  const deactivate = (id) => {
    deactivateUser({
      variables: {
        userId: id,
        active: false,
      },
    });
  };

  const Item = ({ title }) => (
    <TouchableOpacity
      style={styles.ItemContainer}
      onPress={() => {
        props.navigation.navigate("adduser", {
          from: "admin",
          userId: title.id,
          userType: title.userType,
        });
      }}
    >
      <Text style={{ fontSize: 18, paddingVertical: 10 }}>{title.name}</Text>
      {title.active && (
        <IconButton
          icon="delete-outline"
          color={"#010101"}
          size={20}
          onPress={() => {
            // setShowPop(true);
            // setDeactivateId(title.id);
            deactivate(title.id);
          }}
        />
      )}
    </TouchableOpacity>
  );

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
          onPress={() =>
            props.navigation.navigate("adduser", {
              branch:
                props.route.params?.from === "branches"
                  ? props.route.params?.branch
                  : props.branch,
            })
          }
        >
          Add
        </Button>
      </View>
    );
  };

  return (
    <>
      <SectionList
        sections={sectionData}
        keyExtractor={(item, index) => item + index}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item }) => <Item title={item} />}
        ListEmptyComponent={emptyComponent}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.title}>{title}</Text>
        )}
      />
      {/* <Popover
        popoverStyle={styles.popsStyle}
        isVisible={showPop}
        onRequestClose={() => setShowPop(false)}
      >
        <Title style={styles.heading}>Deactivate user</Title>
        <Text style={styles.text}>Are you sure to deactivate the user?</Text>
        <View style={styles.buttonView}>
          <Button
            mode="contained"
            color={"#006bcc"}
            labelStyle={{ color: "#fff" }}
            onPress={() => setShowPop(false)}
          >
            Cancel
          </Button>
          <Button
            mode="contained"
            labelStyle={{ color: "#fff" }}
            color={"#A9A9A9"}
            onPress={() => deactivate()}
          >
            Deactivate
          </Button>
        </View>
      </Popover> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  branch: state.branch,
});

export default connect(mapStateToProps)(Users);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  empty: {
    textAlign: "center",
    paddingVertical: 20,
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
  title: {
    marginBottom: 18,
    marginLeft: 17,
    fontSize: 18,
    fontWeight: "bold",
  },
  marginTop: {
    marginTop: 20,
  },
  popsStyle: {
    width: 300,
    paddingVertical: 20,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 30,
  },
  text: {
    textAlign: "center",
    paddingVertical: 20,
  },
  heading: {
    textAlign: "center",
  },
});
