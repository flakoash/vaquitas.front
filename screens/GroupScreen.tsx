import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList, View, StyleSheet } from "react-native";
import GroupTransaction from "../components/GroupTransaction";
import TotalBalance from "../components/TotalBalance";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { User } from "../types";
import Colors from "../constants/Colors";
import { Animated } from "react-native";

const GroupScreen = () => {
  const route = useRoute();
  const [data, setData] = useState();
  const { id, name } = route.params;

  const getTransactionsData = () => {
    fetch("http://192.168.56.1:8080/api/transaction?groupId=" + id)
      .then((response) => response.json())
      .then((responseJson) => {
        setData(responseJson);
      });
  };
  getTransactionsData();

  const summary = getSummary(id);

  return (
    <View style={styles.container}>
      <Animated.View style={{ width: "100%" }}>
        <TotalBalance
          summary={summary}
          unit="friend"
          prepositions={{ lent: "to", borrowed: "from", settleUp: "with" }}
        ></TotalBalance>
      </Animated.View>
      <Animated.FlatList
        data={data}
        renderItem={({ item }) => <GroupTransaction transaction={item} />}
      />
    </View>
  );
};

const getSummary = (group_id: string) => {
  return {
    borrowed: {
      amount: -10,
      len: 2,
    },
    lent: {
      amount: 10,
      len: 2,
    },
    settleUp: {
      amount: 10,
      len: 1,
    },
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.base,
  },
});

export default GroupScreen;
