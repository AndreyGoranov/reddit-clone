import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  variant?: "small" | "regular";
}

const Wrapper: React.FC<WrapperProps> = ({ children, variant = "small" }) => {
  return (
    <Box
      mt={8}
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      mx="auto"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
