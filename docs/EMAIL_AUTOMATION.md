# Automated Email Answering with Gemini

Research on automating replies to contact@motherlanguagelovers.com using Gemini, including what's actually free, and a recommended build.

## The short answer

Yes, this can run at effectively $0/month for MLLWS's inbox volume — but not for the reason most people expect. There are two separate "free Gemini" offers, and only one of them is relevant here:

1. **Google Workspace for Nonprofits' free Gemini** (the chat app at gemini.google.com, plus AI features baked into Docs/Sheets/Meet) — this is a nonprofit-specific benefit, free for verified 501(c)(3)-equivalents for up to 2,000 users. But it does **not** include Gemini inside Gmail (inline "Help me write," auto-drafting) — that specific integration requires upgrading to a paid Workspace edition (discounted ~75% for nonprofits, from about $3.50/user/month). And even that paid feature is *assistive*, not automated — a human still has to open the email and click a button. It can't run unattended.
2. **The Gemini Developer API's free tier** — this is a general public offer, not nonprofit-specific, available to any Google account. It's the one that actually matters for building an unattended auto-responder, and its limits (roughly 15 requests/minute and up to 1,500 requests/day on the Flash models, no credit card required) are far beyond what a nonprofit contact inbox generates in a day. That means the automation itself can be built and run for free indefinitely, independent of whether MLLWS ever applies for Google Workspace for Nonprofits at all.

So: skip trying to get the email automation "through" the nonprofit program — apply for Google for Nonprofits for the free Workspace/Gmail hosting and the consumer Gemini app (worth having regardless), but build the actual auto-reply system against the separate Gemini API free tier.

## Recommended architecture

**Google Apps Script + Gmail API + Gemini API, in draft-first mode.**

Why this combination: Apps Script runs directly inside the Gmail account for free (no server to host), has native Gmail API access already authorized, and can call the Gemini API with a simple `UrlFetchApp` request. No third-party platform, no hosting bill, no credentials beyond a Gemini API key.

Why draft-first, not auto-send: a public nonprofit inbox gets donation questions, media requests, and sometimes sensitive inquiries (a death in the community, a legal question about the Bill S-214 history, a complaint). An LLM will occasionally get tone or facts wrong. The safer default is: **Gemini drafts a reply, saves it as a Gmail draft, and a human reviews and hits send.** This still eliminates most of the writing effort while keeping a person in the loop for anything that matters. Full auto-send can be turned on later, scoped to a narrow set of predictable questions (see "graduating to auto-send" below).

### How it works, step by step

1. A time-based Apps Script trigger runs every 5–10 minutes.
2. The script pulls unread threads in the inbox (or a specific label, e.g. `needs-reply`).
3. For each thread, it sends the email text to the Gemini API along with a system prompt grounded in MLLWS's actual content — mission statement, FAQ, event dates, donation link, contact details (pulled from `lib/data.js` / `docs/FEATURES.md` in the website repo, kept in sync) — so answers are accurate rather than invented.
4. Gemini returns a drafted reply *and* a category (e.g. `donation`, `volunteer`, `press`, `general`, `sensitive`).
5. The script creates a Gmail draft reply in the thread and applies a label matching the category, so whoever checks the inbox can triage at a glance.
6. Nothing sends automatically. A human opens Gmail, reviews the draft, edits if needed, hits send.

### Graduating to auto-send (optional, later)

Once the draft quality has been trusted for a while, a narrow set of categories — e.g. "what's the address of the festival," "when is IMLD" — can be flipped to auto-send, while anything Gemini itself flags as `sensitive` or low-confidence always stays in draft mode for a human. This is a configuration change in the same script, not a rebuild.

## Guardrails worth building in from day one

- **Grounding, not open-ended generation.** Feed Gemini your actual FAQ/mission/event content as context and instruct it to answer only from that, and to say "I'm not sure, a team member will follow up" rather than guessing when it doesn't know. This is the single biggest lever against wrong answers going out.
- **Never auto-send on the first email in a thread from an unknown sender** touching money, legal matters, or anything mentioning `donate`, `refund`, `legal`, `press`, `media`, `died`/`passed away` — route straight to draft + a "needs human attention" label regardless of confidence.
- **Log everything.** Keep a simple sheet (Google Sheets, written to by the same script) of what came in, what was drafted, what category was assigned — useful both for catching mistakes early and for noticing what people actually ask about (useful input for the FAQ/resources pages in `FUTURE_ENHANCEMENTS.md`).
- **Rate-limit safety.** At contact-inbox volume this won't get close to the free tier's daily cap, but add a simple daily counter in the script so it fails safe (skips, doesn't crash) rather than erroring out if something spams the inbox.

## The WhatsApp piece

You mentioned WhatsApp may also get used for posting short updates and approvals — that maps naturally onto the same draft-first pattern above:

- **As an approval channel**: instead of (or in addition to) reviewing drafts in Gmail, the script can push a drafted reply or a proposed social post to a WhatsApp number via the **WhatsApp Business Cloud API**, and a board member replies "yes"/edits/"no" to approve. Meta's Cloud API has no flat monthly free allotment, but conversations the *user* (staff) initiates, and any reply within the resulting 24-hour window, are free — so an internal approval loop where staff message the bot first costs nothing in practice; it's mainly outbound, unprompted notifications that get billed per template message.
- **Setup overhead to know about**: WhatsApp Cloud API requires a Meta Business verification, a WhatsApp Business Account, and pre-approved message templates for anything sent outside that 24-hour window — a real setup cost, worth it if WhatsApp is genuinely the channel your board already lives in.
- **A simpler alternative for internal-only approvals**: if the audience for approvals is just a few staff/board members (not the public), a **Telegram bot** does the same job (send a draft, get a thumbs-up button, post/send on approval) with a five-minute setup and zero cost or verification process, no per-message billing ever. Worth considering as the internal approval bot even if WhatsApp remains the public-facing channel for posting.

## Cost summary

| Piece | Cost |
|---|---|
| Gemini Developer API (drafting replies) | $0 — free tier comfortably covers this volume |
| Google Apps Script (runs the automation) | $0 — included with any Google account |
| Google Workspace for Nonprofits (Gmail hosting, consumer Gemini app) | $0 — apply once verified as a nonprofit |
| Gemini *inside* Gmail UI (optional, assistive only) | ~$3.50/user/month if wanted — not needed for this automation |
| WhatsApp Cloud API (if used for approvals) | $0 for staff-initiated conversations; per-template billing for unprompted outbound messages |
| Telegram bot (alternative for internal approvals) | $0, no tier |

## Sources

- [Gemini Developer API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini API rate limits](https://ai.google.dev/gemini-api/docs/rate-limits)
- [Gemini API billing](https://ai.google.dev/gemini-api/docs/billing)
- [Workspace for Nonprofits: No-Cost AI Tools](https://workspace.google.com/learning/google-workspace-for-nonprofits-with-gemini)
- [Compare Google Workspace features for nonprofits](https://knowledge.workspace.google.com/admin/billing/compare-google-workspace-features-for-nonprofits)
- [Use Gemini for nonprofits — Google Workspace Learning Center](https://support.google.com/a/users/answer/14571258?hl=en)
- [Automate Google Workspace tasks with the Gemini API — Google Codelabs](https://codelabs.developers.google.com/codelabs/gemini-workspace)
- [An AI Assistant to Triage Your Inbox and Draft Replies with Apps Script and the Gemini API](https://pulse.appsscript.info/p/2025/07/an-ai-assistant-to-triage-your-inbox-and-draft-replies-with-apps-script-and-the-gemini-api/)
- [WhatsApp Business API Pricing 2026](https://respond.io/blog/whatsapp-business-api-pricing)
- [Google for Startups Cloud Program excludes nonprofits — Credit for Startups](https://creditforstartups.com/resources/google-cloud-startup-credits)
