import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";
import styles from "./styles";
import CheckBox from "react-native-check-box";

export type CheckItemProps = {
  name: string;
  label: string;
  [key: string]: any;
};
const CheckItem = (props: CheckItemProps) => {
  const { name, label, rules, defaultValue = null, ...inputTextProps } = props;

  const formContext = useFormContext();
  const {
    control,
    formState: { errors },
  } = formContext;

  useEffect(() => {
    return () => {
      formContext.unregister(name);
    };
  }, []);

  const { field } = useController({ name, control, rules, defaultValue });
  return (
    <View>
      <CheckBox
        onClick={() => field.onChange(field.value === 1 ? 0 : 1)}
        isChecked={field.value === 1}
        rightText={label}
        checkedCheckBoxColor="#78b2de"
        uncheckedCheckBoxColor="black"
      />
    </View>
  );
};

export default CheckItem;
