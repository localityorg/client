import "../styles/globals.css";

import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";

import { client } from "../apollo/Provider";
import { Store } from "../redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={Store}>
        <Component {...pageProps} />
      </Provider>
    </ApolloProvider>
  );
}
