import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { Text, CheckBox, View } from "react-native";
import styles from "./styles";

export type InputProps = {
  name: string;
  [key: string]: any;
};
const CustomCheckBox = (props: InputProps) => {
  const { name, rules, defaultValue = "", ...inputTextProps } = props;
  const formContext = useFormContext();
  const {
    control,
    formState: { errors },
  } = formContext;

  const { field } = useController({ name, control, rules, defaultValue });
  return (
    <View>
      <CheckBox
        {...inputTextProps}
        value={field.value}
        onValueChange={field.onChange}
      />
      {errors[name] && (
        <Text style={styles.errorText}> {errors[name].message} </Text>
      )}
    </View>
  );
};

export default CustomCheckBox;
