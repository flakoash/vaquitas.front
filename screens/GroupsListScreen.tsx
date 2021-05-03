import React, { useEffect, useState } from "react";
import { Animated, FlatList, StyleSheet } from "react-native";

import GroupListItem from "../components/GroupListItem";
import { Text, View } from "../components/Themed";
import TotalBalance from "../components/TotalBalance";
import Colors from "../constants/Colors";
import groupsData from "../data/groups";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { Group, User } from "../types";
import ENV from "../environment";
import useFetch from "../hooks/useFetch";
import AddGroup from "../components/addGroup";

const { backendApiUrl } = ENV();

const emptySummary = {
  borrowed: {
    amount: 0,
    len: 0,
  },
  lent: {
    amount: 0,
    len: 0,
  },
  settleUp: {
    amount: 0,
    len: 0,
  },
};

export default function TabOneScreen() {
  const [summary, setSummary] = useState(emptySummary);
  const [update, setUpdate] = useState(0);

  const url = `${backendApiUrl}/group`;

  const handleRefresh = () => {
    setUpdate(update + 1);
  };

  const [groupsData, groupsStatus] = useFetch(url, update);

  useEffect(() => {
    if (groupsStatus === 200) setSummary(getSummary(groupsData));
  }, [groupsData]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ width: "100%" }}>
        <TotalBalance summary={summary} />
      </Animated.View>

      {groupsStatus === 200 && (
        <Animated.FlatList
          style={{ width: "100%" }}
          data={groupsData}
          renderItem={({ item }) => (
            <GroupListItem group={item} handleRefresh={handleRefresh} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      )}
      <AddGroup handleRefresh={handleRefresh} />
    </View>
  );
}

const getSummary = (groups: Group[]) => {
  const borrowed: Group[] = groups.filter((value) => {
    return value.balance < 0;
  });
  const lent: Group[] = groups.filter((value) => {
    return value.balance > 0;
  });
  const settleUp: Group[] = groups.filter((value) => {
    return value.balance == 0;
  });

  return {
    borrowed: {
      amount:
        Math.round(borrowed.reduce((a, b) => a + b.balance, 0) * 100) / 100,
      len: borrowed.length,
    },
    lent: {
      amount: Math.round(lent.reduce((a, b) => a + b.balance, 0) * 100) / 100,
      len: lent.length,
    },
    settleUp: {
      amount:
        Math.round(settleUp.reduce((a, b) => a + b.balance, 0) * 100) / 100,
      len: settleUp.length,
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
