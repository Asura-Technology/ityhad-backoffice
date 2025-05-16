"use client";

import dataProviderHasura, { GraphQLClient } from "@refinedev/hasura";

export const client = new GraphQLClient(
  process.env.NEXT_PUBLIC_HASURA_API_URL as string,
  {
    headers: {
      "x-hasura-admin-secret": process.env
        .NEXT_PUBLIC_HASURA_ADMIN_SECRET as string,
    },
  }
);

export const dataProvider = dataProviderHasura(client);
