import React, { useState } from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/wrapper";
import { InputField } from "../components/inputField";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";

interface registerProps {
  username: string;
  password: string;
}

const REGISTER_MUTATION = `mutation Register($username: String!, $password: String!) {
  register(options: {username: $username, password: $password}) {
    errors{
      field
      message
    }
    user {
      id
      username
    }
  }
}`

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const response = await register(values);
          return response;
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="username"
              label="Username*"
              type="name"
            />
            <Box mt={3}>
              <InputField
                name="password"
                placeholder="password"
                label="Password*"
                type="password"
              />
            </Box>
            <Button
              mt={5}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
