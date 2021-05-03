import { FontAwesome5 } from "@expo/vector-icons";
import { defaultFormat } from "moment";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, Text, ToastAndroid, View } from "react-native";
import CheckBox from "../FormComponents/CheckBox";
import Input from "../FormComponents/Input";
import styles from "./styles";
import ENV from "../../environment";

const { backendApiUrl } = ENV();

export type addGroupFormProps = {
  handleSuccess: () => void;
};

const addGroupForm = (props: addGroupFormProps) => {
  const { handleSuccess } = props;
  const [success, setSuccess] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const formMethods = useForm({
    mode: "onBlur",
  });

  const getContacts = () => {
    return [
      {
        id: "2",
        name: "user 2asdasdasdasdasdasdasd asdasdasd",
        phoneNumber: "789123456",
      },
      { id: "3", name: "user 3", phoneNumber: "789123456" },
      { id: "4", name: "user 4", phoneNumber: "789123456" },
      { id: "5", name: "user 5", phoneNumber: "789123456" },
      { id: "6", name: "user 6", phoneNumber: "789123456" },
      { id: "7", name: "user 7", phoneNumber: "789123456" },
      { id: "8", name: "user 8", phoneNumber: "789123456" },
      { id: "9", name: "user 9", phoneNumber: "789123456" },
    ];
  };

  const onSubmit = (form: any) => {
    const groupMembers = Object.keys(form)
      .filter((key) => key.indexOf("name") !== 0 && form[key])
      .map((key) => {
        return {
          id: key,
        };
      });
    const body = {
      name: form.name,
      members: groupMembers,
      icon: "https://robohash.org/etautemunde.png?size=50x50&set=set1",
    };

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    };
    fetch(`${backendApiUrl}/group`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          formMethods.reset();
          handleSuccess();
          ToastAndroid.show("Success!", ToastAndroid.SHORT);
        } else setCanSend(true);
      })
      .catch((error) => {
        setCanSend(true);
      });
  };

  const onErrors = (errors: any) => {
    console.warn(errors);
  };

  const checkboxes = () => {
    const contacts = getContacts();
    return (
      <View style={{ width: "100%", marginTop: 10 }}>
        {contacts.map((contact) => {
          return (
            <View key={contact.id} style={styles.memberContainer}>
              <CheckBox name={contact.id} defaultValue={false} />
              <Text
                numberOfLines={1}
                style={{
                  textAlignVertical: "center",
                  textAlign: "left",
                  width: "60%",
                }}
              >
                {contact.name}
              </Text>
              <Text style={{ textAlignVertical: "center", color: "gray" }}>
                {" (" + contact.phoneNumber + ") "}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };
  return (
    <View style={{ width: "100%" }}>
      <FormProvider {...formMethods}>
        <Input
          name="name"
          placeholder="Group Name"
          rules={{ required: "Group Name is required!" }}
          style={styles.textInput}
        />

        {checkboxes()}
      </FormProvider>
      <Pressable onPress={formMethods.handleSubmit(onSubmit, onErrors)}>
        <View style={styles.sendButton}>
          <FontAwesome5 name="save" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
};

export default addGroupForm;
