import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList, View, StyleSheet } from "react-native";
import GroupTransaction from "../components/GroupTransaction";
import TotalBalance from "../components/TotalBalance";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { User } from "../types";
import Colors from "../constants/Colors";
import { Animated } from "react-native";
import AddTransactionButton from "../components/AddTransactionButton";
import ENV from "../environment";
import useFetch from "../hooks/useFetch";

const { backendApiUrl } = ENV();

const GroupScreen = () => {
  const route = useRoute();
  const { id, name, members } = route.params;
  const [refresh, setRefresh] = useState(0);

  const [
    transactionData,
    transactionStatus,
  ] = useFetch(`${backendApiUrl}/transaction?groupId=${id}`, [refresh]);

  const handleRefresh = () => {
    setRefresh(refresh + 1);
  };

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
        style={{ width: "100%" }}
        data={transactionData}
        renderItem={({ item }) => <GroupTransaction transaction={item} />}
        contentContainerStyle={{ paddingBottom: 65 }}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddTransactionButton
        members={members}
        groupId={id}
        handleRefresh={handleRefresh}
      />
    </View>
  );
};

const getSummary = (group_id: number) => {
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
