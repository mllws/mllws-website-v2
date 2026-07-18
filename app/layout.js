import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkipLink from "@/components/SkipLink";

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
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
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
