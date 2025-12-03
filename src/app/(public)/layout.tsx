import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Intertex",
  description: "Intertex - Connecting Ideas, Building Futures",
  icons: "/logo/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
