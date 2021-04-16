import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { Text, View, TextInput } from "react-native";
import styles from "./styles";

export type InputProps = {
  name: string;
  [key: string]: any;
};
const Input = (props: InputProps) => {
  const { name, rules, defaultValue = "", ...inputTextProps } = props;
  const formContext = useFormContext();
  const {
    control,
    formState: { errors },
  } = formContext;

  const { field } = useController({ name, control, rules, defaultValue });
  return (
    <View>
      <TextInput
        {...inputTextProps}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
      />
      {errors[name] && (
        <Text style={styles.errorText}> {errors[name].message} </Text>
      )}
    </View>
  );
};

export default Input;
