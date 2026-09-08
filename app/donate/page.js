import Link from "next/link";
import ZeffyDonationEmbed from "@/components/ZeffyDonationEmbed";

export const metadata = {
    title: "Donate",
    description:
        "Support Mother Language Lovers of the World Society and help keep mother languages alive.",
};

export default function DonatePage() {
    return (
        <div>
            <section className="mx-auto max-w-[900px] px-6 pt-16 pb-8 sm:px-12 sm:pt-20">
                <Link href="/" className="text-sm font-bold text-brand no-underline hover:text-accent">
                    ← Back to Home
                </Link>
                <h1 className="font-display mt-6 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
                    Make a Donation
                </h1>
                <p className="mt-4 text-lg text-muted">
                    Your gift helps keep mother languages alive and supports inclusive community celebrations.
                </p>
            </section>

            <section className="mx-auto max-w-[1200px] px-6 pb-16 sm:px-12 sm:pb-22">
                <ZeffyDonationEmbed />
            </section>
        </div>
    );
}
