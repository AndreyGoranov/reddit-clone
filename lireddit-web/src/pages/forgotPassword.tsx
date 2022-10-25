import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import React, { useState } from "react";
import { useMutation } from "urql";
import { InputField } from "../components/inputField";
import Wrapper from "../components/wrapper";
import { ForgotPasswordDocument } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { toErrorMap } from "../utils/toErrorMap";

interface ForgotPasswordProps {
  email: string;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [, forgotPassword] = useMutation(ForgotPasswordDocument);
  const [emailSent, setEmailSent] = useState(false);
  return (
    <Wrapper>
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values, { setErrors, setSubmitting }) => {
          const response = await forgotPassword(values);
          if (!response.data.forgotPassword) {
            setErrors(
              toErrorMap([
                {
                  field: "email",
                  message: "Email doesn't exist in our system",
                },
              ])
            );
          } else {
            setEmailSent(true);
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="email"
              placeholder="email"
              label="Account Email*"
              type="email"
            />
            <Button
              mt={5}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Forgot Password
            </Button>
            {emailSent ? (
              <Box mt={5} color="teal">
                Check your email to proceed with password reset
              </Box>
            ) : null}
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
