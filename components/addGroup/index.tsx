import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, Pressable, Modal, Alert, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import styles from "./styles";
import AddGroupForm from "./form";

export type AddGroupProps = {
  handleRefresh: () => void;
};

const AddGroup = (props: AddGroupProps) => {
  const { handleRefresh } = props;
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
              <View
                style={{
                  paddingTop: 35,
                  padding: 20,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <Text style={styles.titleText}>Create a new Group:</Text>
                <AddGroupForm handleSuccess={handleSuccess} />
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
        <MaterialIcons name="group-add" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default AddGroup;
