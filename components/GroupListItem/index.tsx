import moment from "moment";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Group } from "../../types";
import styles from "./styles";

import { useNavigation } from "@react-navigation/native";

export type GroupListItemProps = { group: Group; handleRefresh: () => void };

const GroupListItem = (props: GroupListItemProps) => {
  const { group, handleRefresh } = props;
  const value = group.balance;

  const navigation = useNavigation();

  const handleClick = () => {
    navigation.navigate("Group", {
      handleRefresh: handleRefresh,
      navigation: navigation,
      id: group.id,
      name: group.name,
      members: group.members,
    });
  };

  const image = group.icon !== null ? group.icon : group.members[1].photo;

  const mainText = value > 0 ? "You are owe a total of" : "You owe a total of";

  const textStyle = value >= 0 ? styles.greenText : styles.redText;

  const amount = value !== 0 ? value : "You are settled up!";

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: image as string }} style={styles.photo} />

          <View style={styles.textContainer}>
            <Text
              style={styles.groupName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {group.name}
            </Text>
            {value !== 0 && <Text style={textStyle}> {mainText} </Text>}
            <Text style={[styles.amount, textStyle]}> {amount} </Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.secondaryText}> Last transaction </Text>
          <Text>
            {
              group.lastTransaction !== 0
                ? moment.unix(group.lastTransaction).format("DD-MM-YYYY")
                : "Never"
              // .humanize()
            }
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GroupListItem;
