import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import { View, Text, Pressable, Modal, Alert, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { User } from "../../types";
import styles from "./styles";
import AddTransactionForm from "./form";

export type AddTransaciontButtonProps = {
  members: User[];
  groupId: number;
  handleRefresh: () => void;
};

const AddTransactionButton = (props: AddTransaciontButtonProps) => {
  const { members, groupId, handleRefresh } = props;
  const [modalVisible, setModalVisible] = useState(false);

  const handleSuccess = () => {
    setModalVisible(false);
    handleRefresh();
  };

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
            <ScrollView
              contentContainerStyle={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ paddingTop: 35, padding: 20 }}>
                <Text style={styles.titleText}>Add a new transaction:</Text>
                <AddTransactionForm
                  members={members}
                  groupId={groupId}
                  handleSuccess={handleSuccess}
                />
              </View>
            </ScrollView>
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
