import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { StyleSheet, Pressable, ToastAndroid, View, Text } from "react-native";
import Input from "../components/FormComponents/Input";
import Colors from "../constants/Colors";
import ENV from "../environment";

const { backendApiUrl } = ENV();

const Register = () => {
  const [success, setSuccess] = useState(0);
  const navigation = useNavigation();
  const formMethods = useForm({
    mode: "onBlur",
  });

  const handleRedirect = (screen: string) => {
    navigation.navigate(screen);
  };

  const onSubmit = (form: any) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    };
    fetch(`${backendApiUrl}/user/singup`, requestOptions)
      .then((response) => {
        console.log(response.status);
        setSuccess(response.status);
        formMethods.reset();
        ToastAndroid.show("Success!", ToastAndroid.SHORT);
        handleRedirect("Root");
      })
      .catch((error) => {
        setSuccess(-1);
      });
  };
  const onErrors = (errors: any) => {
    console.warn(errors);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Register </Text>
      <View style={styles.formContainer}>
        <FormProvider {...formMethods}>
          <Input
            name="name"
            placeholder="Enter your Name"
            style={styles.input}
            rules={{ required: "Name is required!" }}
          />
          <Input
            name="username"
            placeholder="Pick a username"
            style={styles.input}
            rules={{ required: "Username is required!" }}
          />
          <Input
            name="phoneNumber"
            placeholder="Enter your phone-number"
            style={styles.input}
            rules={{ required: "Username is required!" }}
            keyboardType="numeric"
          />
          <Input
            name="password"
            placeholder="Choose a password"
            secureTextEntry={true}
            style={styles.input}
            rules={{ required: "Password is required!" }}
          />
          <Input
            name="password2"
            placeholder="Repeat password"
            secureTextEntry={true}
            style={styles.input}
            rules={{ required: "Password is required!" }}
          />
        </FormProvider>
        <Pressable onPress={formMethods.handleSubmit(onSubmit, onErrors)}>
          <View style={styles.sendButton}>
            <MaterialCommunityIcons
              name="account-plus"
              size={24}
              color="black"
            />
            <Text> Sign Up </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    width: "100%",
    height: "100%",
    alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: Colors.light.background,
  },
  formContainer: {
    // backgroundColor: "blue",
    width: "80%",
  },
  title: {
    fontSize: 30,
    paddingTop: 100,
  },
  input: {
    borderBottomWidth: 1,
    width: "95%",
    margin: 10,
  },
  sendButton: {
    marginTop: 30,
    alignSelf: "center",
    flexDirection: "row",
    width: 120,
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
});

export default Register;
