import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { View, StyleSheet, StatusBar } from "react-native";
import GroupTransaction from "../components/GroupTransaction";
import TotalBalance from "../components/TotalBalance";
import Colors from "../constants/Colors";
import { Animated } from "react-native";
import AddTransactionButton from "../components/AddTransactionButton";
import ENV from "../environment";
import Header from "../components/Header/Header";
import useFetchPost from "../hooks/useFetchPost";

const { backendApiUrl } = ENV();

const GroupScreen = () => {
  const route = useRoute();
  const { handleRefresh, id, name, members } = route.params;
  const [searchText, setsearchText] = useState("");

  const [data, setData] = useState(null);
  const navigation = useNavigation();

  const [transactionData, transactionStatus, getData] = useFetchPost(
    "GET",
    `${backendApiUrl}/transaction?groupId=${id}`,
    true
  );
  useEffect(() => {
    getData();
  }, []);

  const localHandleRefresh = () => {
    getData();
  };

  useEffect(() => {
    if (searchText !== "") {
      const res = transactionData?.filter((group) => {
        return group.title.toLowerCase().includes(searchText.toLowerCase());
      });
      setData(res);
    } else setData(transactionData);
  }, [searchText, transactionData]);

  const summary = getSummary(id);

  return (
    <View style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor={Colors.light.tint}
        barStyle="dark-content"
        showHideTransition="fade"
        hidden={false}
      />
      <Header
        title={name}
        hasBackButton={true}
        setSearchText={setsearchText}
        handleBack={() => {
          console.log("pressed...");
          handleRefresh();
          navigation.goBack();
        }}
      />
      <Animated.View style={{ width: "100%" }}>
        <TotalBalance
          summary={summary}
          unit="friend"
          prepositions={{ lent: "to", borrowed: "from", settleUp: "with" }}
        ></TotalBalance>
      </Animated.View>
      <Animated.FlatList
        style={{ width: "100%" }}
        data={data}
        renderItem={({ item }) => <GroupTransaction transaction={item} />}
        contentContainerStyle={{ paddingBottom: 65 }}
        keyExtractor={(item) => item.id.toString()}
      />
      <AddTransactionButton
        members={members}
        groupId={id}
        handleRefresh={localHandleRefresh}
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
