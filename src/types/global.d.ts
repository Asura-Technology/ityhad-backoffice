// types/global.d.ts
export {}; // this file is a module

declare global {
  interface Window {
    __ENV: {
      NEXT_PUBLIC_HASURA_API_URL: string;
      NEXT_PUBLIC_HASURA_ADMIN_SECRET: string;
    };
  }
}
