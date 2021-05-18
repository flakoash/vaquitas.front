import moment from "moment";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import { Transaction, User } from "../../types";
import styles from "./styles";

export type GroupTransactionProps = {
  transaction: Transaction;
};
const GroupTransaction = (props: GroupTransactionProps) => {
  const { transaction } = props;
  const [storageUser, , , isUserLoaded] = useAsyncStorage("user_id");
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: null,
    token: null,
  });
  useEffect(() => {
    if (isUserLoaded) setCurrentUser(JSON.parse(storageUser as string));
  }, [isUserLoaded]);

  const currentUserTransaction = () => {
    return currentUser ? currentUser.id === transaction.owner.id : false;
  };
  const boxStyle = currentUserTransaction()
    ? styles.currentUserTransaction
    : styles.otherUserTransaction;
  return (
    <View style={styles.container}>
      <View style={[styles.transactionBox, boxStyle]}>
        <View style={styles.creator}>
          <Text style={styles.secondayText}>
            {currentUserTransaction() ? (
              <Text> You paid </Text>
            ) : (
              <Text> {transaction.owner.name} paid </Text>
            )}
            <Text style={styles.amount}> {transaction.amount} </Text>
            <Text> for </Text>
          </Text>
        </View>
        <Text style={styles.title}> {transaction.title} </Text>
        <Text> {} </Text>

        <Text> {moment.unix(transaction.createdAt).fromNow()} </Text>
      </View>
    </View>
  );
};

export default GroupTransaction;
