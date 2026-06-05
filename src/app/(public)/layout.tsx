import type { Metadata } from "next";
import "../globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import Providers from "@/components/Providers";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <AuthProvider>
          <Header />
          <Providers>{children}</Providers>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
