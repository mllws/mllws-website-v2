"use client";

const ZEFFY_EMBED_URL =
    "https://www.zeffy.com/embed/ticketing/mother-language-lovers-of-the-world-society-memberships";

export default function ZeffyMembershipEmbed() {
    return (
        <div className="w-full overflow-hidden rounded-2xl border border-border-muted bg-white">
            <div className="relative h-[max(1000px,calc(100dvh-140px))] w-full overflow-hidden">
                <iframe
                    title="Membership payment form powered by Zeffy"
                    className="absolute inset-0 h-full w-full border-0"
                    src={ZEFFY_EMBED_URL}
                    allow="payment"
                    allowTransparency="true"
                    scrolling="no"
                />
            </div>
        </div>
    );
}
