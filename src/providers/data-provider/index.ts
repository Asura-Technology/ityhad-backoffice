"use client";

import config from "@config";
import dataProviderHasura, { GraphQLClient } from "@refinedev/hasura";

export const client = new GraphQLClient(config.NEXT_PUBLIC_HASURA_API_URL, {
  headers: {
    "x-hasura-admin-secret": config.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
  },
});

export const dataProvider = dataProviderHasura(client);
