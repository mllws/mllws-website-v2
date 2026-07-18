import Image from "next/image";
import PageBanner from "@/components/PageBanner";
import { gviewUrl } from "@/lib/data";

const IMG = "https://www.motherlanguagelovers.com";

export const metadata = {
  title: "About MLLWS",
  description:
    "Mother Language Lovers of the World Society's mission is fortify and strengthen the love for one's own mother language and respect for other languages, raise awareness among all people about the importance of mother language in social and cultural development, protect the minority languages, including Braille and Sign Language etc.",
};

const missionItems = [
  "To fortify and strengthen the love for one's own mother language and respect for other languages.",
  "To raise awareness among all people about the importance of mother language in social and cultural development.",
  "To raise awareness and to build national and/or community-level capacity for inclusive education as envisioned by the UNESCO declaration on International Mother Language.",
  "To protect the minority languages, including Braille and Sign Language.",
  "To build consciousness and mobilize people towards linguistic, cultural self-esteem and mutual-respect on the basis of equal rights to language and cultural heritage.",
  "To ensure that all languages are treated well and that socio-economic and political systems of a country are based equal respects to all languages and linguistic diversity and without any discrimination based on race, ethnic/national origin, religion, color, sex, age, and mental or physical disability.",
  "To work with all kinds of the people in the community, Government, Non-Government organizations, civil society, universities, institutions, social organizations all kinds of national and international award owners, Nobel laureates, Mother language users, religious leaders, politicians of all parties, stages and level, and people of divers world, BUT it does not have any political or religious vision of its own.",
];

export default function AboutPage() {
  return (
    <div>
      <PageBanner title="About" crumb="About Us" />

      <section className="prose-content mx-auto max-w-4xl px-4 py-14">
        <h2 className="text-2xl font-bold text-brand-dark">
          About Mother Language Lovers of the World Society
        </h2>
        <p>
          We are a non-profit organization which bring together various
          linguistic and cultural origins to celebrate their heritage and
          enrich multiculturalism and intercultural harmony. We also promote
          the International Mother Language Day (Feb 21) to build national as
          well as community-level capacity for inclusive education and
          multilingualism as envisioned by the UNESCO.
        </p>

        <h2 className="mt-10 text-2xl font-bold text-brand-dark">
          Our Mission
        </h2>
        <p className="font-medium">Mother Language Lovers of the World Society</p>
        <ol className="list-decimal space-y-3 pl-5">
          {missionItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>
            To run its work with the core recognition and appreciation of
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>(i) UNESCO&apos;s declaration of IMLD in 1999</li>
              <li>(ii) The language movement of 1952 in Bangladesh.</li>
            </ul>
          </li>
        </ol>

        <h2 className="mt-10 text-2xl font-bold text-brand-dark">
          Lingua Aqua — Mother Language Monument
        </h2>
        <p>
          In December 2006, Mohammad Aminul Islam, a Bangladeshi-Canadian of
          the City of Surrey appeared as a delegate to the Public Art
          Advisory Committee (PAAC) where he shared the information regarding
          the proposal to develop a Monument and that would be Canada&apos;s
          first Mother Language Monument in Surrey.
        </p>
        <p>
          Mr. Islam provided the PAAC with a research note stating that how a
          wide number of different languages that were spoken in Canada have
          become extinct. To highlight his research he listed those already
          extinct languages in Canada and British Columbia. He also advised
          that since 1952, February 21st has been observed as a date to
          commemorate the martyrs of the Language Movement, and also
          described how on November 17th, 1999 the United Nations
          Educational, Scientific and Cultural Organization (UNESCO) adopted
          a resolution proclaiming February 21st as &lsquo;International
          Mother Language Day&rsquo;. The proposal was well received by the
          Public Art Advisory Committee; they recommended him to take this
          concept forward to the City Council for further necessary actions
          regarding site selection criteria, his budget requirements and
          fundraising plans.
        </p>
        <p>
          Mr. Islam appeared before the City Council on February 26, 2007,
          where he presented the proposal for a Mother Language monument and
          asked Surrey Council for support in principle. The Council accepted
          the proposal and mentioned that a site on City land be identified
          to house this public art installation.
        </p>
        <p>
          The Parks, Recreation and Cultural Department short listed three
          potential spaces for the proposed project. Mayor Dianne Watt issued
          him a letter for fund collection to build the project; meanwhile
          the city staff met with him to discuss the site criteria. Mr.
          Islam preferred the Bear Creek Park for the monument. The initial
          fund raising goal was $200,000.00 for the project.
        </p>
        <p>
          At this stage, Mr. Islam became a member of the Arts Council of
          Surrey and made them a partner for the fund raising to build the
          monument. The Arts Council of Surrey opened a bank account in the
          name of Mother Language Monument.
        </p>

        <div className="not-prose my-6 overflow-hidden rounded-lg shadow-md">
          <Image
            src={`${IMG}/Content/Pictures/Lingua_Aqua.jpg`}
            alt="Lingua Aqua"
            width={900}
            height={600}
            className="h-auto w-full object-cover"
          />
        </div>

        <p>
          At that time, on behalf of &lsquo;The Mother Language Lovers of the
          World&rsquo; organization, its founder president Mr. Rafiqul Islam
          and the founding Director Mr. Abdus Salam donated a cheque of $200
          for the first time to this account. Part of this contribution
          amount was from the &lsquo;EKUSHE AWARD&rsquo;, prize money that
          the Government of Bangladesh had conferred on the organization for
          the work done to establish the International Mother Language Day.
          A part of the money was the individual donation of the above
          mentioned two individuals. However, the monument has been built by
          the city fund; this amount was never used. It remains in the
          account where it was sent.
        </p>

        <div className="not-prose my-6 aspect-video overflow-hidden rounded-lg shadow-md">
          <iframe
            title="Lingua Aqua"
            src="https://www.youtube.com/embed/3QHl8tRvVzI?autoplay=0&showinfo=0&rel=0"
            className="h-full w-full"
            allowFullScreen
          />
        </div>

        <p>
          In the year 2008, the City of Surrey was named winner of the 2008
          Cultural Capital of Canada Award. The award, which was presented to
          Mayor Dianne Watts, is accompanied by up to $2 million in funding.
          With this funding, Surrey planned to unveil a number of artistic
          and cultural projects for the next year. The Mother Language
          Monument project was included in that plan and from there the City
          granted a fund of $120,000 for this project to be accomplished.
        </p>
        <p>
          On 17 April 2008, the City of Surrey posted call for artists for
          Mother Language Monument Project (Culture as Catalyst: Bear Creek
          Park). A number of artworks were submitted in response to the
          Artists call. Finally &ldquo;Lingua Aqua&rdquo; was selected as one
          of six other site-specific public art legacy projects produced
          under Surrey&apos;s 2008 cultural capital of Canada initiative and
          supported by the Department of Canadian Heritage and the City of
          Surrey.
        </p>
        <p>
          The dream to build a Mother Language Monument became true. The
          Lingua Aqua, Canada&apos;s first Audiovisual Mother Language Public
          Art was officially unveiled on 19th July, 2009. The city of Surrey
          commissioned this artwork as a tribute to Mother Languages and in
          recognition of International Mother Language Day, formally
          established by the United Nations to be celebrated annually on
          February 21. Lingua Aqua is the work of a multi-talented team of
          new media, visual and audio artists, Melanie Cassidy, Michael
          Filimowicz, Brady Marks, and Philippe Pasquier are the team members
          whose design concept was accepted. Built in the form of a small
          pavilion or shelter, Lingua Aqua combines sculptural, architectural,
          graphic, audio and water elements to create an immersive sonic
          environment. this &ldquo;bath of sounds&rdquo; is the place in
          which language is first heard and sounds from the outside
          environment first experienced. The structure is a self-enclosed
          fountain, with rain curtains and a reflective pool. A mirror on the
          underside of the roof reflects the pool and visitors, creating a
          visual texture and interaction with the structure. The sound of
          flowing water evokes the fluid environment in which spoken language
          is first heard, and the rippling pool and rain curtains modulate
          the sounds emitted from the structure. Glass panels overhanging the
          roof are engraved with symbols drawn from a number of languages
          spoken in Surrey. Four support columns each house audio speakers
          that play a variety of sounds, each transmitted through holes in
          the columns. These perforated designs form braille texts related
          to the role of language across various cultures.
        </p>
        <p>
          Lingua Aqua is a Surrey landmark and a place where people of all
          languages come, reflect and immerse in the beauty of other
          languages.
        </p>
      </section>

      <section aria-labelledby="founding-president-heading" className="bg-surface-muted py-14">
        <div className="mx-auto max-w-4xl px-4">
          <h2 id="founding-president-heading" className="text-2xl font-bold text-brand-dark">
            Our Founding President
          </h2>
          <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
            <figure className="overflow-hidden rounded-lg shadow-md">
              <Image
                src={`${IMG}/Content/Directors/Founding_President.jpg`}
                alt="Portrait of the late Mr. Rafiqul Islam"
                width={220}
                height={260}
                className="h-auto w-full object-cover"
              />
              <figcaption className="bg-white p-3 text-center">
                <p className="font-semibold text-brand-dark">Late Mr. Rafiqul Islam</p>
                <p className="text-sm text-gray-600">Founding President, MLLWS</p>
              </figcaption>
            </figure>
            <div className="prose-content">
              <p>
                Rafiqul Islam was born on July 16, 1950 at Rajbari Compound in
                Comilla city, Bangladesh to Late Janab Abdul Ghani and Mrs.
                Karimun Nessa. His father was related to the law profession
                and mother was a home maker. He was the eigth child amongst
                the ten siblings. After studying in the local primary school
                and secondary level in Comilla Zilla School he got his
                admission in the Comilla Victoria College in 1967. He passed
                his Intermediate in Commerce (I.Com) in 1969 from the same
                college. During the 1970 college year he was elected as the
                literary secretary of the Students Union of Victoria College.
              </p>
              <p>
                When the Bangladesh liberation war broke out in 1971 he went
                to Dehra Dun in India for training and there after joined the
                Mujib Bahini as a Freedom fighter. He lost his younger
                brother Saiful Islam Shafu in the war who was in the same
                company as he was and which was commanded by Sheikh Fazlul
                Haque Moni.
              </p>
              <p>
                After the war, he finished his graduation from Victoria
                College and completed his Masters(M.Com) in Marketing from
                Dhaka University. After completing his Master she went to
                Germany for livelihood and stayed there for about 5 years. He
                then went to Malaysia and tried his hand in business. Mean
                while he got married to Dilras Buli Islam on January 27,
                1980. Rafiqul joined an NGO named &lsquo;Proshika&rsquo; in
                Bangladesh and worked there as a development officer for
                eight years. After that he migrated to Vancouver, Canada in
                late 1995 with his wife and two sons Jyoti and Joyonto.
              </p>
              <p>
                From his then residence at 113-9071 Richmond; Greater
                Vancouver he wrote a letter to Mr. Kofi Anan, the then
                Secretary General of the UN on Jan 09, 1998. In that letter
                he argued and appealed that many languages of this world have
                become extinct, many are on the verge of extinction and hence
                it is imperative that a day be declared as &lsquo;
                International Mother Language Day&rsquo; to celebrate and
                protect ALL the mother languages of the world. He
                additionally proposed that Feb 21st would be the appropriate
                day for this as the Bangali people had in 1952 on this day
                successfully defended their mother language Bangla which was
                under threat by paying the ultimate sacrifice.
              </p>
              <p>
                Based on the reply from UN he discussed his concept with
                another friend of his Abdus Salam. With his friend Abdus
                Salam, Rafiqul set up an organization called &lsquo;The
                Mother Language Lovers of the World&rsquo; and they both
                started to work jointly to realise the dream of Rafiqul
                Islam. There were a total of ten language speaking people
                havings even different languages who were later on brought in
                as members besides the mother language Bangla belonging to
                Rafiqul Islam and Abdus Salam.
              </p>
              <p>
                All these members were the signatories on the petition to UN
                and UNESCO in 1999 to declare Feb 21st as International
                Mother Language Day. Rafiqul Islam constantly kept in touch
                with the Bangladeshi UNESCO officials and the Education
                ministry over telephone during that time. He also contacted
                the UNESCO Paris office for updates and information. Due to
                the timely and decisive action of the then Prime Minister of
                Bangladesh, Sheikh Hasina, diplomatic endeavour of
                Bangladesh&apos;s Paris embassy and the tireless effort of
                the Bangladeshi delegation to Paris and above all the support
                of 28 other countries to adopt Bangladesh&apos;s proposal and
                co propose it as their own propelled the declaration of the
                historical declaration of Nov 17, 1999. This was the day
                International Mother Language Day was declared by UNESCO at
                the 152 plenary session of the 30th General Conference in
                Paris.
              </p>
              <p>
                Rafiqul Islam worked in Vancouver in the health sector. He
                passed away due to Blood cancer on Nov 20, 2013 at Vancouver
                General Hospital and is buried in Chilliwack with full state
                honour from Bangladesh deserving of all freedom fighters.
              </p>
              <p>
                He was the Founder President of &lsquo;The Mother Language
                Lovers of the World&rsquo; Vancouver and up until his death
                held this position. He was an ex-president of the
                Bongobondhu Porishod of BC and after ward he also acted as an
                advisor of the Bongobondhu Porishod BC. He was awarded the
                highest civilian award &lsquo;Swadhinota Podok&rsquo; in 2016
                posthumously by the Government of Bangladesh for his
                pioneering contribution in the declaration of IMLD. His wife
                Buli Islam received it on his behalf in March 24, 2016 from
                the Prime Minister of Bangladesh at Dhaka. Before this he
                received honorary recognition from the Government of
                Bangladesh, signed by the then Prime Minister in 2000. The
                prestigious &lsquo;Ekushe Podok&rsquo; was also conferred to
                the organization &lsquo;Mother Language Lovers of the
                World&rsquo; in 2001 by the Government of Bangladesh. He left
                behind his wife and two sons who live in Surrey, British
                Columbia, Canada.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="president-heading" className="py-14">
        <div className="mx-auto max-w-4xl px-4">
          <h2 id="president-heading" className="text-2xl font-bold text-brand-dark">
            Mohammad Aminul Islam (Moula)
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            A tireless cultural activist of international mother language day
            (IMLD) movement in BC
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
            <figure className="overflow-hidden rounded-lg shadow-md">
              <Image
                src={`${IMG}/Content/Directors/President.jpg`}
                alt="Portrait of Mohammad Aminul Islam"
                width={220}
                height={260}
                className="h-auto w-full object-cover"
              />
              <figcaption className="bg-white p-3 text-center">
                <p className="font-semibold text-brand-dark">Mohammad Aminul Islam</p>
                <p className="text-sm text-gray-600">President, MLLWS</p>
              </figcaption>
            </figure>
            <div className="prose-content">
              <p>
                Mr. Mohammad Aminul Islam is the current President of the
                Mother Language Lovers of the World Society (MLLWS) and for
                the past 10 years, he has worked tirelessly to promote and
                preserve linguistic diversity and cultural heritage within
                Surrey and throughout BC through the celebration of the
                International Mother Language Day, recognized annually on
                February 21st worldwide. In Surrey, every year approximately
                70,000 students, representing 172 various mother language
                speakers have the opportunity to know about and celebrate
                their languages, identify their cultural heritage and share
                this with others. Mr. Islam&apos;s work promotes diversity
                and respect for other cultures through cross-cultural
                sharing.
              </p>
              <p>
                As a cultural activist Mr. Islam marked many of his
                achievements. Among those, following few highlights his
                charismatic leadership and dedicated hard work.
              </p>
              <p>
                Build Canada&apos;s first audiovisual Mother Language
                Monument the &ldquo;Lingua Aqua&rdquo; - in Surrey, BC.
              </p>
              <p>
                Obtained the highest level of British Columbia Provincial
                Proclamation for the first time in Canada on &ldquo;
                International Mother Language Day&rdquo; (IMLD).
              </p>
              <p>
                Initiated the annual observation of &ldquo;Mother Language
                Festival&rdquo; in Surrey, etc.
              </p>
              <p>
                He intensively worked and took the challenges on
                implementation of IMLD by creating a model for young
                generations. It took him almost ten years to create the
                revolutionary &ldquo;BC MODEL&rdquo; for implementation of
                IMLD.
              </p>
              <p>
                To date, this is perhaps the only tested framework for IMLD
                implementation which is recommended by the Assistant
                Director General (ADG/Education) of UNESCO and noted &ldquo;
                to continue efforts locally and globally on IMLD
                implementation using the BC Model&rdquo;. This Model was
                first accepted in the School District of Surrey and included
                IMLD in the School Yearly calendar. Beyond Surrey, now this
                Model is being replicated in other School Districts in
                British Columbia.
              </p>
              <p>
                Mr. Islam has initiated the annual observation of &ldquo;
                Mother Language Festival&rdquo; in Surrey with the support of
                City.
              </p>
              <p>
                Initiated the &ldquo;Bangla Heritage Week&rdquo; - the
                celebration of the first week of Bangla New Year in lower
                mainland Vancouver.
              </p>
              <p>
                For the outstanding achievements of Mr. Islam, he has
                received the &ldquo;2016 Civic Treasure Award&rdquo; from the
                City of Surrey. He is also the recipient of 2017 Mayor&apos;s
                Art Award as &ldquo;Cultural Ambassador&rdquo; from the City
                of Surrey. Currently the City has placed his photograph on
                the Mural Wall of Surrey Museum, unveiled in 2018.
              </p>
              <p>
                In 1999, Mother Language Lovers of the World Society
                (MLLWS), BC proposed to UNESCO to proclaim 21st February as
                the International Mother Language Day (IMLD). Since 2000,
                IMLD is being celebrated globally. Recently on behalf of this
                organization a Bill S-247 has been tabled to the Canadian
                Federal Parliament as an Act to establish IMLD. Meanwhile,
                the 2nd reading has been passed in the Senate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="documents-heading" className="bg-surface-muted py-14">
        <div className="mx-auto max-w-4xl px-4">
          <h2 id="documents-heading" className="sr-only">
            Supporting documents
          </h2>
          <div className="space-y-10">
            {[
              {
                title: "MLLWS - Proclamation",
                pdf: `${IMG}/Content/Docs/MLLWS_Proclamation.pdf`,
              },
              {
                title:
                  "Diversity and Inclusivity Advisory Committee - Surrey City Deligation",
                pdf: `${IMG}/Content/Docs/Surrey_City_Delegation_Mother_Language_Festival.pdf`,
              },
              {
                title: "Corporate Report - Mother Language Monument",
                pdf: `${IMG}/Content/Docs/Surrey_City_Delegation_Mother_Language_Monument.pdf`,
              },
              {
                title: "Memorandum - Vancouver School Board",
                pdf: `${IMG}/Content/Docs/VSB_Recommendation.pdf`,
              },
            ].map((doc) => (
              <article
                key={doc.title}
                className="overflow-hidden rounded-xl border border-border-muted bg-white shadow-sm"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border-muted px-5 py-4">
                  <h3 className="text-lg font-bold text-brand-dark">{doc.title}</h3>
                  <a
                    href={doc.pdf}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-md border border-brand px-3 py-1.5 text-sm font-medium text-brand transition hover:bg-brand hover:text-white"
                  >
                    Open PDF in new tab
                  </a>
                </div>
                <iframe title={doc.title} src={gviewUrl(doc.pdf)} className="h-[500px] w-full" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
