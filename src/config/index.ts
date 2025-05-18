// config/index.ts

interface Config {
  NEXT_PUBLIC_HASURA_API_URL: string;
  NEXT_PUBLIC_HASURA_ADMIN_SECRET: string;
}

export default function getConfig(): Config {
  if (typeof window !== "undefined" && window.__ENV) {
    // running in browser - production/runtime injected env
    return {
      NEXT_PUBLIC_HASURA_API_URL: window.__ENV.NEXT_PUBLIC_HASURA_API_URL,
      NEXT_PUBLIC_HASURA_ADMIN_SECRET:
        window.__ENV.NEXT_PUBLIC_HASURA_ADMIN_SECRET,
    };
  } else {
    // probably node/dev mode, use process.env
    return {
      NEXT_PUBLIC_HASURA_API_URL: process.env.NEXT_PUBLIC_HASURA_API_URL || "",
      NEXT_PUBLIC_HASURA_ADMIN_SECRET:
        process.env.NEXT_PUBLIC_HASURA_ADMIN_SECRET || "",
    };
  }
}
