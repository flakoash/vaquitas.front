import React from "react";
import { useFormContext } from "react-hook-form";
import { View, Text } from "react-native";
import CheckItem from "./CheckItem";
import styles from "./styles";

export type CheckProps = {
  label: string;
  checkProps: object[]; // in form [{name: a, text: a }]
  [key: string]: any;
};
const Check = (props: CheckProps) => {
  const {
    label,
    checkProps,
    rules = {},
    defaultValue = null,
    ...inputTextProps
  } = props;

  const formContext = useFormContext();
  const {
    control,
    formState: { errors },
  } = formContext;

  const required = (value: any) => {
    const values = formContext.getValues(checkProps.map((check) => check.name));
    return values.some((value) => value !== null && value !== 0);
  };

  const checkRules =
    "required" in rules
      ? { required: rules["required"], validate: required }
      : {};
  const checkErrors = checkProps
    .map((check) => errors[check.name])
    .some((value) => value !== undefined);
  return (
    <View style={{ marginBottom: 5, marginTop: 5 }}>
      <Text style={[styles.label, { marginBottom: 5 }]}>{label}</Text>
      {checkProps.map((check) => (
        <CheckItem
          defaultValue={0}
          key={check.name}
          name={check.name}
          label={check.text}
          rules={checkRules}
        />
      ))}
      {checkErrors && <Text style={styles.errorText}> Requerido! </Text>}
    </View>
  );
};

export default Check;
