import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  Alert,
  TextInput,
  CheckBox,
  Image,
} from "react-native";
import Colors from "../../constants/Colors";
import { User } from "../../types";
import styles from "./styles";

export type AddTransaciontButtonProps = {
  members: User[];
};

const AddTransactionButton = (props: AddTransaciontButtonProps) => {
  const { members } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [splitEqual, setSplitEqual] = useState(true);
  const [amount, setAmount] = useState(0);

  const split = (member: User) => {
    return (
      <View style={styles.memberContainer} key={member.id}>
        <Image source={{ uri: member.photo as string }} style={styles.avatar} />
        <Text style={styles.groupMemberText}> {member.name}</Text>
        <TextInput
          style={styles.splitTextInput}
          keyboardType="numeric"
          placeholder="Amount"
        />
      </View>
    );
  };
  const splits = () => {
    return (
      <View style={styles.splitContainer}>
        {members.map((member) => {
          return split(member);
        })}
      </View>
    );
  };

  const form = () => {
    return (
      <View style={styles.formContainer}>
        <TextInput
          style={styles.textInput}
          maxLength={100}
          placeholder="Title"
        />
        <TextInput
          style={styles.textInput}
          multiline={true}
          numberOfLines={3}
          maxLength={200}
          placeholder="Description"
        />
        <TextInput
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Amount"
          defaultValue={amount.toString()}
          onChangeText={(text) => setAmount(parseFloat(text))}
        />
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={splitEqual}
            onValueChange={setSplitEqual}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Split equally?</Text>
        </View>

        {!splitEqual ? (
          splits()
        ) : (
          <Text style={[styles.titleText, { alignSelf: "center" }]}>
            {Math.round((amount / members.length + Number.EPSILON) * 100) / 100}{" "}
            each...
          </Text>
        )}
      </View>
    );
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
            <Text style={styles.titleText}>Add a new transaction:</Text>
            {form()}
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
