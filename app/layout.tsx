import { createClient } from "@/utils/supabase/server";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Provider from "@/components/Provider";
import Stack from "@/components/Stack";
import Head from "next/head";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "One-Bite Planner",
  description: "원대한 목표를 당장 실행 가능한 한 입 거리 계획으로 나눠드려요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
    <html lang="en">
      <Head>
        <link
          rel="stylesheet"
          as="style"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </Head>
      <body className="bg-background text-foreground">
        <Provider>
          <Stack minHeight="100vh">
            <Header isSupabaseConnected={isSupabaseConnected} />
            <Stack component="main" flex={1}>
              {children}
            </Stack>
            <Footer />
          </Stack>
        </Provider>
      </body>
    </html>
  );
}
