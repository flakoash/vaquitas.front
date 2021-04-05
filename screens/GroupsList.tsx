import * as React from "react";
import { FlatList, StyleSheet } from "react-native";

import GroupListItem from "../components/GroupListItem";
import { Text, View } from "../components/Themed";
import { Group } from "../types";

const getGroupsData = () => {
  const groups: Group[] = [
    {
      id: "group_id",
      name: "Group 1",
      members: [
        { id: "user_id", name: "User 1", photo: "https://i.pravatar.cc/50" },
      ],
      icon: "https://picsum.photos/50",
      balance: {
        id: "balance_id",
        value: 100,
        to: null,
        createdAt: 1617475021,
      },
    },
  ];
  return groups;
};

export default function TabOneScreen() {
  const groups = getGroupsData();
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        data={groups}
        renderItem={({ item }) => <GroupListItem group={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
