import React, { useEffect } from "react";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import { Text, View } from "react-native";
import { useController, useFormContext } from "react-hook-form";
import styles from "./styles";

export type RadioProps = {
  name: string;
  label: string;
  radioProps: object[];
  [key: string]: any;
};
const Radio = (props: RadioProps) => {
  const {
    name,
    label,
    formHorizontal = false,
    radioProps,
    rules,
    defaultValue = null,
    ...inputTextProps
  } = props;

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
    <View style={{ marginBottom: 5, marginTop: 5 }}>
      <Text style={[styles.label, { marginBottom: 5 }]}>{label}</Text>
      <RadioForm formHorizontal={formHorizontal} animation={false}>
        {radioProps.map((obj, i) => (
          <RadioButton labelHorizontal={true} key={i}>
            <RadioButtonInput
              obj={obj}
              index={i}
              isSelected={
                radioProps.findIndex(
                  (item: any) => item.value === field.value
                ) === i
              }
              onPress={(value) => field.onChange(value)}
              buttonInnerColor={"#82b1ff"}
              buttonOuterColor={
                radioProps.findIndex(
                  (item: any) => item.value === field.value
                ) === i
                  ? "#82b1ff"
                  : "#333"
              }
              buttonSize={10}
              buttonOuterSize={20}
              buttonStyle={{}}
              buttonWrapStyle={{ marginLeft: 10 }}
            />
            <RadioButtonLabel
              obj={obj}
              index={i}
              labelHorizontal={true}
              onPress={(value) => field.onChange(value)}
              labelStyle={{ fontSize: 14, color: "#333" }}
              labelWrapStyle={{}}
            />
          </RadioButton>
        ))}
      </RadioForm>
      {errors[name] && (
        <Text style={styles.errorText}> {errors[name].message} </Text>
      )}
    </View>
  );
};

export default Radio;
