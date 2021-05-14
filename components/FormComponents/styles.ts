import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  errorText: {
    fontSize: 11,
    color: Colors.error,
    textAlign: "center",
  },
  combobox: {
    borderWidth: 1.5,
    borderColor: Colors.dark.text,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 5,
    marginTop: 10,
  },
});

export default styles;
