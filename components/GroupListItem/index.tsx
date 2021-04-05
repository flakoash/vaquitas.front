import moment from "moment";
import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Group } from "../../types";
import styles from "./styles";

import { useNavigation } from "@react-navigation/native";

export type GroupListItemProps = { group: Group };

const GroupListItem = (props: GroupListItemProps) => {
  const { group } = props;
  const { value } = group.balance;

  const navigation = useNavigation();

  const handleClick = () => {
    // console.warn("clicked:" + group.name);
    navigation.navigate("Group", { id: group.id, name: group.name });
  };

  const image = group.icon !== null ? group.icon : group.members[1].photo;

  const mainText = value > 0 ? "You are owe a total of" : "You owe a total of";

  const textStyle = value >= 0 ? styles.greenText : styles.redText;

  const amount = value !== 0 ? value : "You are settled up!";

  return (
    <TouchableWithoutFeedback onPress={handleClick}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          <Image source={{ uri: image }} style={styles.photo} />

          <View style={styles.textContainer}>
            <Text style={styles.groupName}> {group.name} </Text>
            {value !== 0 && <Text style={textStyle}> {mainText} </Text>}
            <Text style={[styles.amount, textStyle]}> {amount} </Text>
          </View>
        </View>

        <View style={styles.timeContainer}>
          <Text style={styles.secondaryText}> Last transaction </Text>
          <Text>
            {
              moment.unix(group.balance.createdAt).format("DD-MM-YYYY")
              // .humanize()
            }
          </Text>
          {/* <Text> Yesterday </Text> */}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default GroupListItem;
