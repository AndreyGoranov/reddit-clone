import { Button, Box } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { InputField } from "../../components/inputField";
import Wrapper from "../../components/wrapper";
import { ChangePasswordDocument } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { toErrorMap } from "../../utils/toErrorMap";

const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
  const [, changePassword] = useMutation(ChangePasswordDocument);
  const router = useRouter();
  return (
    <Wrapper>
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({ ...values, token });
          console.log(response.data?.changePassword, "RESPONSE CHANGEPASS");
          if (response.data?.changePassword?.errors) {
            setErrors(toErrorMap(response.data.changePassword.errors));
          } else {
            router.push("/");
          }
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <InputField
              name="newPassword"
              placeholder="password"
              label="New Password*"
              type="password"
            />
            <Box mt={3}>
              <InputField
                name="confirmPassword"
                placeholder="password"
                label="Confirm Password*"
                type="password"
              />
            </Box>

            <Button
              mt={5}
              colorScheme="teal"
              isLoading={isSubmitting}
              type="submit"
            >
              Change Password
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

// nextjs function that get any query params and pass it to the component
ChangePassword.getInitialProps = ({ query }) => {
  return {
    token: query.token as string,
  };
};

export default withUrqlClient(createUrqlClient, { ssr: false })(ChangePassword);
