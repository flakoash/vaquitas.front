import { StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  buttonContainer: {
    backgroundColor: Colors.success,
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 5,
    right: 10,
    flexDirection: "row",
  },
  formContainer: {
    marginTop: 5,
    width: "100%",
  },

  textInput: {
    borderBottomWidth: 1,
    marginTop: 10,
  },
  buttonClose: {
    position: "absolute",
    zIndex: 10,
    top: 10,
    right: 15,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "bold",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
  modalView: {
    position: "absolute",
    bottom: 40,
    width: "100%",
    height: 400,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  memberContainer: {
    flexDirection: "row",
    margin: 3,
    justifyContent: "space-between",
  },
  groupMemberText: {
    width: 100,
  },
  sendButton: {
    backgroundColor: Colors.success,
    width: 70,
    height: 65,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
  },
});

export default styles;
