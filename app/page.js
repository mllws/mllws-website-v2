import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import PullQuote from "@/components/PullQuote";
import { gviewUrl } from "@/lib/data";

const IMG = "https://www.motherlanguagelovers.com";

export default function Home() {
  return (
    <div>
      <HeroCarousel />

      <section aria-label="Follow us on Facebook" className="border-b border-border-muted bg-surface-muted">
        <div className="mx-auto flex max-w-6xl justify-center px-4 py-4">
          <iframe
            title="Facebook Like button for the MLLWS Facebook page"
            src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fwww.facebook.com%2Fmotherlanguagelovers&width=450&layout&action&size&share=true&height=35&appId=135741412075507"
            width="450"
            height="35"
            style={{ border: "none", overflow: "hidden", maxWidth: "100%" }}
            scrolling="no"
            frameBorder="0"
          />
        </div>
      </section>

      <section aria-labelledby="upcoming-heading" className="mx-auto max-w-6xl px-4 py-14">
        <p className="section-eyebrow mb-3 max-w-xs">02 — Upcoming</p>
        <h2 id="upcoming-heading" className="text-3xl font-bold text-brand-dark">
          Events
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="overflow-hidden rounded-lg shadow-md">
            <Image
              src={`${IMG}/Content/Pictures/UpcomingEvents/MLF_2026.jpg`}
              alt="12th Mother Language Festival, 2026"
              width={600}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-brand-dark">
              12th Mother Language Festival, 2026
            </h3>
            <p className="mt-3 text-gray-700">
              Let&apos;s come together to raise awareness and honor the importance
              of mother languages! Join us in celebrating 25 years of
              International Mother Language Day and the richness and diversity
              of languages from around the world!
            </p>
            <p className="mt-3 text-gray-700">
              Join the Mother Language Lovers of the World Society (MLLWS) for
              the 12th Mother Language Festival 2026 — A vibrant celebration of
              languages, cultures, and unity! This festival celebrates the
              richness of mother languages—including Indigenous languages,
              Braille, sign languages, and minority linguistic traditions—in
              alignment with UNESCO&apos;s International Mother Language Day,
              Canada&apos;s Bill S-214, and British Columbia&apos;s commitment to
              language diversity.
            </p>

            <div className="mt-5 rounded-lg border border-border-muted bg-surface-muted p-4">
              <p className="font-semibold text-brand-dark">When &amp; Where?</p>
              <p className="mt-1 text-gray-700">Sunday, 9th Aug 2026</p>
              <p className="text-gray-700">4:00 PM - 7:00 PM</p>
              <p className="mt-2 text-gray-700">
                <a
                  href="https://maps.app.goo.gl/2JistjGnz2iezhV37"
                  className="font-medium text-brand hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Holland Park
                </a>
                <br />
                <a
                  href="https://maps.app.goo.gl/2JistjGnz2iezhV37"
                  className="text-brand hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  13428 Old Yale Rd, Surrey, BC
                </a>
              </p>
              <p className="mt-2 space-x-4 text-sm">
                <a
                  href="https://www.surrey.ca/news-events/events/mother-language-festival-2026"
                  className="text-brand hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  City of Surrey Event Link
                </a>
                <a
                  href="https://www.facebook.com/events/4941717739388307"
                  className="text-brand hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Facebook Event Link
                </a>
              </p>
            </div>

            <div className="mt-5">
              <p className="font-semibold text-brand-dark">Event Sponsors</p>
              <ul className="mt-1 list-inside list-disc text-gray-700">
                <li>City of Surrey</li>
                <li>Desjardins - Financial Security</li>
                <li>Mabuhay House</li>
                <li>Coldfish Seafood Co. Inc.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 md:items-start">
          <div className="order-2 md:order-1">
            <p className="text-sm font-semibold uppercase tracking-widest text-accent">
              7th Death Anniversary of
            </p>
            <h3 className="text-2xl font-bold text-brand-dark">
              Mr. Rafiqul Islam
            </h3>
            <p className="mt-3 text-gray-700">
              The Mother Language Lovers of the World Society (MLLWS) is
              inviting you to attend the special event to commemorate the 7th
              death anniversary of late Mr. Rafiqul Islam, founder of the
              MLLWS and proponent of the International Mother Language Day
              (IMLD).
            </p>
            <p className="mt-3 text-gray-700">
              During this auspicious event we will also celebrate the
              declaration day of IMLD (17th November, 1999) by UNESCO.
            </p>
            <div className="mt-4">
              <p className="font-semibold text-brand-dark">Special Guests:</p>
              <ul className="mt-1 list-inside list-disc text-gray-700">
                <li>Mr. Abdus Salam – Canada</li>
                <li>Ms. Selina Hossain – Bangladesh</li>
                <li>Mr. Hasan Ferdous – USA</li>
                <li>Mr. Khijir Hayat Khan – Bangladesh</li>
                <li>Mr. Mohammad Zaman – Canada</li>
              </ul>
            </div>
            <p className="mt-4 text-gray-700">
              We hope you will join us online to pay a special tribute to this
              great leader and visionary, and support his vision of linguistic
              and cultural diversities through mutual understanding, tolerance
              and dialogue.
            </p>
            <div className="mt-4 rounded-lg border border-border-muted bg-surface-muted p-4">
              <p className="font-semibold text-brand-dark">When &amp; How?</p>
              <p className="mt-1 text-gray-700">Saturday, 21th November 2020</p>
              <p className="text-gray-700">5:30 PM - 7:00 PM (Pacific Standard Time)</p>
              <a
                href="https://www.facebook.com/motherlanguagelovers"
                className="mt-2 inline-block text-brand hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Zoom link will be provided by email &amp; in Facebook
              </a>
            </div>
          </div>
          <div className="order-1 overflow-hidden rounded-lg shadow-md md:order-2">
            <Image
              src={`${IMG}/Content/Pictures/UpcomingEvents/21Nov2020.jpg`}
              alt="7th Death Anniversary of Mr. Rafiqul Islam"
              width={600}
              height={400}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="s214-heading" className="border-t border-border-muted py-14">
        <div className="prose-content mx-auto max-w-4xl px-4">
          <p className="section-eyebrow mb-3 max-w-xs">03 — Milestone</p>
          <h2 id="s214-heading" className="text-3xl font-bold text-brand-dark">
            An act to establish International Mother Language Day (IMLD):
            Historic Bill S-214
          </h2>
          <p>
            March 30th, 2023, is a historic day for Canada and MLLWS. The{" "}
            <a href="https://parl.ca/legisinfo/en/bill/44-1/s-214" target="_blank" rel="noreferrer">
              Bill S-214
            </a>{" "}
            on International Mother Language Day (IMLD) was passed in the
            House of Commons in the Canadian Parliament. This is a significant
            achievement that would not have been possible without the
            continuous dedication and decades of hard work, determination,
            passion, and persistence by several individuals. It would not have
            been possible without the continuous dedication and hard work of
            MLLWS&apos;s current president, Mr. Aminul Islam who has worked
            tirelessly for over a decade with Senator Mobina S. B. Jaffer KC,
            MP Ken Hardie, MP John Aldag, MP Sukh Dhaliwal, the Government of
            Bangladesh, and the Bangladesh High Commission in Ottawa to make
            this happen. Initially, Mr. Aminul worked alone on these
            initiatives since 2007, and from 2012 he continued under the
            MLLWS banner after it was officially registered as a non-profit
            organization in the City of Surrey. The High Commissioner of
            Bangladesh to Canada, H.E. Dr. Khalilur Rahman, was present at the
            House of Commons during the discussion and passing of the bill.
          </p>
          <p>
            Finally, on April 27, 2023, Bill S-214 has received royal assent.
            His Majesty, King Charles III, with the advice and consent of the
            Senate and House of Commons of Canada, enacts the bill. This
            enactment designates the 21st day of February in each and every
            year as &ldquo;International Mother Language Day.&rdquo; By
            adopting this bill, Canada will now officially honor IMLD on
            February 21 every year.
          </p>

          <PullQuote cite="Bill S-214, Royal Assent, April 27, 2023">
            Canada now officially honors the 21st of February, every year,
            as International Mother Language Day.
          </PullQuote>

          <p>
            To respect and celebrate all mother languages, the late Mr.
            Rafiqul Islam, founding president of Mother Language Lovers of
            the World (MLLW), first proposed to The United Nations
            Educational, Scientific, and Cultural Organization (UNESCO) to
            declare February 21st as International Mother Language Day
            (IMLD). In a letter to Kofi Annan, the then Secretary-General of
            the United Nations, on January 9, 1998, Mr. Rafiqul applied to
            commemorate the history of the Bengali nation&apos;s sacrifice for
            language and to wish all the mother languages of the world on
            February 21st as International Mother Language Day. In 1999,
            with the help of the Bangladesh Government and along with 29
            other countries, including Canada, UNESCO unanimously agreed to
            observe International Mother Language Day on February 21st each
            year since 2000.
          </p>
          <p>
            It was vital for Canada to officially observe this day as well,
            given the many languages that are disappearing with the passing
            of the last generation to speak to them. This includes the 104
            indigenous languages spoken in Canada, with 28 in serious danger
            of disappearing. The Act has been introduced to celebrate and
            recognize the contribution of all languages, which are an
            essential part of Canada&apos;s living history.
          </p>
          <p>
            There were several attempts to establish International Mother
            Language Day in Canada. The first one was through Bill C-407 on
            February 21, 2007, during the 39th Parliament. Honorable Sukh
            Dhaliwal MP for Newton—North Delta introduced the Private
            Members Bill C-407, entitled the &ldquo;An Act respecting an
            International Mother Language Day,&rdquo; in the Canadian
            Parliament. The proposed Act seeks to promote linguistic and
            cultural diversity in Canada by officially observing
            International Mother Language Day on February 21st every year.
            Unfortunately, it did not pass at that time.
          </p>
          <p>
            Despite the setback, MLLWS of British Columbia continued their
            efforts. In 2017, Honorable John Aldag MP for Cloverdale-Langley
            City proposed the idea again and tabled it in the Canadian
            Parliament on February 21, 2017. He highlighted that February 21
            is recognized by the global community as International Mother
            Language Day, a day to celebrate the linguistic heritage of
            peoples across the world that was recognized by UNESCO in 1999.
            This effort would not have been possible without the support of
            the Vancouver-based organization, the Mother Language Lovers of
            the World Society.
          </p>
          <p>
            Following this, the MLLWS pushed the private bill with the help
            of Honorable MP John Aldag to the Canadian Senate, where it was
            presented as Bill S-247, also known as An Act to establish
            International Mother Language Day. Sponsored by Senator Mobina S.
            B. Jaffer, the bill passed its Introduction and First Reading on
            March 22, 2018, and its Second Reading on December 5, 2018.
            However, the bill was referred to the Standing Committee of
            Senate on Social Affairs, Science and Technology for further
            review but did not proceed.
          </p>
          <p>
            A new bill, known as Bill S-214, was introduced in the Senate by
            Senator Mobina Jaffer on November 24, 2021, and later in the
            House of Commons by MP Ken Hardie on December 14, 2021. During
            the discussion, Members of Parliament from different parties
            expressed their support for the bill and emphasized the
            importance of language rights. The bill passed its third reading
            in both the Senate and the House of Commons. After being
            reviewed by the Standing Committee on Canadian Heritage, Bill
            S-214 on International Mother Language Day (IMLD) was passed in
            the House of Commons of the Canadian Parliament on March 30th,
            2023.
          </p>
          <p>
            The passing of the Bill S-214 has been met with gratitude and
            acknowledgement for the contributions of those who worked to
            make it a reality. We would like to thank our founding
            President, late Mr. Rafiqul Islam, and Mr. Abdus Salam, our
            current president Mr. Aminul Islam, Honorable Senator Mobina S.
            B. Jaffer KC, MP Ken Hardie, MP John Aldag, MP Sukh Dhaliwal,
            different MLAs, the Honorable Sheikh Hasina, Prime Minister of
            Bangladesh, Bangladesh Government, and the Bangladesh High
            Commission in Ottawa for their outstanding efforts and
            contributions in making this historic event happen. We are
            thrilled to see our efforts being recognized and celebrated in
            such meaningful ways. We see this as just the beginning, and we
            are excited to continue our work towards promoting and
            preserving mother languages in Canada and around the world. We
            extend our heartfelt thanks to all those who have supported us
            throughout this journey.
          </p>
          <p className="text-sm text-gray-500">
            #InternationalMotherLanguageDay #CulturalDiversity #Multilingualism
            #Canada #LanguageLovers #S214 #MLLWS #MotherLanguageLovers
            #MotherLanguageLoversOfTheWorld #MotherLanguageLoversOfTheWorldSociety
          </p>
        </div>
      </section>

      <section aria-labelledby="history-heading" className="border-t border-border-muted bg-surface-muted py-14">
        <div className="prose-content mx-auto max-w-4xl px-4">
          <p className="section-eyebrow mb-3 max-w-xs">04 — Origins</p>
          <h2 id="history-heading" className="text-3xl font-bold text-brand-dark">
            Brief history of International Mother Language Day (IMLD)
          </h2>
          <p>
            To love, observe and conserve all mother languages of the world,
            the pioneer late Mr. Rafiqul Islam (1950-2013) coined the day
            21st February as International Mother Language Day (IMLD),
            because on that day a group of Bangalee people sacrificed their
            lives for their mother language during the Bangla Language
            Movement in 1952.
          </p>
          <p>
            To respect and celebrate all mother languages, Mr Islam first
            proposed to UNESCO to declare the day 21st February as IMLD. In
            1999, with the help of Banladesh and along with 29 countries
            including Canada, the UNESCO eventually proclaim the day as
            IMLD. Since 2000, the day is being celebrated globally to
            promote awareness of linguistic and cultural diversity. Mr.
            Rafiqul Islam is called the Father of IMLD. He was a
            Bangaldeshi Canadian used to live in Surrey, BC; a Freedom
            Fighter during the liberation war of Bangladesh in 1971 and the
            Founding President of Mother Language Lovers Of The World
            Society, BC.
          </p>
          <p>
            On 9th January 1998, Mr. Rafiqul Islam wrote a letter to Mr.
            Kofi Annan requesting him to take a step for saving all mother
            languages around the world from the possibility of extinction
            and to proclaim the IMLD. On 23rd January, on behalf of
            Secretary General Kofi Annan, Mr. Hasan Ferdous, Officer-in-
            Charge, Public Inquiries Unit, Department of Public Information
            first responded and advised Mr. Rafiq to propose the issue from
            any member country of the United Nations.
          </p>
          <p>
            At this point Mr. Rafiqul Islam and his colleague Mr. Abdus
            Salam founded an organization called, the &ldquo;Mother
            Language Lovers of the World&rdquo; with a group of various
            mother language speakers and from that organization they wrote
            to Mr. Kofi Annan for the second time on March 29, 1998.
          </p>
          <p>
            On 8th April 1998, Ms. Anna Maria Majlof, Programme Specialist,
            Languages Division (ED), provided the addresses of the National
            Commissions for UNESCO for five member countries (Canada,
            India, Hungary, Finland and Bangladesh) and advised Mr. Rafiqul
            Islam to place the request formally from those countries.
          </p>
          <p>
            Ms. Maria also noted that the proposal for the declaration of an
            &ldquo;International Day&rdquo; must imperatively be submitted
            to UNESCO&apos;s Executive Board for adoption, which meets
            twice a year. The document, if adopted, will then be presented
            to UNESCO&apos;s General Conference will take place at UNESCO
            HQ this year in November/December.
          </p>
          <p>
            On 16th August 1999, the Hungerian National Commissions for
            UNESCO for the first time responded and replied back to UNESCO
            Paris and supported the idea of declaring 21st February as
            IMLD. On 9th September 1999, the Bangladesh National
            Commissions for UNESCO faxed the supporting proposal to the
            UNESCO Paris, that was the last day of submitting the proposal
            to UNESCO for the 30th Annual General Conference. Meanwhile, 29
            countries were able to support the proposal to table the issue
            in the AGM.
          </p>
          <p>
            On 16th November 1999, the proposal was placed as an agenda in
            the AGM. On 17th November 1999, the proposal was raised in the
            AGM, supported by 188 countries, not opposed by a single
            country, and passed as a decision.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-border-muted shadow-sm">
            <iframe
              title="Interview of Rafiqul Islam in Bangla (PDF document viewer)"
              src={gviewUrl(`${IMG}/Content/Docs/Interview_of_Rafiqul_Islam_in_Bangla.pdf`)}
              className="h-[500px] w-full"
            />
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="bg-brand-dark py-16 text-center text-white sm:py-20">
        <div className="mx-auto max-w-2xl px-4">
          <p className="section-eyebrow-inverse mx-auto mb-3 max-w-[180px] justify-center">
            05 — Join Us
          </p>
          <h2 id="cta-heading" className="text-3xl font-bold sm:text-4xl">
            Help us celebrate every mother language
          </h2>
          <p className="mt-4 text-white/80">
            Learn about our mission, our history, and the people carrying
            International Mother Language Day forward.
          </p>
          <Link
            href="/about"
            className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-semibold text-brand-dark shadow transition hover:bg-surface-muted"
          >
            Learn more about MLLWS <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
