import { FontAwesome5 } from "@expo/vector-icons";
import { defaultFormat } from "moment";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Pressable, Text, ToastAndroid, View } from "react-native";
import CheckBox from "../FormComponents/CheckBox";
import Input from "../FormComponents/Input";
import styles from "./styles";
import ENV from "../../environment";

import * as Contacts from "expo-contacts";
import useAsyncStorage from "../../hooks/useAsyncStorage";

const { backendApiUrl } = ENV();

export type addGroupFormProps = {
  handleSuccess: () => void;
};

const addGroupForm = (props: addGroupFormProps) => {
  const { handleSuccess } = props;
  const [success, setSuccess] = useState(false);
  const [canSend, setCanSend] = useState(true);
  const [contacts, setContacts] = useState(null);
  const [appContacts, setAppContacts] = useState(null);
  const [storageUser, ..._] = useAsyncStorage("user_id");
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: null,
    token: null,
  });

  const formMethods = useForm({
    mode: "onBlur",
  });
  useEffect(() => {
    if (storageUser !== null) setCurrentUser(JSON.parse(storageUser as string));
  }, [storageUser]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails, Contacts.Fields.PhoneNumbers],
        });
        let contactArray = [];
        data.forEach((contact, indx) => {
          contact.phoneNumbers?.forEach((phone, indx2) => {
            contactArray.push({
              id: indx + indx2 + 1 + "",
              name: contact.firstName,
              phoneNumber: phone.number,
            });
          });
        });
        if (contactArray.length > 0) setContacts(contactArray);
      }
    })();
  }, []);

  const verifyContactList = () => {
    const body = contacts.map((contact) => contact.phoneNumber);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
      body: JSON.stringify(body),
    };
    console.log(requestOptions);
    fetch(`${backendApiUrl}/user/findByPhone`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          ToastAndroid.show(
            "No contacts using the app found...",
            ToastAndroid.SHORT
          );
          return null;
        }
      })
      .then((jsonResponse) => {
        console.log(jsonResponse);
        setAppContacts(jsonResponse);
      })
      .catch((error) => {
        setCanSend(true);
      });
  };

  useEffect(() => {
    if (contacts !== null) verifyContactList();
  }, [contacts]);

  const onSubmit = (form: any) => {
    const groupMembers = Object.keys(form)
      .filter((key) => key.indexOf("name") !== 0 && form[key])
      .map((key) => {
        return {
          id: key,
        };
      });
    groupMembers.push({ id: currentUser.id });
    const body = {
      name: form.name,
      members: groupMembers,
      icon: "https://robohash.org/etautemunde.png?size=50x50&set=set1",
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
      body: JSON.stringify(body),
    };
    console.log(requestOptions);
    fetch(`${backendApiUrl}/group`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(true);
          formMethods.reset();
          handleSuccess();
          ToastAndroid.show("Success!", ToastAndroid.SHORT);
        } else {
          console.log("error");
          console.log(response.status);
          setCanSend(true);
        }
      })
      .catch((error) => {
        setCanSend(true);
      });
  };

  const onErrors = (errors: any) => {
    console.warn(errors);
  };

  const checkboxes = () => {
    return (
      <View style={{ width: "100%", marginTop: 10 }}>
        {appContacts !== null ? (
          appContacts.map((contact) => {
            return (
              <View key={contact.id} style={styles.memberContainer}>
                <CheckBox name={contact.id.toString()} defaultValue={false} />
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
          })
        ) : (
          <Text>No contacts found</Text>
        )}
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

        {contacts !== null && checkboxes()}
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
