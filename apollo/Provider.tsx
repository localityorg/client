// apollo
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";

const URI = `http://${process.env.BASE_URL}/graphql`;

// websocket link
const wsLink =
  typeof window !== "undefined"
    ? new GraphQLWsLink(
        createClient({
          url: `ws://${process.env.BASE_URL}/subscriptions`,
          shouldRetry() {
            return true;
          },
        })
      )
    : null;

// http link
const httpLink = createHttpLink({
  uri: URI,
});

const authLink = setContext(() => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      source: `locale-store-${token || ""}`,
    },
  };
});

const link =
  typeof window !== "undefined" && wsLink != null
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
          );
        },
        wsLink,
        authLink.concat(httpLink)
      )
    : httpLink;

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: false,
    resultCaching: true,
  }),
});
