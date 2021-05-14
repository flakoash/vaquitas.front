import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    paddingTop: 44,
    paddingBottom: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    backgroundColor: Colors.light.tint,
  },
  backArrowContainer: {
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  titleContainer: {
    paddingLeft: 27,
  },
  rightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 12,
    width: 50,
  },
  leftContainer: {
    flexDirection: "row",
  },
  search: {
    borderBottomWidth: 1,
    padding: 0,
    marginLeft: 15,
    width: 260,
  },
});

export default styles;
