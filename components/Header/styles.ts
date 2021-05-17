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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
