import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Image, Text, View } from "react-native";
import { User } from "../../types";
import Input from "../FormComponents/Input";
import styles from "./styles";
import CustomCheckBox from "../FormComponents/CheckBox";

export type AddTransaciontFormProps = {
  members: User[];
};

const AddTransactionForm = (props: AddTransaciontFormProps) => {
  const { members } = props;
  const formMethods = useForm({
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

  const amount = parseFloat(formMethods.watch("amount"));
  const splitEqual = formMethods.watch("splitEqual");
  return (
    <FormProvider {...formMethods}>
      <View style={styles.formContainer}>
        <Input
          name="title"
          style={styles.textInput}
          maxLength={100}
          placeholder="Title"
        />
        <Input
          name="description"
          style={styles.textInput}
          multiline={true}
          numberOfLines={3}
          maxLength={200}
          placeholder="Description"
        />
        <Input
          name="amount"
          style={styles.textInput}
          keyboardType="numeric"
          placeholder="Amount"
        />
        <View style={styles.checkboxContainer}>
          <CustomCheckBox name="splitEqual" style={styles.checkbox} />
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
      </View>
    </FormProvider>
  );
};

export default AddTransactionForm;
