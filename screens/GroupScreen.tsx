import React from "react";
import { Text } from "react-native";

import { useRoute } from "@react-navigation/native";

const GroupScreen = () => {
  const route = useRoute();
  console.warn(route.params);
  return <Text>New Group</Text>;
};

export default GroupScreen;
