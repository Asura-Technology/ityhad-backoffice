"use client";

import getConfig from "@config";
import dataProviderHasura, { GraphQLClient } from "@refinedev/hasura";

const { NEXT_PUBLIC_HASURA_API_URL, NEXT_PUBLIC_HASURA_ADMIN_SECRET } =
  getConfig();
export const client = new GraphQLClient(NEXT_PUBLIC_HASURA_API_URL, {
  headers: {
    "x-hasura-admin-secret": NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export const dataProvider = dataProviderHasura(client);
