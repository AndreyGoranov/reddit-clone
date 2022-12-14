import { Box, Button, FormLabel } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { useMutation } from "urql";
import { InputField } from "../../components/inputField";
import Wrapper from "../../components/wrapper";
import { CreatePostDocument } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { Textarea } from "@chakra-ui/react";
import { useState } from "react";

interface createPostProps {
  title: string;
  body: string;
}

const CreatePost: React.FC<createPostProps> = ({}) => {
  const [body, setBody] = useState("");
  const handleBodyInputChange = (e) => {
    setBody(e.target.value);
  };
  const router = useRouter();
  const [, createPost] = useMutation(CreatePostDocument);
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={async (values) => {
          try {
            await createPost({ options: { ...values, body } });
            router.push("/");
          } catch (err) {
            throw new Error(err);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="title" label="Title" />
            <Box mt={4}>
              <FormLabel>Content</FormLabel>
              <Textarea
                onChange={handleBodyInputChange}
                name="text"
                placeholder="text..."
                value={body}
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Create post
            </Button>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
