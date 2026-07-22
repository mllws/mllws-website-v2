const IMG = "https://www.motherlanguagelovers.com";

export const nav = [
  { label: "Home", href: "/", translated: "Accueil" },
  { label: "Events", href: "/events", translated: "ਸਮਾਗਮ" },
  { label: "Stories", href: "/stories", translated: "物語" },
  { label: "Our Story", href: "/about", translated: "قصتنا" },
];

export const secondaryNav = [
  { label: "Our Team", href: "/team" },
  { label: "Constitution & By-Laws", href: "/constitution" },
  { label: "Recommendation", href: "/recommendation" },
  { label: "Contact", href: "/contact" },
];

export const sponsors = [
  { name: "City of Surrey", src: `${IMG}/Content/Sponsors/surrey_mod.png` },
  { name: "Surrey Libraries", src: `${IMG}/Content/Sponsors/surreyLib.jpg` },
  { name: "Surrey Schools", src: `${IMG}/Content/Sponsors/surrey_school.png` },
  { name: "Vancouver School Board", src: `${IMG}/Content/Sponsors/vancouver_school.png` },
  { name: "Richmond School District 38", src: `${IMG}/Content/Sponsors/richmond_school.png` },
  { name: "Langley Schools", src: `${IMG}/Content/Sponsors/langley-schools.png` },
  { name: "Ottawa Catholic School Board", src: `${IMG}/Content/Sponsors/ottawa_catholic_school.png` },
];

export const heroSlides = [
  {
    image: `${IMG}/Content/Pictures/Vancouver.jpg`,
    alt: "Vancouver skyline — home of International Mother Language Day advocacy",
  },
  {
    image: `${IMG}/Content/Pictures/MotherLanguageDay.png`,
    alt: "International Mother Language Day celebration",
  },
  {
    image: `${IMG}/Content/Pictures/mllws2.jpg`,
    alt: "Mother Language Lovers of the World Society community gathering",
  },
  {
    image: `${IMG}/Content/Pictures/mllws4.png`,
    alt: "MLLWS festival moment",
  },
  {
    image: `${IMG}/Content/Pictures/mllws3.png`,
    alt: "MLLWS community celebration",
  },
];

export const greetingRibbon =
  "Hello · Bonjour · নমস্কার · Hola · 你好 · مرحبا · ਸਤ ਸ੍ਰੀ ਅਕਾਲ · Olá · こんにちは · Merhaba ·";

export const programs = [
  {
    title: "Mother Language Festival",
    description:
      "Our annual outdoor festival celebrating languages, cultures, and unity — including Indigenous languages, Braille, sign languages, and minority linguistic traditions.",
    iconBg: "bg-[#F7E4D3]",
    iconColor: "#B3452F",
  },
  {
    title: "International Mother Language Day",
    description:
      "Honoring February 21 each year — the day UNESCO proclaimed, and Canada now officially observes through Bill S-214.",
    iconBg: "bg-[#EAF3EC]",
    iconColor: "#2E8B67",
  },
  {
    title: "Community Advocacy",
    description:
      "Working with schools, libraries, municipalities, and partners across Canada to protect linguistic diversity and build inclusive education.",
    iconBg: "bg-[#F5EDFB]",
    iconColor: "#6E4A9E",
  },
];

export const communityQuotes = [
  {
    quote:
      "Language is more than words — it carries our history, identity and hopes for the future. MLLWS gives every mother tongue a stage.",
    name: "Community member",
    role: "Surrey festival guest",
    bg: "bg-[#FFF9F2]",
  },
  {
    quote:
      "Volunteering at the Mother Language Festival connected me with neighbours I never would have met otherwise.",
    name: "Festival volunteer",
    role: "Volunteer",
    bg: "bg-[#EFF6F1]",
  },
  {
    quote:
      "Seeing Indigenous languages and minority tongues celebrated side by side is what this day is all about.",
    name: "School partner",
    role: "Educator",
    bg: "bg-[#FBF0EE]",
  },
];

export const galleryImages = [
  { src: `${IMG}/Content/Pictures/mllws2.jpg`, alt: "Community gathering at an MLLWS event", span: true },
  { src: `${IMG}/Content/Pictures/MotherLanguageDay.png`, alt: "International Mother Language Day" },
  { src: `${IMG}/Content/Pictures/mllws3.png`, alt: "Festival performance" },
  { src: `${IMG}/Content/Pictures/mllws4.png`, alt: "Festival attendees" },
  { src: `${IMG}/Content/Pictures/Vancouver.jpg`, alt: "Vancouver — home of IMLD advocacy" },
];

export const voiceMessages = [
  { language: "French", greeting: "Bonjour", name: "Community voice", role: "Member", duration: 6 },
  { language: "Punjabi", greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", name: "Community voice", role: "Parent", duration: 5 },
  { language: "Bangla", greeting: "নমস্কার", name: "Community voice", role: "Member", duration: 5 },
  { language: "Arabic", greeting: "مرحبا", name: "Community voice", role: "Youth", duration: 5 },
  { language: "Mandarin", greeting: "你好", name: "Community voice", role: "Partner", duration: 6 },
  { language: "Japanese", greeting: "こんにちは", name: "Community voice", role: "Volunteer", duration: 7 },
];

export const clickGreetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "Merhaba",
  "Salaam",
  "こんにちは",
  "你好",
  "안녕하세요",
  "नमस्ते",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "নমস্কার",
  "Olá",
  "Hallo",
  "Xin chào",
  "Shalom",
  "Kamusta",
  "Selam",
  "Jambo",
  "Aloha",
];

export const upcomingEvent = {
  badge: "Flagship Event",
  title: "12th Mother Language Festival, 2026",
  description:
    "A vibrant celebration of languages, cultures, and unity — honoring 25 years of International Mother Language Day and the richness of mother languages from around the world.",
  date: "Sunday, August 9, 2026 · 4:00 PM – 7:00 PM",
  location: "Holland Park, 13428 Old Yale Rd, Surrey, BC",
  image: `${IMG}/Content/Pictures/UpcomingEvents/MLF_2026.jpg`,
  imageAlt: "12th Mother Language Festival, 2026",
  ctaHref: "/events",
  ctaLabel: "Event details",
  mapHref: "https://maps.app.goo.gl/2JistjGnz2iezhV37",
  cityHref: "https://www.surrey.ca/news-events/events/mother-language-festival-2026",
  facebookHref: "https://www.facebook.com/events/4941717739388307",
  sponsors: ["City of Surrey", "Desjardins - Financial Security", "Mabuhay House", "Coldfish Seafood Co. Inc."],
};

export const events = [
  {
    category: "festivals",
    tag: "FESTIVAL",
    tagColor: "#1F6B4C",
    title: "12th Mother Language Festival, 2026",
    dateLocation: "Aug 9, 2026 · Holland Park, Surrey",
    image: `${IMG}/Content/Pictures/UpcomingEvents/MLF_2026.jpg`,
    imageAlt: "Mother Language Festival 2026",
    featured: true,
  },
  {
    category: "memorial",
    tag: "MEMORIAL",
    tagColor: "#8B3626",
    title: "7th Death Anniversary of Mr. Rafiqul Islam",
    dateLocation: "Nov 21, 2020 · Online tribute",
    image: `${IMG}/Content/Pictures/UpcomingEvents/21Nov2020.jpg`,
    imageAlt: "Tribute to Mr. Rafiqul Islam",
  },
  {
    category: "advocacy",
    tag: "MILESTONE",
    tagColor: "#6E4A9E",
    title: "Bill S-214 — IMLD in Canada",
    dateLocation: "Royal Assent · Apr 27, 2023",
    image: `${IMG}/Content/Pictures/MotherLanguageDay.png`,
    imageAlt: "International Mother Language Day",
  },
  {
    category: "festivals",
    tag: "FESTIVAL",
    tagColor: "#1F6B4C",
    title: "Mother Language Festival highlights",
    dateLocation: "Annual · Surrey, BC",
    image: `${IMG}/Content/Pictures/mllws2.jpg`,
    imageAlt: "Festival highlights",
  },
  {
    category: "community",
    tag: "COMMUNITY",
    tagColor: "#8B3626",
    title: "School & library partnerships",
    dateLocation: "Year-round · Metro Vancouver",
    image: `${IMG}/Content/Pictures/mllws3.png`,
    imageAlt: "Community partnerships",
  },
  {
    category: "advocacy",
    tag: "ADVOCACY",
    tagColor: "#3B6EA5",
    title: "UNESCO IMLD observance",
    dateLocation: "Feb 21 · Every year",
    image: `${IMG}/Content/Pictures/mllws4.png`,
    imageAlt: "IMLD observance",
  },
];

export const eventFilters = [
  { key: "all", label: "All events" },
  { key: "festivals", label: "Festivals" },
  { key: "advocacy", label: "Advocacy" },
  { key: "memorial", label: "Memorial" },
  { key: "community", label: "Community" },
];

export const stories = [
  {
    category: "milestones",
    tag: "MILESTONE",
    tagColor: "#6E4A9E",
    title: "Bill S-214 receives royal assent",
    excerpt: "Canada now officially honors February 21 as International Mother Language Day.",
    image: `${IMG}/Content/Pictures/MotherLanguageDay.png`,
    imageAlt: "IMLD milestone",
    featured: true,
  },
  {
    category: "origins",
    tag: "ORIGINS",
    tagColor: "#8B3626",
    title: "How Rafiqul Islam proposed IMLD to the UN",
    excerpt: "A letter to Kofi Annan in 1998 that helped change the world.",
    image: `${IMG}/Content/Pictures/Vancouver.jpg`,
    imageAlt: "Origins of IMLD",
  },
  {
    category: "recaps",
    tag: "RECAP",
    tagColor: "#1F6B4C",
    title: "Inside the Mother Language Festival",
    excerpt: "Music, dance, food, and dozens of languages sharing one park.",
    image: `${IMG}/Content/Pictures/mllws2.jpg`,
    imageAlt: "Festival recap",
  },
  {
    category: "spotlights",
    tag: "SPOTLIGHT",
    tagColor: "#6E4A9E",
    title: "Partners who keep languages visible",
    excerpt: "Schools and libraries across BC standing with MLLWS.",
    image: `${IMG}/Content/Pictures/mllws3.png`,
    imageAlt: "Partner spotlight",
  },
  {
    category: "origins",
    tag: "HISTORY",
    tagColor: "#8B3626",
    title: "Lingua Aqua — Mother Language Monument",
    excerpt: "Canada's first mother language monument, rooted in Surrey.",
    image: `${IMG}/Content/Pictures/mllws4.png`,
    imageAlt: "Lingua Aqua monument",
  },
  {
    category: "recaps",
    tag: "TRIBUTE",
    tagColor: "#1F6B4C",
    title: "Remembering Mr. Rafiqul Islam",
    excerpt: "Honoring the founding president and Father of IMLD.",
    image: `${IMG}/Content/Pictures/UpcomingEvents/21Nov2020.jpg`,
    imageAlt: "Rafiqul Islam tribute",
  },
];

export const storyFilters = [
  { key: "all", label: "All" },
  { key: "milestones", label: "Milestones" },
  { key: "origins", label: "Origins" },
  { key: "recaps", label: "Recaps" },
  { key: "spotlights", label: "Spotlights" },
];

export const aboutMilestones = [
  {
    year: "1998",
    color: "text-brand",
    text: "Mr. Rafiqul Islam writes to UN Secretary-General Kofi Annan proposing International Mother Language Day.",
  },
  {
    year: "1999",
    color: "text-accent",
    text: "UNESCO proclaims February 21 as International Mother Language Day, with support from Bangladesh and 29 countries including Canada.",
  },
  {
    year: "2012",
    color: "text-green",
    text: "MLLWS is officially registered as a non-profit organization in the City of Surrey, BC.",
  },
  {
    year: "2023",
    color: "text-purple",
    text: "Bill S-214 receives royal assent — Canada officially observes International Mother Language Day every February 21.",
  },
];

export const aboutValues = [
  {
    title: "Every language matters",
    description: "Widely spoken or nearly gone — every mother tongue deserves the same stage, including Indigenous languages, Braille, and sign languages.",
  },
  {
    title: "Community over ceremony",
    description: "We are powered by volunteers, partners, and neighbours who show up to celebrate linguistic diversity together.",
  },
  {
    title: "Advocacy that lasts",
    description: "From UNESCO recognition to Canada's Bill S-214, we work for lasting public recognition of mother languages.",
  },
];

export const membershipTiers = [
  {
    name: "Individual",
    price: "$25",
    period: "/year",
    featured: false,
    perks: ["Early access to festival updates", "Community newsletter", "Support linguistic diversity"],
    cta: "Join as individual",
  },
  {
    name: "Family",
    price: "$45",
    period: "/year",
    featured: true,
    perks: ["Everything in Individual", "Family event invitations", "Up to 4 household members"],
    cta: "Join as family",
  },
  {
    name: "Community Partner",
    price: "$150",
    period: "/year",
    featured: false,
    perks: ["Everything in Family", "Recognition as a partner", "Festival collaboration opportunities"],
    cta: "Become a partner",
  },
];

export const directors = [
  {
    name: "Mohammad A Islam, M.G.C",
    title: "President",
    photo: `${IMG}/Content/Directors/President.jpg`,
    email: "maislam@motherlanguagelovers.com",
  },
  {
    name: "Hafizul Islam",
    title: "Senior Vice President",
    photo: `${IMG}/Content/Directors/svp.jpg`,
    email: "mhislam@motherlanguagelovers.com",
  },
  {
    name: "Sarker M Arefin",
    title: "Vice President",
    photo: `${IMG}/Content/Directors/vp.jpg`,
    email: "smarefin@motherlanguagelovers.com",
  },
  {
    name: "To Be Announced Soon",
    title: "Secretary General",
    photo: `${IMG}/Content/Directors/Avatar_1.jpg`,
    email: "contact@motherlanguagelovers.com",
  },
  {
    name: "Mohammad Emon",
    title: "Director Global Language Heritage & Monuments",
    photo: `${IMG}/Content/Directors/Heritage_Monuments.jpg`,
    email: "contact@motherlanguagelovers.com",
  },
  {
    name: "Dr. Anowar Sadat",
    title: "Director Research & Development",
    photo: `${IMG}/Content/Directors/Research.jpg`,
    email: "ssadat@motherlanguagelovers.com",
  },
  {
    name: "Saamiya S Rin",
    title: "Director Multicultural Event Celebration",
    photo: `${IMG}/Content/Directors/Event_Celebration.jpg`,
    email: "contact@motherlanguagelovers.com",
  },
  {
    name: "Shah Bahauddin",
    title: "Director Implementation of IMLD - Ottawa",
    photo: `${IMG}/Content/Directors/Implementation_Ottawa.jpg`,
    email: "sbahauddin@motherlanguagelovers.com",
  },
  {
    name: "Saiful Bhuiyan",
    title: "Director Implementation of IMLD - Windsor",
    photo: `${IMG}/Content/Directors/Implementation_Windsor.jpg`,
    email: "sbhuiyan@motherlanguagelovers.com",
  },
  {
    name: "Khair Khandaker",
    title: "Director Implementation of IMLD - Calgary",
    photo: `${IMG}/Content/Directors/Implementation_Calgary.jpg`,
    email: "kkhandaker@motherlanguagelovers.com",
  },
  {
    name: "Mohammad M Islam",
    title: "Director ICT",
    photo: `${IMG}/Content/Directors/ICT.jpg`,
    email: "admin@motherlanguagelovers.com",
  },
  {
    name: "Fahad H Chowdhury",
    title: "Director Finance",
    photo: `${IMG}/Content/Directors/Finance.jpg`,
    email: "finance@motherlanguagelovers.com",
  },
];

export const chapters = [
  {
    name: "Marshall Hussain",
    title: "President, US Chapter",
    photo: `${IMG}/Content/Directors/US_Chapter_President.jpg`,
    email: "marshallh@motherlanguagelovers.com",
  },
  {
    name: "Shehzaad Shams",
    title: "President, UK Chapter",
    photo: `${IMG}/Content/Directors/UK_Chapter_President.jpg`,
    email: "sshams@motherlanguagelovers.com",
  },
];

export const advisors = [
  {
    name: "Mizan Majumder",
    title: "Advisor",
    photo: `${IMG}/Content/Directors/Avatar_1.jpg`,
    email: "mizanmajum@shaw.ca",
  },
  {
    name: "Dr. Syed S Rahman",
    title: "Advisor",
    photo: `${IMG}/Content/Directors/Advisor_3.jpg`,
    email: "ssajjadrahman@gmail.com",
  },
  {
    name: "Hasan Ferdous",
    title: "Advisor",
    photo: `${IMG}/Content/Directors/Advisor_2.jpg`,
    email: "hasanferdous1971@gmail.com",
  },
];

export const recommendationLetters = [
  {
    title: "Letter of Recognition - Surrey School District",
    pdf: `${IMG}/Content/Docs/Surrey_School_District_IMLD_Recognition.pdf`,
  },
  {
    title: "Letter of Support - Surrey Public Libraries",
    pdf: `${IMG}/Content/Docs/Support_letter_Surrey_Public_Libraries.pdf`,
  },
  {
    title: "Letter of Support - Heritage Canada",
    pdf: `${IMG}/Content/Docs/Heritage_Canada_MLF_celebration.pdf`,
  },
  {
    title: "Letter of Recognition - Langley Board of Education",
    pdf: `${IMG}/Content/Docs/Langley_Board_of_Education_IMLD_Recognition.pdf`,
  },
  {
    title: "Letter of Recognition - Richmond School District",
    pdf: `${IMG}/Content/Docs/Richmond_School_District_IMLD_Recognition.pdf`,
  },
  {
    title: "Letter of Recognition - Vancouver Board of Education",
    pdf: `${IMG}/Content/Docs/Vancouver_Board_of_Education_IMLD_Recognition.pdf`,
  },
];

export const siteLogo = "/logo-icon-red.png";
export const siteLogoFull = `${IMG}/Content/Pack/images/logo2.png`;

export function gviewUrl(pdfUrl) {
  return `https://docs.google.com/gview?url=${pdfUrl}&embedded=true`;
}

export const contactInfo = {
  address: ["#10-7875 122 Street", "Surrey, British Columbia", "V3W 0Y8", "Canada"],
  email: "contact@motherlanguagelovers.com",
  phone: "+1-778-987-4084",
  phoneHref: "tel:+17789874084",
  locationLabel: "Surrey / Vancouver, BC",
  social: [
    { label: "Facebook", handle: "@motherlanguagelovers", href: "https://www.facebook.com/motherlanguagelovers" },
    { label: "Twitter", handle: "@motherlanglover", href: "https://twitter.com/motherlanglover" },
    { label: "Instagram", handle: "@motherlanguagelovers", href: "https://www.instagram.com/motherlanguagelovers" },
    { label: "LinkedIn", handle: "@mllws", href: "https://www.linkedin.com/company/mllws" },
    { label: "YouTube", handle: "@motherlanguagelovers", href: "https://www.youtube.com/@motherlanguagelovers" },
  ],
};
