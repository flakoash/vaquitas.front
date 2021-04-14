import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    padding: 15,
  },
  leftContainer: {
    flexDirection: "row",
    width: "52%",
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
    color: "gray",
  },
  greenText: {
    color: Colors.success,
  },
  redText: {
    color: Colors.error,
  },
  amount: {
    fontSize: 18,
  },
});

export default styles;
