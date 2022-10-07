import React from "react";
import { useField } from "formik";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";

type InputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
};

export const InputField: React.FC<InputFieldProps> = (props) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{props.label}</FormLabel>
      <Input
        {...field}
        placeholder={props.placeholder}
        id={field.name}
        type={props.type}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
