import React from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native";
import GroupTransaction from "../components/GroupTransaction";

const getTransactionsData = () => {
  return [
    {
      id: "tr_id",
      title: "pago 1",
      description: "pago por algo",
      amount: 100,
      creator: { id: "1", name: "User 1" },
      createdAt: 1617475021,
      attachment: "some attachment..",
    },
    {
      id: "tr_id2",
      title: "pago 2",
      description: "pago por otro",
      amount: 100,
      creator: { id: "2", name: "User 2" },
      createdAt: 1617277021,
      attachment: "some attachment..",
    },
  ];
};

const GroupScreen = () => {
  const route = useRoute();
  const trData = getTransactionsData();
  console.warn(route.params);
  return (
    <FlatList
      data={trData}
      renderItem={({ item }) => <GroupTransaction transaction={item} />}
    />
  );
};

export default GroupScreen;
