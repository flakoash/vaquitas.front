import React, { useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { Picker, View, Text } from "react-native";
import styles from "./styles";

export type SelectProps = {
  name: string;
  items:
    | {
        text: string;
        value: number;
      }[]
    | null; // array of (text, value) pairs
  enabled: boolean;
  [key: string]: any;
};

const Select = (props: SelectProps) => {
  const {
    name,
    rules,
    enabled = true,
    defaultValue = "",
    placeHolder = "",
    style = styles.combobox,
    items,
    ...inputTextProps
  } = props;

  const formContext = useFormContext();
  const {
    control,
    formState: { errors },
  } = formContext;

  const { field } = useController({ name, control, rules, defaultValue });

  let localItems = [];

  if (items !== null) {
    localItems = [...items];
    localItems.unshift({ value: 0, text: placeHolder });
  } else localItems = [{ value: 0, text: placeHolder }];

  const handleSelect = (value: any) => {
    if (value !== 0) field.onChange(value);
    else {
      field.onChange(null);
    }
    field.onBlur();
  };
  return (
    <View>
      <View style={style}>
        <Picker
          selectedValue={field.value}
          onValueChange={(itemValue, itemIndex) => handleSelect(itemValue)}
          enabled={enabled}
        >
          {localItems.map((item) => (
            <Picker.Item
              label={item.text}
              value={item.value}
              key={item.value}
            />
          ))}
        </Picker>
      </View>
      {errors[name] && (
        <Text style={[styles.errorText, { textAlign: "left", marginLeft: 20 }]}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
};

export default Select;
