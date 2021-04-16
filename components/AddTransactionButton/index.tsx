import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { View, Text, Pressable, Modal, Alert } from "react-native";
import Colors from "../../constants/Colors";
import { User } from "../../types";
import styles from "./styles";
import AddTransactionForm from "./form";

export type AddTransaciontButtonProps = {
  members: User[];
};

const AddTransactionButton = (props: AddTransaciontButtonProps) => {
  const { members } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const modal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.buttonClose}
            >
              <AntDesign name="closecircle" size={30} color={Colors.error} />
            </Pressable>
            <Text style={styles.titleText}>Add a new transaction:</Text>
            <AddTransactionForm members={members} />
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <View>{modal()}</View>
      <Pressable
        style={[styles.buttonContainer]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>+</Text>
        <FontAwesome5 name="money-bill-alt" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default AddTransactionButton;
