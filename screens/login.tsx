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
  const [token, updateStorageToken, _] = useAsyncStorage("token");

  const navigation = useNavigation();

  const onSubmit = (form: any) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };
    fetch(`${backendApiUrl}/user/login`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          setSuccess(1);
          return response.json();
        }
        return "";
      })
      .then((jsonResponse) => {
        if (jsonResponse !== "") {
          console.log(jsonResponse);
          formMethods.reset();
          ToastAndroid.show("Success!", ToastAndroid.SHORT);
          updateStorageToken(jsonResponse.token);
          navigation.navigate("MainTab");
        } else {
        }
      })
      .catch((error) => {
        console.log("error");
        console.log(error);
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
  },
  form: {
    padding: 40,
    width: "100%",
  },
  sendButton: {
    width: 60,
    height: 55,
    borderWidth: 1,
    borderRadius: 25,
    padding: 15,
    justifyContent: "center",
    backgroundColor: Colors.success,
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
