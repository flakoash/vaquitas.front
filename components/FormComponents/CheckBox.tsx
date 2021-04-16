import React from "react";
import { useController, useFormContext } from "react-hook-form";
import { CheckBox } from "react-native";

export type InputProps = {
  name: string;
  [key: string]: any;
};
const CustomCheckBox = (props: InputProps) => {
  const { name, ...inputTextProps } = props;
  const formContext = useFormContext();
  const { control } = formContext;

  const { field } = useController({ name, control });
  return (
    <CheckBox
      {...inputTextProps}
      value={field.value}
      onValueChange={field.onChange}
    />
  );
};

export default CustomCheckBox;
