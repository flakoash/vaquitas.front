import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { TextInput } from "react-native";

export type InputProps = {
  name: string;
  [key: string]: any;
};
const Input = (props: InputProps) => {
  const { name, ...inputTextProps } = props;
  const formContext = useFormContext();
  const { control } = formContext;

  const { field } = useController({ name, control });
  return (
    <TextInput
      {...inputTextProps}
      onChangeText={field.onChange}
      onBlur={field.onBlur}
      value={field.value}
    />
  );
};

export default Input;
