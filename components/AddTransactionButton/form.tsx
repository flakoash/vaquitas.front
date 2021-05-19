import React, { useEffect, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { Image, Pressable, Text, ToastAndroid, View } from "react-native";
import { User } from "../../types";
import Input from "../FormComponents/Input";
import styles from "./styles";
import CustomCheckBox from "../FormComponents/CheckBox";
import { AntDesign } from "@expo/vector-icons";
import useAsyncStorage from "../../hooks/useAsyncStorage";
import ENV from "../../environment";

const { backendApiUrl } = ENV();

export type AddTransaciontFormProps = {
  members: User[];
  groupId: number;
  handleSuccess: () => void;
};

const AddTransactionForm = (props: AddTransaciontFormProps) => {
  const { members, groupId, handleSuccess } = props;
  const [storageUser, , , isUserLoaded] = useAsyncStorage("user_id");
  const [currentUser, setCurrentUser] = useState({
    id: null,
    username: null,
    token: null,
  });

  useEffect(() => {
    if (isUserLoaded) setCurrentUser(JSON.parse(storageUser as string));
  }, [isUserLoaded]);

  const [success, setSuccess] = useState(false);
  const [canSend, setCanSend] = useState(true);

  const formMethods = useForm({
    mode: "onBlur",
    defaultValues: {
      splitEqual: true,
      amount: "0",
    },
  });

  const valuesSumUp = (value: any) => {
    const involved = members.map((member) => "Group_Member_" + member.id);
    const realSum = formMethods.getValues("amount");
    const values = formMethods.getValues(involved);
    const totalSum = values.reduce(
      (acc, value) => parseFloat(acc) + parseFloat(value)
    );
    return parseFloat(totalSum) === parseFloat(realSum);
  };

  const split = (member: User) => {
    return (
      <View
        style={styles.memberContainer}
        key={"Group_Member_" + member.id.toString()}
      >
        <Image source={{ uri: member.photo as string }} style={styles.avatar} />
        <Text style={styles.groupMemberText}>
          {member.id === currentUser.id ? "You" : member.name}
        </Text>
        <Input
          name={"Group_Member_" + member.id.toString()}
          style={styles.splitTextInput}
          keyboardType="numeric"
          placeholder="Amount"
          rules={{ required: "Amount is required!", validate: valuesSumUp }}
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
    //disable button
    setCanSend(false);

    let involved: any[] = [];
    if (form["splitEqual"]) {
      const each =
        Math.round((amount / members.length + Number.EPSILON) * 100) / 100;
      involved = members.map((member) => {
        return {
          user: { id: member.id },
          amount: each,
        };
      });
    } else {
      involved = Object.keys(form)
        .filter((key) => key.indexOf("Group_Member_") === 0)
        .map((key) => {
          return {
            user: { id: key.replace("Group_Member_", "") },
            amount: form[key],
          };
        });
    }

    const body = {
      title: form["title"],
      description: form["title"],
      amount: form["amount"],
      owner: { id: currentUser.id },
      group: { id: groupId },
      involved: involved,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
      body: JSON.stringify(body),
    };
    fetch(`${backendApiUrl}/transaction`, requestOptions)
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

  const amount = parseFloat(formMethods.watch("amount"));
  const splitEqual = formMethods.watch("splitEqual");

  // unregister member's amount
  useEffect(() => {
    if (splitEqual) {
      members.forEach((member) =>
        formMethods.unregister("Group_Member_" + member.id.toString())
      );
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
      <Pressable
        disabled={!canSend}
        onPress={formMethods.handleSubmit(onSubmit, onErrors)}
      >
        <View style={styles.sendButton}>
          <AntDesign name="upload" size={24} color="white" />
        </View>
      </Pressable>
    </View>
  );
};

export default AddTransactionForm;
