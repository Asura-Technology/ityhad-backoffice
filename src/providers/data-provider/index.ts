"use client";

import dataProviderHasura, { GraphQLClient } from "@refinedev/hasura";
import { getAccessToken } from "@utils/tokenManager";

export const client = new GraphQLClient("/api/graphql", {
  headers: () => {
    const accessToken = getAccessToken();
    return {
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
  },
});

export const dataProvider = dataProviderHasura(client);
