import React, { useEffect, useState } from "react";
import { Animated, FlatList, StyleSheet } from "react-native";

import GroupListItem from "../components/GroupListItem";
import { Text, View } from "../components/Themed";
import TotalBalance from "../components/TotalBalance";
import Colors from "../constants/Colors";
import groupsData from "../data/groups";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { Group, User } from "../types";

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
  const getGroupsData = () => {
    if (currentUser !== null)
      fetch("http://192.168.56.1:8080/api/group?userId=" + currentUser.id)
        .then((response) => response.json())
        .then((responseJson) => {
          setGroups(responseJson);
        })
        .catch((error) => console.log(error));
  };

  const [groups, setGroups] = useState<Group[]>();
  const [storageUser, , , isUserLoaded] = useAsyncStorage("user_id");
  const [currentUser, setCurrentUser] = useState(null);
  const [summary, setSummary] = useState(emptySummary);

  useEffect(() => {
    if (isUserLoaded) setCurrentUser(JSON.parse(storageUser as string));
  }, [isUserLoaded]);

  useEffect(() => {
    getGroupsData();
  }, [currentUser]);

  useEffect(() => {
    if (groups !== undefined) setSummary(getSummary(groups));
  }, [groups]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ width: "100%" }}>
        <TotalBalance summary={summary} />
      </Animated.View>

      <Animated.FlatList
        style={{ width: "100%" }}
        data={groups}
        renderItem={({ item }) => <GroupListItem group={item} />}
        keyExtractor={(item) => item.id}
      />
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
      amount: borrowed.reduce((a, b) => a + b.balance, 0),
      len: borrowed.length,
    },
    lent: {
      amount: lent.reduce((a, b) => a + b.balance, 0),
      len: lent.length,
    },
    settleUp: {
      amount: settleUp.reduce((a, b) => a + b.balance, 0),
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
