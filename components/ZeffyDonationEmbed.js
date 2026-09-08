"use client";

const ZEFFY_DONATION_EMBED_URL =
    "https://www.zeffy.com/embed/donation-form/make-a-donation-help-keep-mother-languages-alive";

export default function ZeffyDonationEmbed() {
    return (
        <div className="w-full overflow-hidden rounded-2xl border border-border-muted bg-white">
            <div className="relative h-[max(850px,calc(100dvh-140px))] w-full overflow-hidden">
                <iframe
                    title="Donation form powered by Zeffy"
                    className="absolute inset-0 h-full w-full border-0"
                    src={ZEFFY_DONATION_EMBED_URL}
                    allow="payment"
                    allowTransparency="true"
                    scrolling="no"
                />
            </div>
        </div>
    );
}
