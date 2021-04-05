import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 15,
  },
  leftContainer: {
    flexDirection: "row",
  },
  textContainer: {
    justifyContent: "space-around",
  },
  timeContainer: {
    marginTop: 15,
  },
  photo: {
    width: 70,
    height: 70,
    borderRadius: 20,
    marginRight: 12,
  },
  groupName: {
    fontWeight: "bold",
    fontSize: 16,
  },
  secondaryText: {
    fontSize: 12,
    fontStyle: "italic",
  },
  greenText: {
    color: "green",
  },
  redText: {
    color: "red",
  },
  amount: {
    fontSize: 18,
  },
});

export default styles;
