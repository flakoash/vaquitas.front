import React from "react";
import { Text, View } from "react-native";
import { Group } from "../../types";
import styles from "./styles";

const totalBalanceData = {};

export type TotalBalanceProps = {
  summary: {
    borrowed: {
      amount: number;
      len: number;
    };
    lent: {
      amount: number;
      len: number;
    };
    settleUp: {
      amount: number;
      len: number;
    };
  };
  unit: string;
  prepositions: { lent: string; borrowed: string; settleUp: string };
};

const TotalBalance = (props: TotalBalanceProps) => {
  const { summary, unit, prepositions } = props;

  const { borrowed, lent, settleUp } = summary;
  const total = lent.amount + borrowed.amount;

  return (
    <View style={styles.container}>
      <View style={styles.totalBalanceContainer}>
        <Text style={{ width: "100%", textAlign: "center" }}>
          <Text style={styles.balanceText}>Total Balance: </Text>
          <Text style={styles.balanceAmount}>{total}</Text>
        </Text>
      </View>

      {lent.amount !== 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.lentText}>You lent a total of:</Text>
          <Text style={styles.lentText}>
            {lent.amount} {prepositions["lent"]} {lent.len}{" "}
            {lent.len === 1 ? unit : unit + "s"}
          </Text>
        </View>
      )}
      {borrowed.amount !== 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.borrowedText}>You borrowed a total of:</Text>
          <Text style={styles.borrowedText}>
            {borrowed.amount} {prepositions["borrowed"]} {borrowed.len}{" "}
            {borrowed.len === 1 ? unit : unit + "s"}
          </Text>
        </View>
      )}
      {settleUp.len > 0 && (
        <View style={styles.summaryContainer}>
          <Text style={styles.settleUpText}>You are settle up:</Text>
          <Text style={styles.settleUpText}>
            {prepositions["settleUp"]} {settleUp.len}{" "}
            {settleUp.len === 1 ? unit : unit + "s"}
          </Text>
        </View>
      )}
    </View>
  );
};

TotalBalance.defaultProps = {
  unit: "group",
  prepositions: { lent: "in", borrowed: "in", settleUp: "in" },
};

export default TotalBalance;
