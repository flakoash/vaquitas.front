import React, { useEffect, useState } from "react";
import { Animated, StatusBar, StyleSheet } from "react-native";

import GroupListItem from "../components/GroupListItem";
import { Text, View } from "../components/Themed";
import TotalBalance from "../components/TotalBalance";
import Colors from "../constants/Colors";
import { Group } from "../types";
import ENV from "../environment";
import AddGroup from "../components/addGroup";
import Header from "../components/Header/Header";
import { useNavigation } from "@react-navigation/native";
import useFetchPost from "../hooks/useFetchPost";

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
  const [data, setData] = useState(null);
  const [searchText, setsearchText] = useState("");

  const navigation = useNavigation();

  const handleRefresh = () => {
    getData();
  };

  const onSuccess = (status: number, response: any) => {
    if (status === 200) {
      setSummary(getSummary(response));
    }
  };

  // const [groupsData, groupsStatus] = useFetch(url, update);
  const [groupsData, groupsStatus, getData] = useFetchPost(
    "GET",
    `${backendApiUrl}/group`,
    true,
    onSuccess
  );
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (searchText !== "") {
      const res = groupsData?.filter((group) => {
        return group.name.toLowerCase().includes(searchText.toLowerCase());
      });
      setData(res);
    } else setData(groupsData);
  }, [searchText, groupsData]);

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
        title="🐮's App!"
        hasBackButton={true}
        setSearchText={setsearchText}
        handleBack={() => {
          console.log("pressed...");
          navigation.goBack();
        }}
      />
      <Animated.View style={{ width: "100%" }}>
        <TotalBalance summary={summary} />
      </Animated.View>

      {data !== null ? (
        <Animated.FlatList
          style={{ width: "100%" }}
          data={data}
          renderItem={({ item }) => (
            <GroupListItem group={item} handleRefresh={handleRefresh} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
      ) : (
        <View style={{ height: "91.5%", backgroundColor: "transparent" }}>
          <Text>No data found...{searchText}</Text>
        </View>
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
