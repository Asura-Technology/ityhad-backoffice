"use client";

import dataProviderHasura, { GraphQLClient } from "@refinedev/hasura";
import { getAccessToken } from "@utils/tokenManager";

// read the cookie named "accessToken"
const accessToken = getAccessToken();

export const client = new GraphQLClient("/api/graphql", {
  headers: {
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  },
});

export const dataProvider = dataProviderHasura(client);
