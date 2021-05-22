import { useQuery } from '@apollo/client';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import { StyleSheet } from 'react-native';
import {View,Text } from 'react-native';
import { GET_ALL_OTS } from '../../src/graphql/AlertQueries';

const ScrollableOTs = (props)=>{
     //Component to render Operation theatres in Flatlist
     const { data, error, loading } = useQuery(GET_ALL_OTS, {
        fetchPolicy: "network-only",
      });
      if (data) {
        if (props.selectedOT === "") {
          props.setSelectedOT(data.operationTheaters[0].id);
        }
      }
      if (error) {
      }
  const renderOts = ({ item, index }) => {
    return (
      <View
        key={"OTS_" + index}
        style={[
          styles.headerItem,
          { backgroundColor: props.selectedOT === item.id ? "#006bcc" : "#959595" },
          index === 0 && { marginLeft: 0 },
        ]}
      >
        <TouchableOpacity
          labelStyle={{ color: "#fff" }}
          onPress={() => {
            props.setSelectedOT(item.id);
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };
    return (
       <>
       {data && (
        <>
          {data.operationTheaters.length > 0 ? (
            <>
              <View style={{ marginHorizontal: 24 }}>
                <FlatList
                  horizontal
                  data={data.operationTheaters}
                  renderItem={renderOts}
                  extraData={props.selectedOT}
                />
              </View> 
            </>
          ) : (
            <EmptyComponent title="No Operation Theatres!" />
          )}
        </>
      )}
       </>
    )
}
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    headerItem: {
      paddingHorizontal: 12,
      margin: 8,
      height: 40,
      width: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 8,
    },
    dateContainer: {
      margin: 12,
      padding: 12,
      backgroundColor: "#fff",
      alignSelf: "center",
      height: 60,
      width: "90%",
      borderRadius: 8,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      elevation: 6,
    },
    dateInput: {
      flexDirection: "row",
      width: "90%",
      backgroundColor: "#fff",
      alignSelf: "center",
      justifyContent: "space-between",
      padding: 12,
      borderRadius: 8,
      marginVertical: 36,
      paddingHorizontal: 36,
      height: 60,
      alignItems: "center",
      elevation: 2,
    },
  });
export default ScrollableOTs;