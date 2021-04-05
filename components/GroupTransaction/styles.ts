import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  transactionBox: {
    borderRadius: 10,
    padding: 8,
  },
  currentUserTransaction: {
    backgroundColor: "#b8d9c1",
    marginRight: 30,
  },
  otherUserTransaction: {
    backgroundColor: "#f0f9fc",
    marginLeft: 30,
    alignItems: "flex-end",
  },
  creator: {
    flexDirection: "row",
  },
  secondayText: {
    color: "#9da0a1",
    fontStyle: "italic",
  },
  amount: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#707273",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#707273",
  },
});

export default styles;
