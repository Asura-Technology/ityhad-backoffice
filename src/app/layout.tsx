import { Metadata } from "next";
import { cookies } from "next/headers";
import React, { Suspense } from "react";
import { GitHubBanner } from "@refinedev/core";
import { RefineKbarProvider } from "@refinedev/kbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "@refinedev/antd/dist/reset.css";
import { ColorModeContextProvider } from "@contexts/color-mode";
import { RefineWrapper } from "@components/refine-wrapper";
import { QueryProvider } from "@providers/query-provider";
import Script from "next/script";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "iTyhad",
  description: "Ensemble contre le harcèlement scolaire",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const defaultMode = theme?.value === "dark" ? "dark" : "light";

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="/runtime-env.js" defer />
      </head>
      <body>
        <Providers>
          <Suspense>
            <QueryProvider>
              <RefineKbarProvider>
                <AntdRegistry>
                  <ColorModeContextProvider defaultMode={defaultMode}>
                    <RefineWrapper>{children}</RefineWrapper>
                  </ColorModeContextProvider>
                </AntdRegistry>
              </RefineKbarProvider>
            </QueryProvider>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
