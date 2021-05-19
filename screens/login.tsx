import React, { useEffect, useState } from "react";

import { Text, View } from "../components/Themed";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { Group, User } from "../types";
import ENV from "../environment";
import { TextInput, StyleSheet, Pressable, ToastAndroid } from "react-native";
import Input from "../components/FormComponents/Input";
import { FormProvider, useForm } from "react-hook-form";
import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const { backendApiUrl } = ENV();

const Login = () => {
  const [success, setSuccess] = useState(0);
  const [user, updateStorageUser, _] = useAsyncStorage("user_id");

  const navigation = useNavigation();

  const onSubmit = (form: any) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };
    fetch(`${backendApiUrl}/user/login`, requestOptions)
      .then((response) => {
        setSuccess(response.status);
        if (response.status === 200) {
          return response.json();
        }
        // ToastAndroid.show("Error! " + response.status, ToastAndroid.SHORT);
        return "";
      })
      .then((jsonResponse) => {
        if (jsonResponse !== "") {
          formMethods.reset();
          ToastAndroid.show("Success!", ToastAndroid.SHORT);
          updateStorageUser(JSON.stringify(jsonResponse));
          navigation.navigate("MainTab");
        } else {
        }
      })
      .catch((error) => {
        setSuccess(-1);
      });
  };
  const onErrors = (errors: any) => {
    console.warn(errors);
  };

  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🐮</Text>
      <FormProvider {...formMethods}>
        <View style={styles.form}>
          <Input
            name="username"
            placeholder="Username"
            style={styles.input}
            rules={{ required: "Username is required!" }}
          />
          <Input
            name="password"
            placeholder="Password"
            secureTextEntry={true}
            style={styles.input}
            rules={{ required: "Password is required!" }}
          />
          {success === 403 && (
            <Text
              style={{ fontSize: 14, color: Colors.error, alignSelf: "center" }}
            >
              Wrong Username or Password!
            </Text>
          )}
        </View>
      </FormProvider>
      <Pressable onPress={formMethods.handleSubmit(onSubmit, onErrors)}>
        <View style={styles.sendButton}>
          <SimpleLineIcons name="login" size={24} color="black" />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.background,
  },
  form: {
    padding: 40,
    width: "100%",
    backgroundColor: Colors.light.background,
  },
  sendButton: {
    width: 60,
    height: 55,
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    justifyContent: "center",
    backgroundColor: Colors.dark.tint,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1.0,
    shadowRadius: 4,
    elevation: 10,
  },
  input: {
    borderBottomWidth: 1,
    width: "95%",
    margin: 10,
  },
  logo: {
    fontSize: 70,
  },
});

export default Login;
