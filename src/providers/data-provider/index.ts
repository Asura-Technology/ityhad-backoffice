"use client";

import dataProviderHasura, { GraphQLClient } from "@refinedev/hasura";

if (!process.env.NEXT_PUBLIC_HASURA_API_URL) {
  throw new Error("NEXT_PUBLIC_HASURA_API_URL is not defined");
}

if (!process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET) {
  throw new Error("NEXT_PUBLIC_HASURA_ADMIN_SECRET is not defined");
}

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_API_URL,
  {
    headers: {
      "x-hasura-admin-secret": process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
    },
  }
);

export const dataProvider = dataProviderHasura(client);
