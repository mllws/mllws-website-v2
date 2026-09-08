import Link from "next/link";
import MembershipForm from "@/components/MembershipForm";

export const metadata = {
    title: "Membership Application",
    description:
        "Apply for membership with Mother Language Lovers of the World Society.",
};

export default function MembershipApplicationPage() {
    return (
        <div>
            <section className="mx-auto max-w-[900px] px-6 pt-16 pb-8 sm:px-12 sm:pt-20">
                <Link href="/membership" className="text-sm font-bold text-brand no-underline hover:text-accent">
                    ← Back to Membership
                </Link>
                <h1 className="font-display mt-6 text-[40px] font-extrabold tracking-tight sm:text-[46px]">
                    Membership Application
                </h1>
                <p className="mt-4 text-lg text-muted">
                    Choose your membership tier and tell us a little about yourself.
                </p>
            </section>

            <MembershipForm />
        </div>
    );
}
