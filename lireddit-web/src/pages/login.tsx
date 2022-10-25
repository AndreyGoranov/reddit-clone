import React, { useState } from "react";
import { Form, Formik } from "formik";
import Wrapper from "../components/wrapper";
import { InputField } from "../components/inputField";
import { Box, Button, Link } from "@chakra-ui/react";
import { useMutation } from "urql";
import { toErrorMap } from "./../utils/toErrorMap";
import { useRouter } from "next/router";
import { LoginDocument } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface loginProps {
  username: string;
  password: string;
}

const linkStyle = {
  marginTop: "10px !important",
};

const Login: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [, login] = useMutation(LoginDocument);

  return (
    <Wrapper>
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const response = await login(values);
          if (response.data?.login?.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login?.user) {
            console.log("logged in =]");
            setSubmitting(false);
            router.push("/");
          }

          console.log(response.data?.login);
          console.log(response);
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
            <Box display="flex" justifyContent="space-between">
              <Button
                mt={5}
                colorScheme="teal"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
              <Link mt={5} fontWeight="thin" href="/forgotPassword">
                Forgot Password?
              </Link>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(Login);
