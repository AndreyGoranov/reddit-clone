import React, { useState } from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/wrapper";
import { InputField } from "../components/inputField";
import { Box, Button } from "@chakra-ui/react";
import { useMutation } from "urql";
import { RegisterDocument } from "../generated/graphql";
import { toErrorMap } from "./../utils/toErrorMap";
import { useRouter } from "next/router";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface registerProps {
  username: string;
  password: string;
  email: string;
}

const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, register] = useMutation(RegisterDocument);
  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "", email: "" }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const response = await register(values);
          console.log(response);
          if (response.data?.register?.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register?.user) {
            setSubmitting(false);
            router.push("/");
          }
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
            <Box mt={3}>
              <InputField
                name="email"
                placeholder="email"
                label="Email*"
                type="email"
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

export default withUrqlClient(createUrqlClient)(Register);
