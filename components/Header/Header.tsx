import {
  EvilIcons,
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
} from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput } from "react-native";
import styles from "./styles";

export type HeaderProps = {
  title: string;
  setSearchText: (text: string) => void;
  handleBack: () => void;
  hasBackButton: boolean;
};

const Header = (props: HeaderProps) => {
  const { title, setSearchText, handleBack, hasBackButton } = props;

  const [cantSearch, setCanSearch] = useState(false);

  const cancelSearch = () => {
    setCanSearch(false);
    setSearchText("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <Pressable style={styles.backArrowContainer} onPress={handleBack}>
          <Ionicons name="arrow-back-outline" size={26} color="black" />
        </Pressable>
        {!cantSearch ? (
          <View style={styles.titleContainer}>
            <Text style={styles.title}> {title} </Text>
          </View>
        ) : (
          <TextInput
            style={styles.search}
            onChangeText={(text) => setSearchText(text)}
            autoFocus={true}
          />
        )}
      </View>
      <View style={styles.rightContainer}>
        {!cantSearch ? (
          <Pressable onPress={() => setCanSearch(true)}>
            <Octicons name="search" size={22} />
          </Pressable>
        ) : (
          <Pressable onPress={() => cancelSearch()}>
            <EvilIcons name="close" size={22} color="black" />
          </Pressable>
        )}
        <MaterialCommunityIcons name="dots-vertical" size={22} />
      </View>
    </View>
  );
};

export default Header;
