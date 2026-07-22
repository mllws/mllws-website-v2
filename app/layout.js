import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: {
    default: "Mother Language Lovers of the World Society (MLLWS)",
    template: "%s | MLLWS",
  },
  description:
    "Mother Language Lovers of the World Society is a non-profit organization which bring together various linguistic and cultural origins to celebrate their heritage and enrich multiculturalism and intercultural harmony. We also promote the International Mother Language Day (Feb 21) to build national as well as community-level capacity for inclusive education and multilingualism as envisioned by the UNESCO.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`h-full antialiased ${plusJakarta.variable} ${inter.variable}`}>
      <body className="flex min-h-full flex-col font-sans">
        <SkipLink />
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
