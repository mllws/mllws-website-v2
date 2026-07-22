import {
  Plus_Jakarta_Sans,
  Inter,
  Noto_Sans_Bengali,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Devanagari,
  Noto_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";
import PageTransition from "@/components/PageTransition";
import { FeatureFlagsProvider } from "@/lib/feature-flags-context";
import { languageHoverFlag } from "@/flags";

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

const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-bengali",
  display: "swap",
  preload: false,
});

const notoGurmukhi = Noto_Sans_Gurmukhi({
  subsets: ["gurmukhi"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-gurmukhi",
  display: "swap",
  preload: false,
});

const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-devanagari",
  display: "swap",
  preload: false,
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-arabic",
  display: "swap",
  preload: false,
});

const fontVariables = [
  plusJakarta.variable,
  inter.variable,
  notoBengali.variable,
  notoGurmukhi.variable,
  notoDevanagari.variable,
  notoArabic.variable,
].join(" ");

export const metadata = {
  title: {
    default: "Mother Language Lovers of the World Society (MLLWS)",
    template: "%s | MLLWS",
  },
  description:
    "Mother Language Lovers of the World Society is a non-profit organization which bring together various linguistic and cultural origins to celebrate their heritage and enrich multiculturalism and intercultural harmony. We also promote the International Mother Language Day (Feb 21) to build national as well as community-level capacity for inclusive education and multilingualism as envisioned by the UNESCO.",
};

export default async function RootLayout({ children }) {
  const languageHover = await languageHoverFlag();

  return (
    <html lang="en" className={`h-full antialiased ${fontVariables}`}>
      <body
        className="flex min-h-full flex-col font-sans"
        data-language-hover={languageHover ? "on" : "off"}
      >
        <FeatureFlagsProvider value={{ languageHover }}>
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </FeatureFlagsProvider>
      </body>
    </html>
  );
}
