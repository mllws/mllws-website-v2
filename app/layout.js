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
import {
  languageHoverFlag,
  becomeAMemberFlag,
  donateFlag,
  volunteerFlag,
  hearItInYourLanguageFlag,
} from "@/flags";
import { getInvolvedUrls } from "@/lib/get-involved-href";
import { organizationSchema } from "@/lib/data";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

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
  metadataBase: new URL(organizationSchema.url),
  icons: {
    icon: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
  title: {
    default: "Mother Language Lovers of the World Society (MLLWS)",
    template: "%s | MLLWS",
  },
  description:
    "Mother Language Lovers of the World Society is a non-profit organization which bring together various linguistic and cultural origins to celebrate their heritage and enrich multiculturalism and intercultural harmony. We also promote the International Mother Language Day (Feb 21) to build national as well as community-level capacity for inclusive education and multilingualism as envisioned by the UNESCO.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: organizationSchema.url,
    siteName: organizationSchema.name,
    title: "Mother Language Lovers of the World Society (MLLWS)",
    description: organizationSchema.description,
    images: [{ url: organizationSchema.logo, alt: `${organizationSchema.name} logo` }],
  },
  twitter: {
    card: "summary",
    title: "Mother Language Lovers of the World Society (MLLWS)",
    description: organizationSchema.description,
    images: [organizationSchema.logo],
  },
};

export default async function RootLayout({ children }) {
  const [
    languageHover,
    becomeAMember,
    donate,
    volunteer,
    hearItInYourLanguage,
  ] = await Promise.all([
    languageHoverFlag(),
    becomeAMemberFlag(),
    donateFlag(),
    volunteerFlag(),
    hearItInYourLanguageFlag(),
  ]);

  const { membershipHref, donateHref, volunteerHref } = getInvolvedUrls({
    becomeAMember,
    donate,
    volunteer,
  });

  return (
    <html lang="en" className={`h-full antialiased ${fontVariables}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className="flex min-h-full flex-col font-sans"
        data-language-hover={languageHover ? "on" : "off"}
      >
        <FeatureFlagsProvider
          value={{
            languageHover,
            becomeAMember,
            donate,
            volunteer,
            hearItInYourLanguage,
            membershipHref,
            donateHref,
            volunteerHref,
          }}
        >
          <SkipLink />
          <Header />
          <main id="main-content" className="flex-1">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </FeatureFlagsProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
