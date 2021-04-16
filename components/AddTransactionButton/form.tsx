import React, { useEffect, useState } from "react";
import {
  FormProvider,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { Image, Pressable, Text, View } from "react-native";
import { User } from "../../types";
import Input from "../FormComponents/Input";
import styles from "./styles";
import CustomCheckBox from "../FormComponents/CheckBox";
import { AntDesign } from "@expo/vector-icons";

export type AddTransaciontFormProps = {
  members: User[];
};

const AddTransactionForm = (props: AddTransaciontFormProps) => {
  const { members } = props;
  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      splitEqual: true,
      amount: "0",
    },
  });

  const split = (member: User) => {
    return (
      <View style={styles.memberContainer} key={member.id}>
        <Image source={{ uri: member.photo as string }} style={styles.avatar} />
        <Text style={styles.groupMemberText}> {member.name}</Text>
        <Input
          name={member.id}
          style={styles.splitTextInput}
          keyboardType="numeric"
          placeholder="Amount"
          rules={{ required: "Amount is required!" }}
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

  const onSubmit = (form: any) => {
    console.log(form);
  };

  const onErrors = (errors: any) => {
    console.warn(errors);
  };

  const amount = parseFloat(formMethods.watch("amount"));
  const splitEqual = formMethods.watch("splitEqual");

  // unregister member's amount
  useEffect(() => {
    if (splitEqual) {
      members.forEach((member) => formMethods.unregister(member.id));
    }
  }, [splitEqual]);

  return (
    <View style={styles.formContainer}>
      <FormProvider {...formMethods}>
        <Input
          name="title"
          style={styles.textInput}
          maxLength={150}
          placeholder="Title"
          rules={{
            required: "Title is required!",
            maxLength: {
              message: "Use at most 300 characters.",
              value: 300,
            },
          }}
        />
        <Input
          name="description"
          style={styles.textInput}
          multiline={true}
          numberOfLines={3}
          maxLength={300}
          placeholder="Description"
          rules={{
            maxLength: {
              message: "Use at most 100 characters.",
              value: 100,
            },
          }}
        />
        <Input
          name="amount"
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Amount"
          rules={{ required: "Amount is required!" }}
        />
        <View style={styles.checkboxContainer}>
          <CustomCheckBox
            name="splitEqual"
            defaultValue={true}
            style={styles.checkbox}
          />
          <Text style={styles.label}>Split equally? {splitEqual}</Text>
        </View>

        {!splitEqual ? (
          splits()
        ) : (
          <Text style={[styles.titleText, { alignSelf: "center" }]}>
            {isNaN(amount)
              ? "_____"
              : Math.round((amount / members.length + Number.EPSILON) * 100) /
                100}{" "}
            each...
          </Text>
        )}
      </FormProvider>
      <Pressable onPress={formMethods.handleSubmit(onSubmit, onErrors)}>
        <View style={styles.sendButton}>
          <AntDesign name="upload" size={24} color="white" />
        </View>
      </Pressable>
    </View>
  );
};

export default AddTransactionForm;
