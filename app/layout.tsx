import "@radix-ui/themes/styles.css";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./nav-bar";
import { Theme, ThemePanel } from "@radix-ui/themes";
import QueryClientProvider from "./context/query-client-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Issues Tracker",
  description:
    "Supercharge your productivity with our Issue Tracker App. Get started today!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider>
          <Theme appearance="light" accentColor="crimson" radius="large">
            <Navbar />
            <main className="p-5">{children}</main>
            {/* <ThemePanel /> */}
          </Theme>
        </QueryClientProvider>
      </body>
    </html>
  );
}
