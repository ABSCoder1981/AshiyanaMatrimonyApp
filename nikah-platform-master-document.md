# Nikah Platform — Master Project Document
**Version:** 3.2 | **Status:** Single Source of Truth | **Last updated:** June 2026

> *"And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy."* — Qur'an 30:21

---

## Table of Contents

1. Project Overview & Vision
2. Target Users
3. Product Scope — MVP
4. User Registration & Onboarding
5. Verification System
6. Profile System (Complete Form Specification)
7. Privacy Architecture
8. Matching & Search System
9. Trust & Safety
10. Islamic Knowledge & Guidance
11. Admin & Moderation
12. All App Screens
13. Design System
14. MVP Roadmap
15. Monetisation & Subscription Discounts
16. Key Success Metrics
17. Fields Never to Collect

---

# 1. Project Overview & Vision

### Vision
Build the world's most trusted Muslim marriage platform that prioritizes marriage over dating, family involvement over secrecy, privacy over exposure, and trust over engagement metrics.

### Mission
Enable Muslims to find compatible spouses through a safe, verified, family-aware, privacy-first, and Islamically guided marriage process.

### Strategic Positioning
This platform is positioned not as "Muslim Tinder" but as a **"Digital Marriage Operating System"** where trust, verification, Islamic etiquette, and serious intent are built into the core workflow.

### Core Principles
- Marriage-first, not dating
- Female privacy by default
- Structured, purposeful communication
- Serious-intent matching
- Trust & verification
- Islamic guidance and education
- Men paid, women free

### Platform Name
To be decided later.

---

# 2. Target Users

| Segment | Primary Need | Notes |
|---------|-------------|-------|
| Bride | Safe, serious, respectful proposals | Free forever |
| Groom | Verified compatible matches | Paid subscription |
| Parents / Family | Trust, family compatibility | Family representative role |
| Community Matchmakers | Reliable introductions | Use standard family representative role — no separate dashboard |
| NRI users | Overseas verified matches | Dedicated NRI segment with overseas verification + NRI badge |
| Divorced / Widowed | Private, sensitive experience | Dedicated onboarding flow + separate search filter |

---

# 3. Product Scope — MVP

### Platforms
- Web (PWA)
- iOS (native app)
- Android (native app)
- All three launching simultaneously

### Languages
- English
- Hindi
- Urdu
- All three supported from Day 1

### Included in MVP
- User registration (quick 3-field signup)
- Selfie verification
- 3-part profile completion form with Save & Resume
- Search & compatibility matching
- Interest / proposal system
- Privacy-controlled profiles
- Messaging after mutual interest
- Islamic Knowledge Tab
- Trust & risk scoring
- AI-based fake profile detection
- User reporting system
- Admin moderation panel
- Admin Islamic guidance content panel
- Subscription billing with discount logic

### Removed from MVP
- Wali workflow
- Separate family dashboard
- Wali verification
- Liveness detection
- Video verification
- Government ID verification
- 6-stage structured communication
- Photo gating / visibility levels system
- Polygyny intentions field

---

# 4. User Registration & Onboarding

### Step 1 — Landing Page
- Platform name and tagline — *"Your Nikah begins with sincerity"*
- "Register as Bride" / "Register as Groom" buttons
- Anonymous success stories
- Scholar endorsement quotes
- Islamic Knowledge preview section
- Trust badges (verified profiles, active users count)
- Short explainer video (60 seconds)

### Step 2 — Quick Registration
Only 3 fields required to enter the app:
1. Full name
2. Phone number OR email
3. Gender

### Step 3 — OTP Verification
- 6-digit OTP, expires in 10 minutes
- Maximum 3 attempts before lockout
- Resend available after 45 seconds
- After 3 failed attempts — 30 minute lockout

### Step 4 — Selfie Verification
- One time only — never asked again
- Selfie stored securely — never shown publicly
- Used only for AI duplicate face detection
- Explicit consent required before camera opens
- 3 retry attempts, then manual admin review

### Step 5 — Welcome Screen
Shows for 3 seconds after selfie verification:
> *"Bismillah. Welcome to Nikah Platform. May Allah make this journey easy and blessed for you."*

- Soft green background, Arabic calligraphy watermark
- No buttons, no navigation — fades automatically into Home Screen
- Special variant on Eid: *"Eid Mubarak. May this celebration bring you closer to your Nikah."*
- Special variant on first day of Ramadan: *"Ramadan Mubarak. May this blessed month bring you your righteous match."*
- Also shown after 30+ days of inactivity on return

### Step 6 — Profile Completion Nudge
- "Your profile is 5% complete"
- Lists what completing the profile unlocks: appearing in search, receiving interests, accurate matches, signaling seriousness to families
- "Complete my profile" button (primary) and "Skip for now" (secondary)
- Skip is always available — never forced

### Registration Types
- Self
- For Son
- For Daughter
- For Brother
- For Sister
- Family Representative
- Wali (register as Wali to submit on behalf of someone else)

### What is NOT included
- "Looking for marriage Yes/No" gate — removed, no blocking
- Separate registration type for divorced/widowed family members
- Wali verification at registration

---

# 5. Verification System

### Verification Steps
1. **Phone OTP or Email OTP** — at registration (one time)
2. **Selfie verification** — mandatory after login (one time only, never repeated)

### What is NOT included
- Wali verification
- Family verification
- Liveness detection
- Video verification
- Government ID / Aadhaar / Passport verification

### Trust Tiers (3 only)

| Tier | Score Range | Badge colour |
|------|------------|--------------|
| Basic Verified | 0 – 49 | Grey |
| Trusted Verified | 50 – 84 | Green |
| Highly Verified | 85 – 100 | Gold |

---

# 6. Profile System (Complete Form Specification)

**Version:** 1.4 | **Language Support:** English + Hindi (Urdu Phase 2) | **Parts:** 3
**Files:** `index.html` (markup/structure), `form.js` (data, logic, validation)

> **Prototype note:** Required-field markers (`*`) are shown purely as a visual indicator of what a production version would enforce. No field is currently mandatory in the prototype — clicking Next/Submit always proceeds regardless of what's filled in. Conditional show/hide behavior (e.g. Hijab/Beard, Divorce docs, Disability type, Wedding rituals, Sub-sect, State/City, Wali details, Children details) is unaffected and still works based on other answers. Save & Resume (Section 6.2) is implemented via browser `localStorage` in this prototype rather than true server-side storage, since there is no backend/login yet.

## 6.1 Form Changelog

### From v1.3
- **Added:** "Not educated / No formal education" option to Education level (Part 1).
- **Changed:** State dropdown expanded from 17 to all **36 Indian states and union territories**, each with a matching city list for the city autocomplete.
- **Added:** Conditional "children details" block (Part 1) — shown when Marital status is Divorced or Widowed *and* "Do you have children?" = Yes. Asks: how many children (1/2/3/4+), who they currently live with (With me / With their other parent / With other family / Shared arrangement), and a free-text box for anything else relevant to a future spouse.

### From v1.2
- **Added:** "Did you convert to Islam (revert)?" field (Part 1, Religious Identity) — resolves the open item formerly tracked in Section 15, needed to calculate the men's revert subscription discount.
- **Added:** Optional "Would you like to display Wali (वली / guardian) details on your profile?" toggle (Part 3, Section C — Shared) — distinct from the "Register as: Bride / Groom / Wali" flow in Part 1 (which captures the *registrant's own* Wali details when a Wali is filling out the form on someone's behalf). This new toggle is the *candidate's own choice*, available regardless of registration type, to optionally surface their guardian's info on the profile.
  - If Yes: reveals Wali's name, Wali's phone number, and Wali's relationship to the candidate (Father / Brother / Uncle / Appointed Wali / No wali available).
  - A further sub-toggle — "Would you also like to show this contact number on your profile?" — keeps the phone number verification-only by default; it is only shown publicly if the candidate explicitly opts in.
  - If the main toggle is No, none of the sub-fields are shown.

### From v1.1
- **Removed all blocking validation.** Part transitions and final submit no longer check required fields — this is a visual prototype, not a production form.
- **Added Save & Resume.** Users can save their progress at any point in the 3-part form and exit. On return, the form resumes exactly where they left off.

### From v1.0
- **Removed:** Polygyny intentions field (Part 3, male-only) — dropped per product decision.
- **Removed:** "Family type preference" field (Part 2) — duplicated Part 1's family structure question.
- **Added:** Divorce documentation sub-question (Part 1) — shown only when Marital status = Divorced.
- **Added:** Physical disability / health condition field + conditional disability-type checklist (Part 1).
- **Added:** Native place / hometown text field (Part 1, Location section).
- **Added:** Wedding rituals sub-checklist (Part 3) — shown only when Wedding type = Large wedding.
- **Added:** "Only during Ramadan" option to Quran reading habit (Part 3).
- **Added:** Inline help (?) tooltip buttons on 25 jargon-heavy fields, with short bilingual explanations.
- **Changed:** Self and partner religiosity scales now use a 5-star rating widget instead of numbered 1–5 pills.
- **Changed:** Part 2 "Preferred partner gender" auto-derives from Part 1 gender (opposite) and is locked — cannot be manually changed.
- **Changed:** "Open to relocation?" reworded to "Open to relocation with your partner?" for clarity.
- **Fixed:** A bug where every field label with a sibling element (required `*` marker, "(optional)" tag, or info-button) was being silently destroyed on language switch, because `el.textContent = ...` was applied to the label element itself. Fixed by wrapping only the translatable text in its own `<span data-t="...">`, sibling to the marker/button elements.

## 6.2 Save & Resume

| Behaviour | Detail |
|-----------|--------|
| Save trigger | User can save progress at any point in any of the 3 parts via an explicit "Save & continue later" action |
| Resume | On next login, user is returned to exactly the part and scroll position they left off at, with all previously entered data intact |
| Storage | Draft profile data persists server-side against the user's account, not just locally on device |
| Visibility | A saved-but-incomplete profile does not appear in search (per the 60% completeness rule defined in Section 12) |

## 6.3 Part 1 — About You

### Personal Details
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full name | Text input | Yes | Display name only |
| Register as | Radio pill | Yes | Bride / Groom / Wali |
| Wali name | Text input | Conditional | Shows only if Register as = Wali |
| Wali phone number | Text input | Conditional | Shows only if Register as = Wali |
| Wali relation | Text input | Conditional | Shows only if Register as = Wali |
| Wali relationship | Radio pill | Conditional | Shows only if Register as = Wali. Father / Brother / Uncle / Appointed Wali / No wali available *(ⓘ tooltip)* |
| Date of birth | 3 dropdowns (Day / Month / Year) | Yes | Age 18–70. Year range: current year −18 to −70 |
| Gender | Radio pill | Yes | Male / Female. Drives conditional fields throughout the form, including Part 2's locked partner-gender field |
| Marital status | Radio pill | Yes | Never married / Divorced / Widowed *(ⓘ tooltip)* |
| Do you have children? | Radio pill (Yes/No) | Conditional | Shows if Divorced or Widowed |
| How many children do you have? | Radio pill | Conditional | Shows if Divorced/Widowed and children = Yes. 1 / 2 / 3 / 4+ |
| Who do they currently live with? | Radio pill | Conditional | Shows if Divorced/Widowed and children = Yes. With me / With their other parent / With other family / Shared arrangement *(ⓘ tooltip)* |
| Anything else you'd like to share about your children | Textarea | Conditional | Shows if Divorced/Widowed and children = Yes. Free text — ages, schooling, or anything relevant to a future spouse |
| Do you have your divorce certificate / decree? | Radio pill (Yes/No) | Conditional, required if shown | Shows only if Marital status = Divorced *(ⓘ tooltip)* |
| Height | 2 linked dropdowns (feet / cm) | Optional | Selecting one auto-converts and fills the other |
| Do you have any physical disability or health condition? | Radio pill (Yes/No) | Optional | *(ⓘ tooltip)* |
| Type of disability / condition | Checkbox pill (multi-select) | Conditional | Shows if disability = Yes. Options: Visual / Hearing / Speech impairment, Mobility/physical disability, Chronic illness, Intellectual/developmental disability, Other, Prefer not to say |

### Religious Identity
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Sect | Radio pill | Yes | Sunni / Shia / Just Muslim / Ahmadiyya ⚠️ / Prefer not to say *(ⓘ tooltip)* |
| Sub-sect | Dropdown | Conditional | Shows if Sunni or Shia. Sunni: Barelvi, Deobandi, Ahl-e-Hadith/Salafi, Jamaat-e-Islami influenced, Tablighi Jamaat influenced, Non-sectarian Sunni, Other, Prefer not to say. Shia: Twelver (Usuli/Akhbari), Ismaili (Nizari/Dawoodi Bohra/Sulaimani Bohra), Zaidi, Other, Prefer not to say |
| Did you convert to Islam (revert)? | Radio pill (Yes/No) | Optional | *(ⓘ tooltip)*. Pure background data capture — also the field used by the subscription discount rules' revert-discount eligibility (Section 15) |
| Madhhab | Radio pill | Optional | Hanafi / Maliki / Shafi'i / Hanbali / No preference *(ⓘ tooltip)* |
| Salah frequency | Radio pill | Yes | 5× daily / Mostly regular / Sometimes / Still learning *(ⓘ tooltip)* |
| My religiosity level | **5-star rating** | Optional | Tap a star (1–5); caption below shows the selected label *(ⓘ tooltip)* |
| Hijab status | Radio pill | Conditional (Female) | Niqab / Full hijab always / Sometimes / Not currently *(ⓘ tooltip)* |
| Beard status | Radio pill | Conditional (Male) | Full beard (Sunnah) / Trimmed / Clean shaven |

### Career & Education
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Profession | Text with autocomplete | Optional | 45 profession suggestions, bilingual |
| Monthly income (INR) | Dropdown | Optional | 7 bands + Prefer not to say |
| Education level | Dropdown | Yes | Not educated / No formal education → High school → PhD / Islamic degree / Other |

### Location
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Country of residence | Dropdown | Yes | 12 countries incl. Other |
| State | Dropdown | Conditional | Shows if India. All 36 Indian states and union territories, each with a matching city list |
| City | Text + autocomplete | Conditional | Shows if India. Dropdown lists all cities for the selected state; typing filters the list |
| Native place / hometown | Text input | Optional | *(ⓘ tooltip)* |

### Background
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Mother tongue / Ethnicity | Radio pill | Optional | 23 options |
| Languages spoken | Checkbox pill (multi) | Optional | 23 options |
| Hobbies & interests | Checkbox pill (multi) | Optional | 16 emoji-prefixed options (📖 Reading, ✈️ Travel, 🕋 Quran recitation, etc.) |
| Role model / idol | Text input | Optional | Free text |

### Marriage Intentions
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| When are you looking to marry? | Radio pill | Yes | ASAP / 6 months / 1 year / Open |
| Open to relocation with your partner? | Radio pill | Optional | Yes / No / Maybe |
| Do you want children? | Radio pill | Optional | Yes / No / Open |
| Family structure (current home) | Radio pill | Optional | Nuclear / Joint |
| Is a Wali involved? | Radio pill | Optional | Yes / No *(ⓘ tooltip)* |
| Who is conducting this search? | Radio pill | Yes | Myself / Parent-family / Guardian / Wali *(ⓘ tooltip)* |
| About me | Textarea | Optional | Free text |

## 6.4 Part 2 — Partner Sought

### Basic Preferences
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Preferred partner gender | Radio pill (**locked**) | Yes | **Auto-set to the opposite of Part 1's gender and disabled** — cannot be manually changed. A lock note explains why |
| Partner age range | Min–Max number inputs | Yes | 18–70 |
| Preferred height range | Min–Max dropdowns (feet only) | Optional | Both ends use the same unit |
| Preferred sect | Radio pill | Yes | No preference / Sunni / Shia / Just Muslim *(ⓘ tooltip)* |
| Preferred sub-sect | Dropdown | Conditional | Same logic as Part 1, mirrored for preferred sect |
| Preferred Madhhab | Radio pill | Optional | *(ⓘ tooltip)* |
| Preferred Salah frequency | Radio pill | Optional | |
| Preferred religiosity level | **5-star rating** | Optional | |
| Hijab preference | Radio pill | Conditional (shown when preferred partner is female, i.e. own gender = Male) | *(ⓘ tooltip)* |
| Beard preference | Radio pill | Conditional (shown when preferred partner is male, i.e. own gender = Female) | |

### History & Background
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Preferred marital status | Radio pill | Optional | |
| Acceptable if partner has children? | Radio pill | Optional | |

### Career & Education
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Preferred profession | Text + autocomplete | Optional | |
| Employment preference | Radio pill | Optional | |
| Preferred education level | Dropdown | Optional | |

### Location & Living
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Preferred region | Checkbox ("Open to any region") + Dropdown + text | Yes | |
| Should partner be willing to relocate? | Radio pill | Optional | |
| Living arrangement after marriage | Radio pill | Yes | Independent / With in-laws / Flexible |

> "Family type preference" was removed — it duplicated Part 1's "Family structure" question.

### Future Plans
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Children preference | Radio pill | Optional | |
| Preferred Nikah timeline | Radio pill | Optional | |
| Mother tongue preference | Radio pill | Optional | |
| Wali involvement expected from partner? | Radio pill | Optional | *(ⓘ tooltip)* |
| Any other expectations | Textarea | Optional | |

## 6.5 Part 3 — Religious Preferences

### Section A — Practice & Beliefs
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Aqeedah / Theological orientation | Radio pill | Optional | *(ⓘ tooltip)* |
| Quran memorisation (Hifz) | Radio pill | Optional | *(ⓘ tooltip)* |
| Quran reading habit | Radio pill | Optional | Daily / Weekly / Occasionally / **Only during Ramadan** / Learning to read |
| Islamic education level | Radio pill | Optional | *(ⓘ tooltip)* |
| Islamic lifestyle goals | Checkbox pill (multi) | Optional | |
| Interested in studying Islam further? | Radio pill | Optional | |

### Section B — Lifestyle & Boundaries
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Halal diet adherence | Radio pill | Optional | |
| Fasting habit | Radio pill | Optional | |
| Zakat / Sadaqah practice | Radio pill | Optional | |
| Smoking status | Radio pill | Yes | |
| Alcohol consumption | Radio pill | Yes | |
| Halal entertainment standards | Radio pill | Optional | *(ⓘ tooltip)* |
| Mixed gender interaction comfort | Radio pill | Optional | *(ⓘ tooltip)* |
| Music / Nasheed views | Radio pill | Optional | |

### Section C — Marriage-specific Expectations

**Male-only** (shown if Part 1 gender = Male):
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Financial readiness for Nikah (Nafaqah) | Radio pill | Yes | *(ⓘ tooltip)* — **Polygyny intentions field removed** |
| Attitude toward wife working | Radio pill | Optional | |
| Guardian of wife's travel (mahram) | Radio pill | Optional | |
| Housing status | Radio pill | Optional | |
| Mahr offering capacity | Radio pill | Optional | *(ⓘ tooltip)* |

**Female-only** (shown if Part 1 gender = Female):
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Career plans after marriage | Radio pill | Optional | |
| Proposal contact preference | Radio pill | Yes | *(ⓘ tooltip)* |
| Mahr expectation | Radio pill | Optional | *(ⓘ tooltip)* |

**Shared:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Would you like to display Wali (वली / guardian) details on your profile? | Radio pill (Yes/No) | Optional | *(ⓘ tooltip)*. Independent of the Part 1 "Register as: Wali" flow — this is the candidate's own choice to surface guardian info on their profile |
| Wali's name | Text input | Conditional | Shows only if the toggle above = Yes |
| Wali's phone number | Text input | Conditional | Shows only if the toggle above = Yes. Kept verification-only unless the show-contact sub-toggle below is set to Yes |
| Wali's relationship to you | Radio pill | Conditional | Shows only if the toggle above = Yes. Father / Brother / Uncle / Appointed Wali / No wali available |
| Would you also like to show this contact number on your profile? | Radio pill (Yes/No) | Conditional | *(ⓘ tooltip)*. Shows only if the main toggle = Yes. Default expectation is No — the number stays internal for verification; Yes makes it visible to serious matches directly on the profile |
| Wedding type preference | Radio pill | Optional | Simple Nikah / Small reception / Large wedding |
| **Which functions/rituals would you like to have?** | Checkbox pill (multi) | Conditional | **Shows only if Wedding type = Large wedding.** Options: Mehndi, Haldi, Sangeet/music night, Nikah ceremony, Walima (reception), Baraat, Rukhsati, Joint family dinner |
| Islamic parenting style preference | Radio pill | Optional | |
| Husband-wife role vision | Radio pill | Optional | |
| Anything else about your deen | Textarea | Optional | |

## 6.6 Help Tooltips
25 fields across all three parts carry a small **(?)** button next to the label. Clicking it toggles an inline explanation box (blue-tinted) directly below the label; clicking elsewhere, or the button again, closes it. Only one tooltip is open at a time. Tooltip text is bilingual and switches instantly with the language toggle.

Fields with tooltips: Marital status, Divorce documentation, Disability, Sect, Convert/revert status, Madhhab, Salah frequency, Religiosity level, Hijab status, Wali involved, Who is conducting search, Native place, Preferred sect, Preferred Madhhab, Hijab preference, Wali involvement (partner), Aqeedah, Hifz, Islamic education level, Halal entertainment standards, Mixed gender interaction comfort, Nafaqah, Mahr (offering/expectation), Proposal contact preference, Wali relationship, Display Wali details toggle, Show Wali contact on profile toggle.

## 6.7 Conditional Logic Rules (current)
| Trigger | Effect |
|---------|--------|
| Marital = Divorced | Show "Do you have children?" and "Divorce documentation" (required) |
| Marital = Widowed | Show "Do you have children?" |
| Marital = Divorced/Widowed AND children = Yes | Show children details block (count, custody, free-text) |
| Disability = Yes | Show disability-type checklist |
| Gender = Female | Show Hijab status (Part 1); show Beard preference (Part 2, since preferred partner is male); show female-only fields (Part 3) |
| Gender = Male | Show Beard status (Part 1); show Hijab preference (Part 2, since preferred partner is female); show male-only fields (Part 3) |
| Gender changes (Part 1) | Part 2 "Preferred partner gender" is auto-set to the opposite and locked (disabled, cannot be changed) |
| Country = India | Show State dropdown + City autocomplete (populated from the selected state) |
| Sect / Preferred sect = Sunni or Shia | Show matching sub-sect dropdown |
| Wedding type = Large wedding | Show wedding rituals checklist |
| Height ft ↔ cm | Selecting either auto-fills the converted value in the other |

## 6.8 Form Progress Bar
Blended within fixed checkpoints — reflects real-time field completion inside the current part, mapped into that part's band, rather than jumping only at part transitions.

| Part | Band |
|------|------|
| Part 1 | 0% – 46% |
| Part 2 | 46% – 80% |
| Part 3 | 80% – 100% |
| Submitted | 100% |

> Note: this form-fill progress bar is distinct from the **profile completeness score** used for search visibility (see Section 12.3), which is calculated from filled sections rather than scroll position.

---

# 7. Privacy Architecture

### Female Profile Defaults
- Photos — **women choose** their own visibility:
  - Public (visible to all registered users)
  - Matches only (visible after mutual interest)
  - Hidden (no one can see)
- Phone number — hidden from non-premium men
- Email — hidden from non-premium men
- Last seen — hidden by default

### Male Profile Defaults
- Photos — visible to all registered users
- Phone number — visible to all
- Email — visible to all

### Contact Details Visibility

| Who is viewing | Women's phone/email | Men's phone/email |
|---------------|--------------------|--------------------|
| Non-premium man | ❌ Hidden | ✅ Visible |
| Premium man | ✅ Visible | ✅ Visible |
| Woman (free) | N/A | ✅ Always visible |

### Technical Privacy Measures
- Photos served via signed URLs (expire after set time)
- Screenshot prevention on mobile (Android FLAG_SECURE)
- Invisible watermarking on all profile photos
- Photo access audit log
- Data stored in India (PDPB readiness)
- Right to full data deletion within 30 days
- Zero third-party advertising trackers
- No social media data collected or shown

---

# 8. Matching & Search System

### Compatibility Score
- Every profile pair receives a compatibility score (0–100%)
- Score is **visible to users** as a percentage on each profile card
- Score calculated from: religious compatibility, life goals, family compatibility, lifestyle, demographics
- Score used internally for ranking search results

### Search Sorting Options
- By compatibility score (default)
- Recently joined
- Most active

### Search Filters
**Religious:** Sect, sub-sect, Madhhab, Salah frequency, Islamic education, Hijab/Niqab preference

**Personal:** Age range, Height range, Language, Country, Ethnicity/Mother tongue

**Marriage Expectations:** Children preference, Relocation willingness, Working after marriage, Nikah timeline

### Shortlist Feature
- Men can **save / shortlist** profiles privately before sending interest
- Shortlist is visible only to the man — never shown to the woman

### Interest / Proposal Flow
1. Man discovers profile via search
2. Reads full biodata
3. Sends interest
4. Woman receives notification
5. Woman accepts or declines
6. If accepted — messaging unlocked
7. Both greet with Assalamu Alaikum
8. Progress toward Nikah

### Interest Status Types

| Status | Icon | Description |
|--------|------|-------------|
| Pending | ⏳ | Sent — awaiting response |
| Accepted | ✅ | She accepted — chat unlocked |
| Declined | ✗ | Not the right match at this time |
| Expired | ⌛ | No response in 14 days — auto expired |
| Withdrawn | ↩️ | Man withdrew before response |

### Interest Rules
- Auto-expires after 14 days if no response
- Woman can accept or decline at any time before expiry
- Man can withdraw at any time before acceptance
- After decline — cannot re-send interest to same profile
- Decline message always reads: "Not the right match at this time" — never "Rejected"

---

# 9. Trust & Safety

### Risk Scoring
Each user receives a dynamic risk score (0–100).

| Score | Action |
|-------|--------|
| 0–30 | Normal access |
| 31–60 | Increased monitoring |
| 61–80 | Messaging restricted |
| 81–100 | Manual review required |

### Fake Profile Detection
- **AI-based:** Reverse image search + duplicate face detection
- **User reporting:** Report button on every profile page

### Report Reasons
- Fake profile
- Harassment
- Inappropriate message
- Romance scam
- Other

### Block System
- Blocked user is **completely invisible** to the person who blocked them
- Cannot view profile, cannot send interest, removed from all search results
- No notification sent to blocked user

### Risk Score Increases When
- New account + unusually high activity
- Multiple accounts from same device/IP
- Multiple user reports received
- Inconsistent profile information
- Financial information requests in messages
- Photo download attempts

### Risk Score Decreases When
- Selfie verified
- Long account standing (90+ days)
- Zero reports for 90+ days
- Profile completeness 80%+
- Positive interaction history

### Moderation Escalation

| Violation Level | First Offence | Second Offence | Third Offence |
|----------------|--------------|----------------|---------------|
| Minor | Warning notification | Formal warning | 24hr restriction |
| Moderate | Formal warning + restricted | 7-day suspension | Permanent ban |
| Serious (fraud/fake) | Immediate suspension | Permanent ban | N/A |
| Critical (threats/blackmail) | Immediate ban + law enforcement | N/A | N/A |

---

# 10. Islamic Knowledge & Guidance

### Islamic Knowledge Tab
A dedicated tab in both the website and mobile app containing:
- Islamic teachings on marriage
- Quranic verses about Nikah
- Authentic Hadith on choosing a spouse
- Rights of husband and wife in Islam
- Guidance on the marriage process
- Articles and content by Islamic scholars
- Istikhara guidance

### Categories and Content Types

| Category | Icon | Content types |
|----------|------|---------------|
| Marriage in Islam | 💒 | Articles, verses, Hadith about Nikah |
| Rights and Duties | ⚖️ | Husband rights, wife rights, mutual duties |
| Choosing a Spouse | 🤝 | What to look for, compatibility in Islam |
| Istikhara Guide | 🤲 | Step by step Istikhara guide, du'a text |
| Communication | 💬 | How to communicate Islamically with potential spouse |
| Family Life | 👨‍👩‍👧 | Islamic parenting, joint family, marriage roles |

### Features
- **Share button** on every piece of content — shares to WhatsApp, free marketing
- **Bookmark** — save any article or Hadith to read later
- **Ask a question** — users submit Islamic marriage questions, answered by scholar team weekly, name never shown
- **Daily verse** — new verse every day on this tab and home screen
- **Featured article** — changes every 3 days, admin scheduled, never repeats within 30 days

### Sharia Compliance Engine
The engine works as a **positive education tool — not a surveillance system.**

- Platform does **NOT track** user conversations, language, or messaging behaviour
- Islamic guidance is delivered as:
  - Daily / weekly push notifications
  - Content within the Islamic Knowledge Tab
  - Onboarding tips when user first joins
  - Gentle tips shown at key journey milestones (e.g. when interest is accepted)

### Guidance Content Types
- Relevant Quran verse
- Authentic Hadith
- Islamic etiquette guidance
- Suggestion to involve family / Wali
- Reminder of marriage intentions

### Admin Panel for Guidance Content
- Admin team can add, edit, schedule, and delete guidance content
- No code changes needed to update content
- Content tagged by category (verse, hadith, article, tip, du'a)
- Notifications scheduled by day/time
- All notifications are dismissable — never forced, never blocking

### Content Rotation Schedule

| Day | Content shown |
|-----|--------------|
| Every Friday | Special Jumu'ah reminder — longer verse or scholar quote |
| Saturday to Thursday | Rotating Hadith or Islamic marriage tip |
| First day of Ramadan | Special Ramadan message |
| Eid | Special Eid Mubarak message |

---

# 11. Admin & Moderation

### Admin Dashboard Features
- User management
- Selfie verification review queue
- Fraud / fake profile queue
- User reports queue
- Appeals queue
- Risk score monitoring
- Analytics (registrations, conversions, match outcomes, churn)
- Subscription management (including discount eligibility tracking)
- Islamic guidance content panel

### Scholar Dashboard (Phase 2)
- Review escalated cases
- Publish guidance content
- Moderate disputes

---

# 12. All App Screens

## 12.1 Welcome Screen

### When it appears
- After selfie verification is complete
- Every time user opens the app after being inactive for 30+ days

### Duration
- Shows for 3 seconds, fades automatically into Home Screen

### Content
- Platform logo (crescent moon icon)
- Warm Islamic welcome message: *"Bismillah. Welcome to Nikah Platform. May Allah make this journey easy and blessed for you."*
- Soft green background, white Arabic calligraphy watermark
- Nothing else — no buttons, no navigation

### Rules
- Never shows ads or promotions
- Message changes on Eid and first day of Ramadan (see Section 4)

---

## 12.2 Registration Flow Screens
See Section 4 for full detail (Landing Page → Quick Registration → OTP → Selfie → Welcome → Profile Nudge).

---

## 12.3 Home Screen

### What the Home Screen must feel like
Calm. Purposeful. Warm. Islamic. Nothing like a dating app. Every element reminds the user why they are here.

### Section 1 — Top Bar
| Element | Description |
|---------|-------------|
| ☪️ Logo | Platform logo and name — always visible |
| 🔔 Bell | Opens notifications screen. Green dot if unread. |
| 👤 Profile | Opens my profile and settings |

### Section 2 — Daily Islamic Reminder Card
- Rotates per the schedule in Section 10
- Share button opens WhatsApp share sheet with pre-written message
- Soft green background card, Arabic calligraphy watermark

### Section 3 — My Profile Card

**Profile completeness scoring (search visibility):**

| Section | Points |
|---------|--------|
| Personal details filled | 20% |
| Religious identity filled | 20% |
| About me written | 10% |
| Hobbies selected | 5% |
| Partner preferences filled | 25% |
| Religious preferences filled | 20% |

**Visibility rules based on completeness:**

| % Complete | Search visibility | Card message |
|-----------|------------------|-------------|
| 0 – 40% | Hidden | "Complete your profile to appear in search" |
| 41 – 59% | Hidden | "Almost there — complete 60% to appear in search" |
| 60 – 79% | Visible | "Improve your profile for better matches" |
| 80 – 100% | Fully visible | "Strong profile ✅" — no nudge shown |

**Trust tier badge colours:** Basic Verified = Grey · Trusted Verified = Green · Highly Verified = Gold

### Section 4 — Activity Row

| Icon | What it shows | Tapping opens |
|------|--------------|---------------|
| 👁️ Views | Women who viewed profile this week | Count by day — not names (free) |
| 💌 Interests | New interests received | Interests screen |
| ✉️ Messages | Unread messages | Chat list |
| 🔖 Saved | Profiles shortlisted | My shortlist |

Privacy rule: Free users see "12 sisters viewed your profile"; Premium users see the same plus "tap to see who".

### Section 5 — Nikah Journey Tracker

| Stage | Tip shown when current |
|-------|------------------------|
| Profile complete | "Your profile is ready. Begin your search with bismillah." |
| Search | "Take your time reading profiles. Send interest only when you feel genuinely compatible." |
| Interest sent | "Your interest has been sent. Make du'a and be patient." |
| Interest accepted | "Alhamdulillah — she accepted. Begin with Assalamu Alaikum." |
| Conversation | "Keep conversations purposeful. Focus on marriage expectations and values." |
| Nikah | "May Allah bless your union with love, mercy, and barakah. Ameen." |

When Nikah is marked: special full screen — "Masha'Allah. May Allah bless your Nikah." with option to share anonymous success story. Profile is archived.

### Section 6 — Suggested Matches

| Score | Badge |
|-------|-------|
| 90 – 100% | 🟢 Dark green — Excellent match |
| 75 – 89% | 🔵 Teal — Good match |
| 60 – 74% | 🟡 Amber — Moderate match |
| Below 60% | Not shown in suggestions |

- 🆕 New badge on profiles joined in last 48 hours
- Maximum 8 cards shown, updates every 24 hours
- Never shows already-interested, declined, or blocked profiles

### Section 7 — Islamic Knowledge Preview Card
Featured article rotates every 3 days, with Share and Bookmark options.

### Section 8 — Bottom Navigation

| Tab | Icon | Badge |
|-----|------|-------|
| Home | 🏠 | Never |
| Search | 🔍 | Never |
| Interests | 💌 | Green dot if new |
| Chat | 💬 | Green dot if unread |
| Islamic | ☪️ | Never |

### What is NOT on the Home Screen
Infinite scroll, "who liked you" for free, stories/reels, trending profiles, women's online status, advertisement banners, red notification badges.

---

## 12.4 Search Screen

### Filter Panel
- Age range, City, Sect, Sub-sect, Salah frequency, Hijab, Education, Madhhab, Nikah timeline

### Sort Options
| Option | Description |
|--------|-------------|
| Compatibility % | Highest match first (default) |
| Recently joined | Newest profiles first |
| Most active | Last active recently first |

### Profile Card Elements
Display name, age, city, compatibility % badge, "why compatible" one-liner, Madhhab, education, hijab/niqab, photo (if public), Send interest button, bookmark icon.

### Search Rules
- Profiles below 60% complete never appear in results
- Blocked users never appear
- Declined interests never appear again in results
- Maximum 20 results per page — pagination, not infinite scroll

---

## 12.5 Full Profile View Screen

### What is shown vs hidden

| Field | Free male | Premium male | Female |
|-------|-----------|-------------|--------|
| Display name | ✅ | ✅ | ✅ |
| Age and city | ✅ | ✅ | ✅ |
| Compatibility % | ✅ | ✅ | ✅ |
| Religious profile | ✅ | ✅ | ✅ |
| Marriage expectations | ✅ | ✅ | ✅ |
| Phone number | ❌ | ✅ | ✅ |
| Email | ❌ | ✅ | ✅ |
| Photo (Public) | ✅ | ✅ | ✅ |
| Photo (Matches only) | ❌ | ❌ | ✅ if match |
| Photo (Hidden) | ❌ | ❌ | ❌ |
| Who viewed her profile | ❌ | ❌ | ✅ |

### Report Button
Flag icon — Fake profile / Harassment / Inappropriate content / Romance scam / Other.

---

## 12.6 Interest Screen

### Tabs: Received / Sent

**Received card shows:** name, age, city, trust badge, compatibility %, profession, religious snapshot, optional note, expiry countdown, Accept/Decline buttons.

**Sent card shows:** name, age, city, compatibility %, status (Pending/Accepted/Declined/Expired/Withdrawn), relevant action button.

### Send Interest Confirmation Popup
- Confirmation question
- Optional note field, 150 character max
- Reminder: "Send interests sincerely — she will review your full profile before responding."
- "Send with Barakah ✅" / "Cancel"

---

## 12.7 Chat Screen

### Chat Rules

| Feature | Allowed | Reason |
|---------|---------|--------|
| Text messages | ✅ | Core communication |
| Voice notes | ❌ | Keeps communication dignified |
| Photo sharing | ❌ | Privacy protection |
| Video calls | ❌ | Phase 2 feature |
| File sharing | ❌ | Not needed for matrimony |
| Emojis | ✅ (limited) | Basic expressions only |
| Links | ❌ | Prevents off-platform movement |

### Suggested Topics (chips above input)
Family expectations · Islamic lifestyle · Nikah timeline · Children preferences · Living arrangements — each auto-fills a respectful, purposeful question.

### First Message Reminder
Shows only on the very first message in any conversation: "Keep conversations purposeful and Islamic" — dismissable, never repeats.

---

## 12.8 Islamic Knowledge Tab
See Section 10 for full category and feature detail. Screen includes: today's verse, category browser, featured article, this week's Hadith, Istikhara guide, "Ask a question" submission form.

---

## 12.9 Profile Settings Screen

### Sections
- Edit profile (links into each part of the form)
- Privacy settings — photo visibility (Public/Matches only/Hidden), who can see my profile, block list
- Account settings — phone/email change, notification preferences, language (EN/HI/UR), subscription status
- Islamic preferences — Wali involvement mode, proposal contact preference
- Support — help centre, report a problem, Islamic principles, privacy policy, terms of service
- Pause my profile / Delete my account

### Pause Profile Feature
- Profile disappears from search
- Existing conversations continue
- Subscription timer pauses too — no wasted subscription days
- Useful during travel, Ramadan, or breaks

---

## 12.10 Notifications Screen

### Notification Types

| Type | Icon | When triggered |
|------|------|---------------|
| New interest received | 💌 | Someone sends interest |
| Interest accepted | ✅ | Woman accepts interest |
| Interest declined | ✗ | Woman declines interest |
| Interest expired | ⌛ | 14 days with no response |
| New message | ✉️ | New message in conversation |
| Profile viewed | 👁️ | Weekly summary only — not per view |
| Islamic reminder | 📖 | Daily verse and Friday special |
| Profile incomplete | ⚠️ | Gentle nudge if below 60% |
| Profile hidden | 🔒 | When inactive 30 days |

### Notification Rules
- Never more than 3 notifications per day from platform
- No notification between 11pm and 7am (quiet hours)
- User can turn off any category in settings
- Weekly profile views summary — not individual per-view notifications

---

## 12.11 Premium Upgrade Screen

### Plans

| Plan | Price | Key features |
|------|-------|--------------|
| Silver | ₹499/month | 25 interests/mo, basic filters, messaging |
| Gold | ₹999/month | Unlimited interests, advanced filters, contact details, who viewed you, priority in search |
| Platinum | ₹1,999/month | All Gold + profile boost 2x, concierge assist, dedicated support, verified badge |

### Upgrade Prompt Rules (tasteful — not aggressive)
- Never shown more than once per session
- Never shown as a popup over chat
- Always has a "Not now" option
- Language never pushy or aggressive

### Discount Display
When a man qualifies for a subscription discount (see Section 15), the relevant plan card shows the discounted price with the original price struck through and a small badge explaining eligibility (e.g. "55% off — Age 55+").

---

## 12.12 Admin Panel Screens

### Admin Dashboard
Today's overview (registrations, selfies pending, reports pending, fraud alerts, active users, revenue), quick actions, full navigation to all admin sections.

### Islamic Content Manager
List view with filters by type (Verse/Hadith/Article/Tip), each entry showing category, schedule, status, Edit/Delete actions.

### Add Islamic Content Form
Content type selector, category, title, content in English and Hindi, source/reference, schedule (Daily/Friday only/Specific date), Save and publish / Save as draft.

---

# 13. Design System

### Colours

| Name | Hex | Used for |
|------|-----|---------|
| Primary green | #1a6e3c | Buttons, active states, badges |
| Light green | #f0f7f0 | Card backgrounds, highlights |
| Border green | #e8f0e9 | Card borders |
| Compatibility green | #15803d | 90%+ compatibility badge |
| Compatibility teal | #0d9488 | 75-89% compatibility badge |
| Compatibility amber | #d97706 | 60-74% compatibility badge |
| Text primary | #111827 | All main text |
| Text secondary | #6b7280 | Supporting text |
| Warning amber | #f59e0b | Profile incomplete warnings |
| Error red | #dc2626 | Validation errors only |
| White | #ffffff | Backgrounds |

### Typography

| Style | Size | Weight | Used for |
|-------|------|--------|---------|
| Heading large | 20px | 700 | Screen titles |
| Heading medium | 16px | 600 | Section titles |
| Body | 14px | 400 | All content |
| Body small | 13px | 400 | Supporting text |
| Caption | 12px | 400 | Labels, timestamps |
| Arabic text | 16px | 400 | Quran verses |

### Component Rules

| Component | Rule |
|-----------|------|
| Buttons | Always rounded corners. Primary = green. Secondary = white with green border. |
| Cards | White background. Light green border. 12px border radius. Soft shadow. |
| Badges | Rounded pill shape. Colour coded by type. |
| Input fields | Light grey border. Green border on focus. |
| Progress bars | Green fill. Grey track. Always shows % number. |
| Icons | Line icons — never filled unless active. |

### Navigation Rules
- Bottom navigation always visible on main screens, never on registration flow or full article reading screen
- Every screen has a back arrow ← in top left
- Notifications deep link directly to relevant screen

### Platform-wide Behaviour Rules

| Rule | Detail |
|------|--------|
| No tracking of conversations | Platform never reads or analyses chat content |
| No appearance-based ranking | Photos never affect search ranking |
| No infinite scroll | All lists are paginated — maximum 20 per page |
| No red badges | Green dots only — never aggressive red numbers |
| Quiet hours | No notifications between 11pm and 7am |
| Inactive profiles | Auto-hidden after 30 days of inactivity |
| Deleted accounts | Full data deletion within 30 days of request |
| Blocked users | Completely invisible — removed from all lists |
| Declined interests | Cannot re-send interest to same profile |
| Expired interests | Auto-expire after 14 days with no response |
| Rejection language | Always "Not the right match at this time" — never "Rejected" |
| Islamic greetings | Assalamu Alaikum used throughout the platform |

---

# 14. MVP Roadmap

### Phase 1 — MVP (Months 1–4)
- Quick registration (name + phone/email + gender)
- Selfie verification
- 3-part profile form with Save & Resume (English + Hindi)
- Basic search with filters
- Interest / proposal flow
- Messaging after mutual interest
- Photo privacy controls (women)
- Contact details gated by subscription (men)
- Basic trust score
- User reporting + block system
- Islamic Knowledge Tab (static content)
- Admin moderation panel (basic)
- Subscription discount logic (age, divorced, widowed)
- Web + iOS + Android

### Phase 2 — Growth (Months 5–10)
- Urdu language support
- Wali system (optional, advisory)
- AI-powered compatibility engine
- Structured communication stages
- Conversation starters / question templates
- NRI-specific features + NRI badge
- Divorced/Widowed dedicated experience
- Advanced fraud detection AI
- Scholar dashboard
- Admin Islamic guidance panel (dynamic)

### Phase 3 — Scale (Months 11–18)
- Video introductions
- Islamic counsellor marketplace
- Marriage counselling booking
- Success story programme
- Community imam endorsement system
- Multi-country expansion (UK, UAE, Malaysia)
- Advanced analytics

---

# 15. Monetisation & Subscription Discounts

### Pricing Model
- Women — free forever, regardless of any factor below
- Men — paid subscription required
- Contact details gated behind premium (see Section 7)

### Subscription Plans
See Section 12.11 for full plan breakdown (Silver / Gold / Platinum).

### Subscription Discounts — Men Only

| Discount category | Discount % | Source field used to determine eligibility |
|-------------------|-----------|----------------------------------------------|
| Age above 55 | 55% off | Date of birth (Form Part 1) |
| Divorced | 50% off | Marital status (Form Part 1) |
| Converted Muslim (revert) | 50% off | "Did you convert to Islam (revert)?" (Form Part 1, Religious Identity) |
| Widowed | 50% off | Marital status (Form Part 1) |

**Discount rules:**
- Discounts apply **only to men** — women's accounts are free regardless of these factors
- If a man qualifies for multiple discount categories at once, only the **highest single discount** applies — discounts do not stack
- Example: a 60-year-old divorced revert qualifies for 55%, 50%, and 50% — only 55% is applied

All four source fields are now captured by the form (the revert field was the last missing one — added in Form v1.2). No discount UI is shown anywhere in the form itself; this is a subscription/pricing-screen concern.

---

# 16. Key Success Metrics

### Trust
- % selfie verified users
- Fake profile detection rate (target < 0.5%)
- Risk incidents per 1,000 users

### Marriage Outcomes
- Proposal acceptance rate
- Messaging conversion rate
- Successful Nikah rate (self-reported)

### Engagement
- Profile completion rate (target 80%+)
- Response rate to interests
- Monthly retention rate

### Islamic Knowledge
- Islamic Knowledge Tab open rate
- Guidance notification open rate

### Platform Health
- Female : Male profile ratio (target ≥ 1:1.2)
- Premium conversion rate (men)
- Monthly churn rate (target < 8%)
- Discount redemption rate by category

---

# 17. Fields Never to Collect

Per the data model, these must never appear in the platform:

- Sexual history
- Exact home address
- Credit score or debt details
- Social media passwords or accounts
- Political party affiliation
- Forced medical test results
- Immigration status
- Prior criminal history as required field
- Photos of children
- Skin colour as a primary required field
- IQ or intelligence test results
- Menstrual or reproductive medical details

---

*Nikah Platform — Master Project Document v3.0*
*Single source of truth — combines Product Requirements, Complete Profile Form Specification, and Full Screens & Functionality Specification*
*Confidential — June 2026*
