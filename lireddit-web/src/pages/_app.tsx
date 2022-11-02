import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { AppProps } from "next/app";
import "../styles/layout.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
  );
}

export default MyApp;
