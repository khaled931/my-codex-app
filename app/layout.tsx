import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LayoutWrapper from "./layout-wrapper";

export const metadata: Metadata = {
  title: "Syrian Renewables - استشارات الطاقة المتجددة",
  description: "شركة استشارية متخصصة في الطاقة المتجددة والاستدامة في سوريا | Renewable Energy & Sustainability Consultancy in Syria",
  keywords: "renewable energy, solar, wind, sustainability, Syria, الطاقة المتجددة, الطاقة الشمسية, الاستدامة, سوريا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar">
      <body className="antialiased min-h-screen flex flex-col">
        <LanguageProvider>
          <LayoutWrapper>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </LayoutWrapper>
        </LanguageProvider>
      </body>
    </html>
  );
}
