import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.tint,
    margin: 5,
    paddingRight: 30,
    paddingLeft: 30,
    paddingBottom: 10,
    borderRadius: 20,
    marginTop: 0,
    borderTopEndRadius: 0,
    borderTopStartRadius: 0,
  },
  totalBalanceContainer: {
    width: "100%",
    alignItems: "center",
    textAlign: "center",
    flexDirection: "row",
  },
  summaryContainer: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  balanceText: {
    fontWeight: "bold",
    fontSize: 18,
    paddingTop: 2,
    color: Colors.light.text,
  },
  balanceAmount: {
    fontWeight: "bold",
    fontSize: 20,
  },
  lentText: {
    fontSize: 14,
    color: Colors.success,
  },
  borrowedText: {
    fontSize: 14,
    color: Colors.error,
  },
  settleUpText: {
    fontSize: 14,
    color: Colors.light.text,
  },
});

export default styles;
