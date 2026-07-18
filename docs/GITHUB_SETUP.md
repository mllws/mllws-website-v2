# GitHub Organization Setup — MLLWS

A step-by-step guide to standing up a GitHub organization for MLLWS the right way, including the free nonprofit program and the security/workflow practices worth having from day one.

## 1. Before you create it

Decide these up front — they're annoying to change later:

- **Org name/slug**: something like `mllws` or `motherlanguagelovers` (matches the domain, easy to recognize). Check availability at `github.com/<name>`.
- **Who is the Owner**: GitHub for Nonprofits requires the person claiming the discount to be an organization Owner. Pick someone with continuity (e.g. the Director ICT role from the board, not a short-term volunteer).
- **Contact/billing email**: use an org email (`admin@motherlanguagelovers.com`), not a personal Gmail — avoids losing access if a volunteer moves on.
- **Public vs. private repos**: the org itself can be created regardless; you'll choose visibility per-repository (see §5).

## 2. Create the organization

1. Go to [github.com/account/organizations/new](https://github.com/account/organizations/new).
2. Choose the **Free** plan to start (you'll upgrade via the nonprofit program next — no need to pay first).
3. Enter the org name, contact email, and "My personal account" as the type of org (nonprofit isn't a plan tier at creation time — it's applied afterward as a discount).
4. Skip inviting members yet — do that after teams are set up (§6).

## 3. Apply for GitHub for Nonprofits (free Team plan)

Verified 501(c)(3)-equivalent nonprofits get a **free GitHub Team plan** (unlimited private repos, unlimited collaborators, plus Team-tier features like required reviewers and draft PRs) at no cost.

- Eligibility: registered nonprofit, non-governmental, non-academic, non-commercial, non-political. MLLWS (registered nonprofit, City of Surrey) fits this.
- You'll need proof of nonprofit status — Canadian nonprofits typically use their incorporation/registration documentation (a CRA registration number if registered as a charity, or provincial nonprofit society registration for BC).
- Apply here once the org exists: [Quickstart for GitHub for Nonprofits](https://docs.github.com/en/nonprofit/quickstart) → [Getting started with the GitHub Team plan for nonprofits](https://docs.github.com/en/nonprofit/nonprofit-teams-plan/getting-started-with-the-github-team-plan-for-nonprofits).
- Approval takes up to a week. You must be an org Owner to submit the application.

## 4. Organization security settings (do this immediately)

Under **Settings → Security** at the org level:

- **Require two-factor authentication for everyone** — the single highest-leverage setting for a volunteer-run org where people rotate in and out.
- **Enable Dependabot alerts + security updates** org-wide (Settings → Code security).
- **Enable secret scanning + push protection** org-wide — critical once Zeffy API keys or a chatbot API key exist anywhere in the repos.
- **Base permissions**: set to "Read" (not "Write") so new members don't get push access by default — grant access explicitly per team instead.
- **Third-party application access**: restrict to approved apps only (Vercel, and whatever CI/deploy tooling you use).

## 5. Repositories

Suggested repo layout rather than one giant monorepo:

| Repo | Visibility | Contents |
|---|---|---|
| `mllws-website` | Public (recommended) or private | The Next.js site itself |
| `.github` | Public | Org-wide defaults: issue/PR templates, `CODEOWNERS`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` — GitHub auto-applies these to any repo in the org that doesn't have its own copy |
| `mllws-brand` (optional) | Private | Logos, sponsor artwork, brand guidelines — keep separate from code so non-developers (board members) can access without touching the codebase |

**Public vs. private for the website repo**: a public repo is worth it for a nonprofit — it invites volunteer developer contributions (common for orgs like this), and it's free advertising of the mission. The trade-off is discipline: no secrets ever committed (see §8), and code review before merge (§7) matters more since anyone can open a PR.

Naming convention: lowercase, hyphenated, prefixed with nothing extra (`mllws-website`, not `MLLWS_Website_v2`). Add a one-line description and topics (`nextjs`, `nonprofit`, `tailwindcss`) to each repo for discoverability.

## 6. Teams

Map GitHub teams to the org's actual structure rather than inventing a new hierarchy:

- **`@mllws/admins`** — Org Owners. Small (2–3 people), maps to President + Director ICT.
- **`@mllws/maintainers`** — Write access to `mllws-website`, can approve/merge PRs. Maps to whoever is actively developing (Director ICT + any technical volunteers).
- **`@mllws/contributors`** — Triage/read access, can be assigned issues and open PRs without direct push access. Good default for volunteer developers, students, or community contributors.

Add people to teams, not directly to repos — makes offboarding a single removal instead of hunting across every repo.

## 7. Repo-level best practices (apply via the `.github` repo where possible)

- **Branch protection on `main`**: require a pull request before merging, require at least 1 approving review, require status checks (CI — see `TESTING.md`) to pass, and check "Do not allow bypassing the above settings" so even Owners go through review. Configure under each repo's Settings → Branches.
- **`CODEOWNERS` file**: auto-assigns reviewers by path (e.g. `/app/donate/ @mllws/maintainers` for anything touching the donation flow) so sensitive areas always get the right eyes.
- **Issue templates**: a bug report template and a feature request template (matches the roadmap categories in `FEATURES.md` / `FUTURE_ENHANCEMENTS.md`).
- **PR template**: a short checklist — screenshot for UI changes, "tested locally," "accessibility checked" (ties directly into `TESTING.md`).
- **`CONTRIBUTING.md`**: how to run the site locally (`npm install && npm run dev`), coding conventions (Tailwind utility-first, no inline styles), and how PRs get reviewed — lowers the barrier for volunteer developers.
- **`SECURITY.md`**: how to privately report a vulnerability (a security contact email, not a public issue) — important once the donation flow exists.
- **`LICENSE`**: pick one if the repo is public. MIT is the common default for nonprofit/community sites and imposes the fewest restrictions on volunteer contributors reusing the code elsewhere.

## 8. Secrets & environment variables

- Never commit `.env` files. Add `.env*` to `.gitignore` (already default in the Next.js scaffold) and double-check before the first push.
- Store real secrets (Zeffy API keys if any, chatbot API keys, analytics IDs) in **GitHub Actions secrets** (repo Settings → Secrets and variables → Actions) and in your hosting provider's environment variable settings (e.g. Vercel), never in the repo.
- With secret scanning + push protection enabled (§4), GitHub will block a push that contains a recognizable key pattern — treat any alert as urgent, not routine.

## 9. CI/CD

Add a `.github/workflows/ci.yml` in `mllws-website` that runs on every pull request: `next build`, then the Playwright/Lighthouse/Pa11y checks described in `TESTING.md`. Required status checks (§7) then block merging until it's green — this is what actually makes the testing plan enforced rather than aspirational.

Connect the repo to your hosting provider (Vercel is the natural fit for Next.js — free tier, automatic preview deployments per PR, which also makes manual QA and screenshots easy before merging).

## 10. Getting volunteer developers involved

Nonprofits often rely on community/volunteer engineers — a few things make that work smoothly:

- Label a handful of small, well-scoped issues `good first issue` (from `FUTURE_ENHANCEMENTS.md` — e.g. the newsletter sign-up embed or a sponsor spotlight page are good starter tasks).
- Turn on **GitHub Discussions** on the main repo for open-ended proposals/questions, keeping Issues reserved for actionable, scoped work.
- Keep the README welcoming and specific: what the org does, how to run the project, how to propose a change — a generic "Next.js app" README won't attract mission-driven contributors the way a clear one will.

## Summary checklist

- [ ] Create org, use an org email for billing/ownership
- [ ] Apply for GitHub for Nonprofits (free Team plan)
- [ ] Enforce org-wide 2FA
- [ ] Enable Dependabot, secret scanning, push protection org-wide
- [ ] Set base permissions to Read
- [ ] Create `mllws-website` (+ `.github` meta repo)
- [ ] Set up Owners / Maintainers / Contributors teams
- [ ] Branch protection + required reviews + required CI checks on `main`
- [ ] CODEOWNERS, issue templates, PR template, CONTRIBUTING, SECURITY, LICENSE
- [ ] Secrets in GitHub Actions / hosting provider only, never in repo
- [ ] CI workflow wired to the checks in `TESTING.md`
- [ ] Connect to Vercel (or chosen host) for preview deployments

Sources:
- [Getting started with the GitHub Team plan for nonprofits](https://docs.github.com/en/nonprofit/nonprofit-teams-plan/getting-started-with-the-github-team-plan-for-nonprofits)
- [Quickstart for GitHub for Nonprofits](https://docs.github.com/en/nonprofit/quickstart)
- [GitHub for Nonprofits FAQ](https://docs.github.com/en/nonprofit/troubleshooting/frequently-asked-questions)
- [Best practices for repositories — GitHub Docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/best-practices-for-repositories)
- [Managing a branch protection rule — GitHub Docs](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/managing-a-branch-protection-rule)
- [Best practices for managing GitHub organizations — Graphite](https://graphite.com/guides/managing-github-organizations)
