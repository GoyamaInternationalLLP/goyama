import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Goyama International",
  description: "Export and import company",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextTopLoader
          color="#D4AF37"
          height={4}
        />
        <Navbar />
        <main className="relative overflow-hidden">{children}</main>
        <footer id="footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
