# AI Usage Log — ABTalks (HexFury)

This log records the AI prompts used to build this project, in chronological order, for hackathon authenticity review (Stage 2).

Tools used: Bolt.new (initial build) → Google AI Studio (design/polish passes).

## Phase 1 — Initial Build (Bolt.new)

### Prompt 1

**Prompt:** Build a complete, mobile-first web application called "ABTalks" — a redesign of a platform running a 60-day coding challenge for Indian college students. Students pick a track, build something daily, and maintain a public streak by submitting a GitHub commit + a LinkedIn post each day. TECH STACK & ARCHITECTURE React + Vite + TailwindCSS + react-router-dom. Single-page app, client-side routing only. No backend, no auth. Use a mocked JSON data file (src/data/mockData.json) for all content (student profile, streak history, challenge days, tracks, badges, submissions). Clean, componentized folder structure (src/components/, src/pages/, src/data/). DESIGN DIRECTION & BRANDING Viewport: Mobile-first, designed precisely at 390px width as the primary viewport. Must include full responsiveness for larger screens/desktop as a secondary view. Vibe: Calm, focused, low-glare friendly, late-night coding aesthetic for tired college students after classes (use a sophisticated dark-leaning or deep charcoal/obsidian base theme: #0d0f12, #161920, etc.). Color Palette (Branding): Soft warm white (#f8f9fa / #e2e8f0 for text) and a distinctive warm orange accent (#f97316 or #fb923c) for streaks, progress bars, and primary CTAs. Avoid generic purple gradients or default shadcn/Tailwind generic looks. Give it real typographic hierarchy and spacing rhythm. EXACT ROUTES TO BUILD (Route Map) Provide these exact routes in the application: / /dashboard /day/12 PAGE SPECIFICATIONS 1. / — Landing Page (First-time visitor) Goal: Build trust, clarity, and motivation to commit to 60 days in under a screen-scroll of attention. Content: One-line value proposition explaining what ABTalks is. The daily loop explained simply: Build Commit to GitHub Post on LinkedIn Maintain Streak. Social proof / live stats counter (e.g., active student builders, total streaks kept, recruiters watching). Clear primary CTA button ("Start your streak") navigating to /dashboard. Micro-explainer clarifying the two-part submission format for newcomers. 2. /dashboard — Student Dashboard (Logged-in view) Goal: The home screen after logging in, managing ongoing progress. Content & Edge Cases: Current Streak Widget: Handle the "no streak yet" state gracefully for a brand-new student (welcoming zero state rather than a broken 0). Progress Bar: 60-day challenge overview (e.g., Day 12 of 60 complete). Today's Task Card: Title, short description, and a direct action link (/day/12). Missed Day State: Visible, honest, non-shaming state for a missed day with a gentle re-engagement nudge. Empty Profile State: Graceful handling for a student with zero submissions yet—inviting and actionable. Achievements/Standing: Badges, rank, or milestone trackers. 3. /day/12 — Challenge Day (Single Day Experience) Goal: The complete daily workspace for Day 12. Content & Features: Task Brief: Clear instructions on what to build, why it matters, and definition of "done". Submission Flow: Two input fields (GitHub repository/commit link + LinkedIn post link). Submission States: Interactive state management for neither submitted, one submitted, and both submitted (streak-safe confirmation badge). REQUIRED THOUGHTFUL UX FEATURE Implement a "Streak Freeze" (1 free pass per challenge cycle). Display this clearly on the Dashboard and Challenge Day screens as an active power-up or shield icon. Allow the student to toggle or apply it to cover a missed day, turning a harsh break into a protected status with a friendly helper tooltip explaining how it works. MOCK DATA REQUIREMENTS (src/data/mockData.json) Create a robust mockData.json file containing: Student profile details (Name: "Noor Hassan", College: "Sister Nivedita University", Track: "Full Stack & AI", Current Day: 12). Streak history array including at least one intentional gap/missed day to power the missed-day state and Streak Freeze logic. Day 12 detailed task payload (Title: "Building a Semantic Search API with Python & TF-IDF", requirements, hints, recruiter relevance note). Achievement badges (e.g., "7-Day Streak", "First Commit", "Early Bird Builder"). OUTPUT REQUIREMENT Deliver the complete, working React code structured cleanly so it can be deployed immediately on Vercel/Netlify or previewed in 390px mobile viewports.

**Prompt:** Add a calendar in last from day 1 to 60. design calendar like Samsung calendar type, but here it shows a streak that you have done your task or not, or your Strick is going well or not.

**Prompt:** <div> selected for inspection
Not like this, redesign separately in square/ rectangle box. write a number 1, 2, ....., 60. side by side, design it like rows and columns type below of each days show emoji of yes and cross [yes represents done task and cross represents not done task on that particular day]. use green in yes and red in cross. Also in top of box show total missed, done and how much need to go.

**Prompt:** <div> selected for inspection
Show that calendar below of this not inside of start your streak.

**Prompt:** <section> selected for inspection
Can you make all box of days small and instead of using emoji use Ascii design. Make full calendar compact and small.

**Prompt:** <span> selected for inspection
remove today text from calendar.

## Phase 2 — Design & Polish Pass (Google AI Studio)

This app was imported from GitHub repository Noor-Junior45/HexFury.

### Prompt 2

**Prompt:** Show this button [Home, Dashboard and 12 day calendar] everytime, make it bottom navbar. [screenshot_1.png]

**Prompt:** redesign the website, first make bottom navbar fixed in all pages and website open perfectly in any screen size like phone or desktops. Make background colour to soft white. In top navbar in left side write [ABTalks] heading and opposite of it in right margin of navbar use circular design profile button [like gmail app] Show profile photo or name characters in that circular box.

**Prompt:** In header of home page shift the ABTalk to left margins and show profile option in right margins. Do little bit changes like first redesign the home page and make sure when user arrive first to our website than it shows all button of bottom navbar. Here make Home page is landing page, make Landing Page (/) like according to this questions:
[The first experience for a student who has never heard of ABTalks.
Show enough trust, clarity, and motivation that they're willing to commit to a 60-day challenge.]. Change background colour of whole website to white from black.
Apply style changes to the selected element(s).
[div] [header]

**Prompt:** make this floating navbar pill shape in lager screen and rectangular fixed in phone screen at bottom. Make this navbar transparent glassmorphsim effect and add some animation on these three buttons.
Apply style changes to the selected element(s).
[div]

**Prompt:** remove heartbeat animation from all these 3 buttons
Apply style changes to the selected element(s).
[3 components]

**Prompt:** Create a data visualization component on the Dashboard using Recharts to display a summary of daily coding activity over the last 30 days.

**Prompt:** Remove dashboard and about ABtalks arrow button from bottom calendar page.
Apply style changes to the selected element(s).
[a] [a]

**Prompt:** Remove this div component from calendar page. Do one more thing in code like create seperate file for each page Home, dashboard and calendar, So that in feature easy to build each page independently.
Apply style changes to the selected element(s).
[div]

**Prompt:** Add a 'Share to LinkedIn' button on the day details page that opens a pre-filled LinkedIn post template for the user to share their daily project progress.
Add a subtle 'confetti' or 'success' animation when a user marks a day as completed on their calendar or day page.

**Prompt:** Remove calendar [section] from dashboard page, move it to calendar section. In dashboard page add heading for each section according to each question [Include essentials such as:
Current streak
Today's task
Progress through the challenge
Overall completion
Student standing or achievements]. restructure dashboard page use pill shape button design where need.
Apply style changes to the selected element(s).
[section]

**Prompt:** In phone screen pill shape button not look good make stack wise and dashboard page look more congested in phone screen due to colourful box, remove all border from each box make page attractive like leetcode type.

**Prompt:** You are redesigning ONLY the landing page (src/pages/LandingPage.tsx) of an existing React + TypeScript + Vite + Tailwind v4 app called ABTalks (a 60-day coding-challenge platform for Indian college students). Do NOT touch any other page or route, do NOT change routing, data structure, or business logic — only improve the visual design, styling, and micro-interactions of this one file (and src/index.css design tokens if a shared improvement is needed for consistency later).
CONTEXT
The palette is defined in src/index.css under @theme using ember/obsidian/mist tokens. Keep this base palette — refine usage, don't replace it.
Data comes from src/data/mockData.ts (appData, getTrack) — do not hardcode new content that bypasses it; only restyle what's already being rendered.
This page must stay mobile-first: it will be screenshotted at 390px width first.
GOALS FOR THIS PASS
Hero section
Add a subtle animated or illustrated visual element next to/behind the headline — e.g. a small mock streak-calendar snippet, a floating "commit graph" motif, or an animated flame — instead of relying only on the blurred gradient blob.
Keep the headline and CTA buttons exactly as functional elements (same Links, same destinations) but improve their visual weight and spacing rhythm.
Make the "Quick Trust Highlights" row feel less like a plain 2x4 grid — add subtle dividers, icon backgrounds, or a slight card treatment so it doesn't blend into the hero.
"Why ABTalks Works" section
Give the four FeatureBox cards more visual differentiation — right now they're uniform bordered boxes. Add subtle depth (shadow/gradient) or a more custom icon treatment so each feels distinct, without making them inconsistent with each other.
"3-Step Daily Loop" section
Add a visual connector (line, arrow, or numbered progression) between the three steps so it reads as a sequence, not three disconnected cards.
Testimonials section
Add initials-avatar or subtle visual treatment per testimonial so cards feel less like plain text blocks.
Improve visual separation between card and page background.
Scroll behavior
Add scroll-triggered reveal animations (fade/slide-up as sections enter viewport) using a simple IntersectionObserver-based approach or CSS-only technique — no new dependencies. Respect prefers-reduced-motion.
Final CTA section
Keep as-is functionally but make the dark card feel slightly more premium — subtle texture, gradient, or glow refinement.
CONSTRAINTS
Only edit src/pages/LandingPage.tsx (and index.css only if adding a small reusable utility/animation class that this page needs — keep additions minimal and clearly named so they don't clash with other pages later).
Do not add new npm dependencies.
Do not change any Link destinations, text content sourced from appData, or component structure/exports.
Preserve all existing accessibility attributes (aria-labels) and add any missing ones on new interactive/icon elements you introduce.
Keep animations subtle and performant — no heavy JS animation libraries.
Apply the changes directly to LandingPage.tsx.

**Prompt:** You are redesigning ONLY the student dashboard page (src/pages/DashboardPage.tsx) of an existing React + TypeScript + Vite + Tailwind v4 app called ABTalks (a 60-day coding-challenge platform for Indian college students). Do NOT touch any other page or route, do NOT change routing, data structure, or business logic — only improve the visual design, styling, and micro-interactions of this file and its shared sub-components (StreakStrip, StreakFreeze, BadgeCard, ProgressBar, CodingActivityChart) if a shared visual fix is needed.

CONTEXT

The palette is defined in src/index.css under @theme using ember/obsidian/mist tokens. Keep this base palette and stay visually consistent with the recently redesigned LandingPage.tsx — match its spacing rhythm, card treatment, shadow depth, and animation style so the two pages feel like one product.
Data comes from src/data/mockData.ts (appData, getTrack, getDay, completedDays, missedDays, earnedBadges, lockedBadges) — do not hardcode new content; only restyle what's already being rendered.
This page must stay mobile-first: it will be screenshotted at 390px width first.
GOALS FOR THIS PASS

Current Streak section (the emotional focal point)

Make this the clear visual centerpiece of the page — bigger, bolder than every other section. Consider a radial/ring progress visual around the flame icon (e.g. ring fills based on streak length or days-to-next-milestone) instead of a static icon in a box.
Improve the zero-streak state ("Light your first flame") so it feels encouraging and intentional, not like a placeholder — add a small supportive visual treatment, not just text.
Improve the missed-day callout so its urgency feels distinct (color, icon, motion) without being alarming — it should read as "here's how to recover," not a failure message.
Keep the Streak Freeze button and toast functionally identical, just restyle for consistency.

Today's Task section

Give it stronger visual priority as the primary action of the page — the CTA to go to /day/N should be unmistakable.

Progress through the challenge

Make the progress bar feel more like meaningful progress — gradient fill, milestone markers at 25/50/75/100%, animated count-up on the current-day number.
Improve "Recent Days History" (StreakStrip) with clearer visual distinction between shipped/missed/upcoming days.
Polish the 30-day activity chart (CodingActivityChart) styling to match the new palette treatment — check axis labels, tooltip, and bar/line colors for consistency and contrast.

Shipped Projects & Proof section

Improve the submission cards (GitHub/LinkedIn icon links + checkmark) with clearer visual hierarchy — project name should read first, metadata second.
Improve the "No submissions recorded yet" empty state to match the encouraging tone and visual treatment used for the zero-streak state — consistency between empty states matters.

Standing & Achievements section

Improve BadgeCard styling: locked badges should read as clearly locked (desaturated, subtle lock icon or blur) while earned badges should feel rewarding (glow, color, maybe a subtle shine/shimmer on load).
Improve the Campus Rank / Visibility stat cards with slightly more visual interest than plain bordered boxes — consistent with the FeatureBox treatment from the landing page redesign.

General

Add consistent hover/active/focus states on every interactive element (buttons, links, cards), respecting prefers-reduced-motion.
Ensure all touch targets are at least 44px tall.
Verify color contrast (especially ember-on-obsidian and mist text combinations) meets WCAG AA.

CONSTRAINTS

Only edit src/pages/DashboardPage.tsx and the shared components it uses (StreakStrip, StreakFreeze, BadgeCard, ProgressBar, CodingActivityChart) — do not touch LandingPage.tsx, DayPage.tsx, or CalendarPage.tsx.
Do not add new npm dependencies.
Do not change any state logic (freezeAppliedDay, showFreezeToast, handleApplyFreeze), Link destinations, or data derivations (completed, missed, earned, locked, streak, completionPercentage).
Preserve all existing accessibility attributes and add any missing ones on new interactive/icon elements you introduce.
Keep animations subtle and performant.
Apply the changes directly to DashboardPage.tsx and the listed shared components.

**Prompt:** You are redesigning ONLY the challenge day page (src/pages/DayPage.tsx) of an existing React + TypeScript + Vite + Tailwind v4 app called ABTalks (a 60-day coding-challenge platform for Indian college students). Do NOT touch any other page or route, do NOT change routing, data structure, or business logic — only improve the visual design, styling, and micro-interactions of this file and its shared sub-component (StreakFreeze) if a shared visual fix is needed.

CONTEXT

The palette is defined in src/index.css under @theme using ember/obsidian/mist tokens. Stay visually consistent with the recently redesigned LandingPage.tsx and DashboardPage.tsx — match their spacing rhythm, card treatment, shadow depth, empty-state tone, and animation style so all three pages feel like one product.
Data comes from src/data/mockData.ts (appData, getDay, getTrack, getStreakDay) — do not hardcode new content; only restyle what's already being rendered.
This page must stay mobile-first: it will be screenshotted at 390px width first.

GOALS FOR THIS PASS

Task detail section

Give the day's title, summary, and track badge stronger visual hierarchy — this is the first thing a student reads to understand what to build.
Turn the requirements / "Definition of Done" list into a more interactive-feeling checklist — e.g. checkmark icons that animate in, or a completion-style visual treatment, even though completion here is just reading (no backend state). Keep it presentational only, don't invent new interactive state beyond what exists.

GitHub submission card

Give clearer, more distinct visual states for: not submitted, submitted (valid), and error (invalid URL) — e.g. a color-coded left border or status icon per state, consistent with how you styled empty/error states on the dashboard.
Keep the existing validateUrl/handleSubmit logic and error messages untouched — restyle only.

LinkedIn submission card

Same treatment as GitHub card for visual states.
Improve the pre-filled post template preview and the "copy + share" interaction (handleShareToLinkedIn) so the copied-confirmation feels satisfying (e.g. brief inline checkmark/toast styling matching the dashboard's freeze-toast pattern) — do not change the underlying clipboard/window.open logic.

Completion state

When both GitHub and LinkedIn are submitted (bothSubmitted), add a clear "Day Complete" visual moment — a banner, badge, or highlighted state change — that pairs well with the existing confetti trigger rather than competing with it.
When only one is submitted (oneSubmitted), give a small "almost there" visual nudge toward the second submission.

Locked/not-unlocked state

Restyle the "Day X isn't unlocked yet" state to match the encouraging, intentional tone used for empty states on the dashboard (zero-streak, no-submissions) — same visual language, not a generic error page look.

General

Add consistent hover/active/focus states on every interactive element (buttons, inputs, links), respecting prefers-reduced-motion.
Ensure all touch targets are at least 44px tall, especially the submission action buttons.
Verify color contrast meets WCAG AA across all new state colors (success, error, pending).

CONSTRAINTS

Only edit src/pages/DayPage.tsx and the StreakFreeze component if needed — do not touch LandingPage.tsx, DashboardPage.tsx, or CalendarPage.tsx.
Do not add new npm dependencies.
Do not change any state logic (githubUrl, linkedinUrl, submitted, errors, copiedTemplate), validation rules, the confetti trigger, or the LinkedIn share URL/template text.
Preserve all existing accessibility attributes and add any missing ones on new interactive/icon elements you introduce.
Keep animations subtle and performant.
Apply the changes directly to DayPage.tsx and the StreakFreeze component if used here.

**Prompt:** You are fixing day-content and day-navigation in an existing React + TypeScript + Vite app called ABTalks. Files involved: src/data/mockData.ts, src/data/mockData.json, src/components/StreakCalendar.tsx, src/pages/DayPage.tsx.
PROBLEM
getDay(n) in mockData.ts only returns real task data when n === 12; every other day number returns undefined, so /day/N for any N other than 12 shows the "not unlocked" fallback regardless of whether that day is in the past, current, or future.
StreakCalendar.tsx's DayBox buttons only toggle local completion state — they do not navigate to /day/N at all.

FIX

In mockData.json, add a days array (or extend the existing structure) containing a DayTask object (same shape as the existing day12 object: day, date, title, trackId, duration, difficulty, summary, why, requirements, hints, recruiterNote, submission) for all 60 days, 1 through 60. Generate realistic, varied daily coding tasks appropriate for the existing tracks in appData.tracks — vary difficulty and duration across the 60 days so it doesn't feel repetitive. Keep day 12's existing content unchanged (Weather Widget with Async API) so nothing currently working breaks.

In mockData.ts, update getDay(n) to look up the day from the new days array (falling back gracefully to undefined only for n < 1 or n > appData.brand.cycleDays, which is the correct "not unlocked" case).

In StreakPage/StreakCalendar.tsx, wrap each DayBox in a Link (or make the whole box a Link) to /day/${day}, but only for days that are unlocked — i.e. day <= appData.student.currentDay (student.currentDay is 12, so days 1-12 should be clickable/navigable, days 13-60 should visually indicate "locked" and either not navigate or navigate to a day page that correctly shows the "not unlocked yet" state, which is actually correct behavior for future days).

In DayPage.tsx, verify the "Day X isn't unlocked yet" state is now ONLY shown for genuinely future days (day > student.currentDay), not for any past/present day that should have content.

Double check /day/12 itself still renders identically to how it does now — do not change its content or behavior.

CONSTRAINTS

Do not change routing structure (routes stay /, /dashboard, /day/:day, /calendar).
Do not add new npm dependencies.
Keep the visual/styling work already done in previous passes — this is a data + logic fix only, not a redesign.
Preserve existing accessibility attributes.
Apply changes to mockData.json, mockData.ts, StreakCalendar.tsx, and DayPage.tsx.

**Prompt:** remove calendar section from Home page, keep it exclusive for calendar page only.
Apply style changes to the selected element(s).
[section]

**Prompt:** Inside a calendar page, Move the position of Streak Freeze protection pass box from top to bottom of calendar box and move up the Today's Active build box above the calendar.
Apply style changes to the selected element(s).
[div] [div]

**Prompt:** Replace the + sign with Tick sign from calendar. Remove [P] component, make it clean. Make [span component] simple and use rectangular box or no any borders. Make sure each data show perfect and right inside calendar page, like Total shipped data and correct number To Go, Current, best, done and missed data. Redesign little bit calendar page, like make all data box at one place (you can move today active build box more up also) and you can merge calendar 3 data [div] box with top 3 data [div].
Apply style changes to the selected element(s).
5 components

**Prompt:** Move Today Active Build box to top of calendar page, make Build button [a] big and make it in stack look and little bit bigger so that student know he need to submit today task still there.
Apply style changes to the selected element(s).
div
a

**Prompt:** Make apply freeze pass button [button] little bit bigger like Build & Submit day 12 task button. Make the border colour soft or remove border from Today active build box [div].
Apply style changes to the selected element(s).
button
div

**Prompt:** Make button bigger let it touch the border of div component.
Apply style changes to the selected element(s).
button
div

**Prompt:** In Dashboard page, Make badge circular or hexagonal type not proper square and circle, add more badge and make sure it show correct badge according to data which student build.
Apply style changes to the selected element(s).
div

**Prompt:** Rename Hexagonal Achievements to Achievements And add logo. And Make badge border/box small let reduce empty space and badge fix in whole box.
Apply style changes to the selected element(s).
div
div

**Prompt:** In dashboard page remove number from each 5 subheading like 1. Current streak (remove 1), 2. Today's primary task (remove 2) and so on. Move Missed day 8 recover box from dashboard page to calendar page and remove streak freeze protection box from dashboard page shift it to calendar page (if there this box present than don't add it again).
Apply style changes to the selected element(s).
div
div

**Prompt:** In calendar add option to unfreeze in streak freeze protection pass and same in apply streak freeze pass for day 8/ or any current days. Make Missed day 8 recovery option more useful like user can do that work or freeze it.

**Prompt:** In calendar page, if possible than merge Day 8 recovery center box and streak freeze protection pass. or redesign protection pass like airline ticket look but it is used one time only to freeze a left day to maintain a streak.
Apply style changes to the selected element(s).
div
div

**Prompt:** Remove the airline details from ticket design keep it look like airline type but no any formate of airline, design it like according to our website look and all formate and heading and everything inside of ticket [div].
Apply style changes to the selected element(s).
6 components

**Prompt:** Remove [svg] from ticket.
Apply style changes to the selected element(s).
svg

**Prompt:** In dashboard page, make start day 12 problem button [a] colour to soft medical green with glossy look button. Make whole box of today's primary task box look professional and student can start doing task without any problem, make it look attractive.
Apply style changes to the selected element(s).
3 components

**Prompt:** In dashboard page, First, remove view 60 days calendar button [a] from top of screen. second, In phone screen Inside today's primary task box there is tag of Full stack & AI, intermediate and day 12 active tag box is unequal and not look perfect make it equal and fix it and keep only useful tag, don't repeat the same tag or line inside Today's primary task box. third, exchange the position of shipped project & proof with Challenge progress.
Apply style changes to the selected element(s).
4 components

**Prompt:** In dashboard page, Remove Day 12 Active badge from Today's primary task box.
Apply style changes to the selected element(s).
span

**Prompt:** In Dashboard page, Inside 30- Days activity volume box there is button commits, lines, area and bar button make it small and let fit in one line phone screen and merge all button in one background box or separate but in one line.
Apply style changes to the selected element(s).
div

**Prompt:** In calendar page, inside streak protection pass there is tag of action needed tag in pill shape in two line in phone screen, make it small and you might redesign tag design like rectangle and design it like hanging on border [div] to look cool with warning.
Apply style changes to the selected element(s).
span
div

**Prompt:** [span] remove the action needed tag.
Rename the Pass #01 - cycle 1 to Pass #01, remove cycle 1.
rename Abtalks streak protection pass to streak protection pass.
Rename Abtalks streak shield cycle 1 to streak shield cycle 1.
Apply style changes to the selected element(s).
4 components

**Prompt:** remove streak ticket pass from day Task page and redesign the task page like add option to swipe the task page to another days past or future days to see task. Make sure each days has different task and proper hint and use proper colour and design in all box and task page. Make sure linkedin pre-filled post draft copy and draft match with each tasks. make submit your proof of work more beautiful design like attractive box and don't add border colour.
Apply style changes to the selected element(s).
div

**Prompt:** Inside task page, move it to bottom of page and redesign it, make it smooth and soft white colour with soft black colour and make arrow line and days number box in one line.
In top of page there is tag of day, date and full stack & ai in top of screen make these tag bottom of heading and merge all tag which is below of heading, beside intermediate, 2.5hrs and FS & AI tag. In task page use Question mark in question and make whole page look like one page remove border from all other elemntes only keep box where student submit link.
Apply style changes to the selected element(s).
4 components

**Prompt:** Remove question from heading. Add these question marks in real question which is below of heading and tag. remove all border make a straight page like Ms word A4 page type means clean with no border so it looks like it belong with question. Merge all question, why it matters, definition of done, developer hints & strategy and recruiter relevance to look one use colour in logo like present just remove border from each text and everythings.
Apply style changes to the selected element(s).
13 components

**Prompt:** In task page, in big screen there is option to change task page to another date but in large screen it is not fixed it is floating make it fixed in all screen in bottom. Redesign the linkdin draft box colour to white and remove the share on linkdin button from that box.
Apply style changes to the selected element(s).
4 components

**Prompt:** Remove it
Apply style changes to the selected element(s).
div

**Prompt:** Remove the arrow and each days buttons from bottom of task page.
Apply style changes to the selected element(s).
div

**Prompt:** show current date and year in dashboard top tag. In last of dashboard page there is Enrolled track & college box [div], make it smooth and check it fit in this page or not, if not than redesign the page.
Apply style changes to the selected element(s).
span
div

**Prompt:** in dashboard page in top page there is tag but there is written winter cohort 25 can you tell me 25 is year or what? if year than remove it.
Apply style changes to the selected element(s).
span

**Prompt:** In dashboard page there is section of shipped projects & proof, can you verify and fixed the shipped project match with days question and make it openable from dashboard shipped line.
Remove [span] green dot from profile logo.
Apply style changes to the selected element(s).
section
span

**Prompt:** In Home page, there is option to pick your specialization with four options but option picking is not working, make it work and made question according to related questions and match same option in dashboard submitted tasks.
Apply style changes to the selected element(s).
div

**Prompt:** You are fixing a locked-day bypass bug in an existing React + TypeScript app called ABTalks. Files: src/pages/DayPage.tsx, src/components/StreakCalendar.tsx.
PROBLEM
getDay(n) in mockData.ts now returns full task content for every day 1-60, with no concept of "locked." DayPage.tsx no longer checks whether the requested day is beyond appData.student.currentDay, so any day (including far-future days) renders a complete task with a working submission form.
StreakCalendar.tsx visually dims future days (isUnlocked flag) but the Link still navigates to them regardless.
The swipe gesture in DayPage.tsx (handleTouchEnd) lets a user swipe past student.currentDay into locked future days.
FIX
In DayPage.tsx, after fetching task, add a check: if dayNum > appData.student.currentDay, render the existing "Day X isn't unlocked yet" locked state (reuse the current empty/locked UI pattern already used for the !task case) instead of the full task and submission form. Do this even though getDay(n) now successfully returns data for that day — the lock is a product rule, not a data-availability rule.
In the swipe handler (handleTouchEnd), only allow swiping forward (isLeftSwipe) to dayNum + 1 if dayNum + 1 <= appData.student.currentDay. Swiping backward to previous days should remain unrestricted (past days should always be viewable).
In StreakCalendar.tsx, keep the Link for all days (so locked days still route to /day/N), but since DayPage.tsx will now handle the lock itself, no change needed there — just confirm the isUnlocked visual state still matches student.currentDay correctly.
Do not change task content generation, submission logic, or validation — this is purely adding the missing "is this day allowed to be viewed/submitted" gate.
CONSTRAINTS
Do not change routing structure or the mock data.
Preserve all styling from the recent redesign passes.
Days 1 through student.currentDay (12) should remain fully accessible with real content and working submission; days 13-60 should show the locked state.
Apply changes to DayPage.tsx and, if needed, StreakCalendar.tsx.









