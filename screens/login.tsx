import React from "react";

import { Text, View } from "../components/Themed";
import useAsyncStorage from "../hooks/useAsyncStorage";
import ENV from "../environment";
import { StyleSheet, Pressable, ToastAndroid } from "react-native";
import Input from "../components/FormComponents/Input";
import { FormProvider, useForm } from "react-hook-form";
import { SimpleLineIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import useFetchPost from "../hooks/useFetchPost";

const { backendApiUrl } = ENV();

const Login = () => {
  const [user, updateStorageUser, _] = useAsyncStorage("user_id");
  const onSuccess = (status: number, response: any) => {
    if (status === 200) {
      console.log(response);
      formMethods.reset();
      ToastAndroid.show("Success!", ToastAndroid.SHORT);
      updateStorageUser(JSON.stringify(response));
      handleRedirect("MainTab");
    }
  };
  const onError = (status: number, response: any) => {
    console.log(response);
  };
  const [loginData, loginStatus, SubmitLogin] = useFetchPost(
    "POST",
    `${backendApiUrl}/user/login`,
    false,
    onSuccess,
    onError
  );

  const navigation = useNavigation();

  const handleRedirect = (screen: string) => {
    navigation.navigate(screen);
  };

  const onSubmit = (form: any) => {
    console.log("submit");
    SubmitLogin(form);
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
          {loginStatus === 403 && (
            <Text style={styles.errerMessage}>Wrong Username or Password!</Text>
          )}
        </View>
      </FormProvider>
      <Pressable onPress={formMethods.handleSubmit(onSubmit, onErrors)}>
        <View style={styles.sendButton}>
          <SimpleLineIcons name="login" size={24} color="black" />
        </View>
      </Pressable>
      <View style={styles.registerTest}>
        <Text>Don't have an account yet?{"  "}</Text>
        <Pressable onPress={() => handleRedirect("Register")}>
          <Text style={styles.registerLink}>Sign Up</Text>
        </Pressable>
      </View>
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
  errerMessage: { fontSize: 14, color: Colors.error, alignSelf: "center" },
  registerTest: { marginTop: 30, flexDirection: "row" },
  registerLink: { color: "blue" },
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
