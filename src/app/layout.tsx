import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import TopNavbar from "@/components/layout/Navbar/TopNavbar";
import Footer from "@/components/layout/Footer";
import HolyLoader from "holy-loader";
import Providers from "./providers";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nadav Resorts & Events",
  description: "Premium Resorts, Event Management, Destination Weddings, Corporate Events and Hospitality Services.",
  keywords: "Resorts, Event Management, Destination Wedding, Resort Booking, Hospitality Services, Kerala Events",
  openGraph: {
    siteName: "Nadav Resorts & Events",
    title: "Nadav Resorts & Events",
    description: "Premium Resorts, Event Management, Destination Weddings, Corporate Events and Hospitality Services.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nadav Resorts & Events",
    description: "Premium Resorts, Event Management, Destination Weddings, Corporate Events and Hospitality Services.",
  }
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.className} ${cormorant.variable} ${dmSans.variable} flex flex-col min-h-screen`}>
        <HolyLoader color="#868686" />
        <Providers>
          {/* Navbar */}
          <TopNavbar />
          
          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>
          
          {/* Footer - Always at bottom */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
