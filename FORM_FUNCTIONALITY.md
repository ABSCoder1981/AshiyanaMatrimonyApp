# Nikah Platform — Profile Form Functionality

## Overview

The profile form is a **3-part bilingual (EN/HI) form** implemented across two files:
- `index.html` — structure and CSS
- `form.js` — all logic, data, and rendering

---

## Structure

### 3 Parts

| Part | Title | Progress Band |
|------|-------|---------------|
| 1 | About You | 0% → 46% |
| 2 | Partner Sought | 46% → 80% |
| 3 | Religious Preferences | 80% → 100% |

Navigation: **Next / Back** buttons between parts. Part 1 → Part 2 is blocked until full name validation passes. Parts 2 and 3 are never blocked (prototype behaviour).

---

## Part 1 — About You

### Sections & Fields

**Personal Details**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full name | Text input | Yes | Requires at least 2 words (first + last name), minimum 4 characters total. Validated on "Next" click; error clears live as user types. |
| Register as | Radio pills | Yes | Bride / Groom / Wali — shows Wali detail fields if Wali selected |
| Wali name | Text input | Yes (if Wali) | Hidden unless Register as = Wali |
| Wali phone | Text input | Yes (if Wali) | Hidden unless Register as = Wali |
| Wali relation | Text input | Yes (if Wali) | Hidden unless Register as = Wali |
| Wali relationship | Radio pills | Yes (if Wali) | Options: Father / Brother / Uncle / Appointed / None |
| Date of birth | 3 dropdowns (Day/Month/Year) | Yes | Age range enforced: 18–70 |
| Gender | Radio pills | Yes | Male / Female — drives conditional fields throughout form |
| Marital status | Radio pills | Yes | Never / Divorced / Widowed — shows children & divorce doc fields |
| Do you have children? | Radio pills | Yes (if Divorced/Widowed) | |
| Children count | Radio pills | Optional | Shown if children = Yes |
| Children custody | Radio pills | Optional | Shown if children = Yes |
| Children details | Textarea | Optional | Shown if children = Yes |
| Divorce certificate | Radio pills | Yes (if Divorced) | |
| Height | 2 dropdowns (ft/cm) | Optional | Auto-synced: changing ft updates cm and vice versa |
| Physical disability | Radio pills | Optional | Shows disability type checkboxes if Yes |
| Disability type | Checkboxes | Optional | Shown if disability = Yes |

**Religious Identity**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Sect | Radio pills | Yes | Sunni / Shia / Just Muslim / Prefer not to say |
| Sub-sect | Dropdown | Optional | Shown only if Sect = Sunni or Shia; populated dynamically |
| Revert to Islam | Radio pills | Optional | |
| Madhhab | Radio pills | Optional | Hanafi / Maliki / Shafi'i / Hanbali / No preference |
| Salah frequency | Radio pills | Yes | |
| My religiosity level | Level grid (1–5) | Optional | |
| Hijab status | Radio pills | Yes (if female) | Hidden for males |
| Beard status | Radio pills | Yes (if male) | Hidden for females |

**Career & Education**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Profession | Autocomplete text | Optional | Searches from 45 professions list |
| Monthly income | Dropdown | Optional | |
| Education level | Dropdown | Yes | |

**Location**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Country of residence | Dropdown | Yes | 12 countries |
| State | Dropdown | Yes (if India) | Shown only when Country = India |
| City | Autocomplete text | Yes (if India) | City list filtered by selected State |
| Native place | Text input + Nominatim autocomplete | Optional | Searches OpenStreetMap (Nominatim API) for any place worldwide. Debounced 350ms, triggers after 3 characters. Returns up to 6 results. |

**Background**

| Field | Type | Required |
|-------|------|----------|
| Mother tongue / Ethnicity | Radio pills | Optional |
| Languages spoken | Checkboxes | Optional |
| Hobbies & interests | Checkboxes | Optional |
| Role model / idol | Text input | Optional |

**Marriage Intentions**

| Field | Type | Required |
|-------|------|----------|
| When to marry | Radio pills | Yes |
| Open to relocation | Radio pills | Optional |
| Want children | Radio pills | Optional |
| Family structure | Radio pills | Optional |
| Is a Wali involved | Radio pills | Optional |
| Who is conducting this search | Radio pills | Yes |
| About me | Textarea | Optional |

---

## Part 2 — Partner Sought

### Sections & Fields

**Basic Preferences**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Preferred partner gender | Radio pills | Yes | Auto-locked to opposite of user's gender from Part 1 |
| Partner age range | Min/Max number inputs | Yes | Range 18–70 |
| Preferred height range | Min/Max dropdowns | Optional | Both in feet |
| Preferred sect | Radio pills | Yes | |
| Preferred sub-sect | Dropdown | Optional | Shown if Preferred sect = Sunni or Shia |
| Preferred Madhhab | Radio pills | Optional | |
| Preferred Salah frequency | Radio pills | Optional | |
| Preferred religiosity level | Level grid (1–5) | Optional | |
| Hijab preference | Radio pills | Optional | Shown only if partner gender = Female |
| Beard preference | Radio pills | Optional | Shown only if partner gender = Male |

**History & Background**

| Field | Type | Required |
|-------|------|----------|
| Preferred marital status | Radio pills | Optional |
| Acceptable if partner has children | Radio pills | Optional |

**Career & Education**

| Field | Type | Required |
|-------|------|----------|
| Preferred profession | Autocomplete text | Optional |
| Employment preference | Radio pills | Optional |
| Preferred education level | Dropdown | Optional |

**Location & Living**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Preferred region | Country dropdown + city text | Yes | "Open to any region" checkbox hides selects |
| Should partner relocate | Radio pills | Optional | |
| Living arrangement after marriage | Radio pills | Yes | |

**Future Plans**

| Field | Type | Required |
|-------|------|----------|
| Children preference | Radio pills | Optional |
| Preferred Nikah timeline | Radio pills | Optional |
| Mother tongue preference | Radio pills | Optional |
| Wali involvement expected from partner | Radio pills | Optional |
| Any other expectations | Textarea | Optional |

---

## Part 3 — Religious Preferences

### Section A — Practice & Beliefs

| Field | Type | Required |
|-------|------|----------|
| Quran memorisation (Hifz) | Radio pills | Optional |
| Quran reading habit | Radio pills | Optional |
| Islamic education level | Radio pills | Optional |
| Islamic lifestyle goals | Checkboxes | Optional |
| Interested in studying Islam further | Radio pills | Optional |

### Section B — Lifestyle & Boundaries

| Field | Type | Required |
|-------|------|----------|
| Halal diet adherence | Radio pills | Optional |
| Fasting habit | Radio pills | Optional |
| Zakat / Sadaqah practice | Radio pills | Optional |
| Smoking status | Radio pills | Yes |
| Alcohol consumption | Radio pills | Yes |
| Halal entertainment standards | Radio pills | Optional |
| Mixed-gender interaction comfort | Radio pills | Optional |
| Music / Nasheed views | Radio pills | Optional |

### Section C — Marriage Expectations (Male-only fields)

Shown only when user's gender = Male.

| Field | Type | Required |
|-------|------|----------|
| Financial readiness for Nikah (Nafaqah) | Radio pills | Yes |
| Attitude toward wife working | Radio pills | Optional |
| Guardian of wife's travel (mahram) | Radio pills | Optional |
| Housing status | Radio pills | Optional |
| Mahr offering capacity | Radio pills | Optional |

### Section C — Marriage Expectations (Female-only fields)

Shown only when user's gender = Female.

| Field | Type | Required |
|-------|------|----------|
| Career plans after marriage | Radio pills | Optional |
| Proposal contact preference | Radio pills | Yes |
| Mahr expectation | Radio pills | Optional |

### Section C — Shared

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Display Wali details on profile | Radio pills | Optional | Shows Wali display sub-fields if Yes |
| Wali's name (display) | Text input | Optional | Shown if above = Yes |
| Wali's phone (display) | Text input | Optional | Shown if above = Yes |
| Wali's relationship (display) | Radio pills | Optional | Shown if above = Yes |
| Show contact number on profile | Radio pills | Optional | Shown if above = Yes |
| Wedding type preference | Radio pills | Optional | Shows ritual checkboxes if Large wedding selected |
| Wedding rituals | Checkboxes | Optional | Shown if Wedding type = Large wedding |
| Islamic parenting style | Radio pills | Optional | |
| Anything else about your deen | Textarea | Optional | |

---

## Conditional Logic

| Trigger | Effect |
|---------|--------|
| Marital status = Divorced or Widowed | Shows "Do you have children?" field |
| Marital status = Divorced | Shows "Divorce certificate" field |
| Children = Yes | Shows children count, custody, and details fields |
| Disability = Yes | Shows disability type checkboxes |
| Gender = Female | Shows Hijab field; hides Beard field |
| Gender = Male | Shows Beard field; hides Hijab field |
| Gender = Male | Shows male-only fields in Part 3 (Nafaqah, etc.) |
| Gender = Female | Shows female-only fields in Part 3 (Proposal contact, etc.) |
| Gender selected | Auto-locks Partner gender to opposite in Part 2 |
| Register as = Wali | Shows Wali detail fields (name, phone, relation) |
| Sect = Sunni or Shia | Shows sub-sect dropdown (populated dynamically) |
| Preferred sect = Sunni or Shia | Shows preferred sub-sect dropdown |
| Country = India | Shows State and City fields |
| State selected | Populates city autocomplete list |
| Partner gender = Female | Shows Hijab preference field in Part 2 |
| Partner gender = Male | Shows Beard preference field in Part 2 |
| Preferred region "any" checkbox | Hides country/city selects |
| Wedding type = Large wedding | Shows wedding rituals checkboxes |
| Wali display toggle = Yes | Shows Wali display sub-fields |

---

## Religiosity Level Grid

Used in both Part 1 (self) and Part 2 (partner preference). Renders a 5-column grid instead of stars or pills.

| Level | Label (EN) | Label (HI) | Description (EN) |
|-------|-----------|-----------|-----------------|
| 1 | Cultural | सांस्कृतिक | Muslim by heritage; not currently practicing |
| 2 | Occasional | कभी-कभी | Prays & fasts sometimes; working on consistency |
| 3 | Moderate | मध्यम | Regular prayers & halal diet; open to flexibility |
| 4 | Practicing | पाबंद | 5 daily prayers; Islamic values guide daily life |
| 5 | Highly observant | अत्यधिक पाबंद | Islam is central to every aspect of life |

---

## Language (EN / HI)

- Toggle button in the header switches between English and Hindi
- All labels, tips, options, and placeholders switch instantly
- Hindi uses spoken Urdu-Hindi (not formal/Sanskritized)
- No Hindi script appears in the English mode
- Language choice is saved with the draft and restored on resume

### Key i18n mechanism

- `[data-t="key"]` elements: text replaced from the `T` dictionary
- `[data-t-ph="key"]` elements: placeholder replaced from the `T` dictionary
- `[data-en][data-hi]` elements (pill labels, option labels): text replaced directly
- `.reli-desc[data-en]` elements (level grid descriptions): updated separately in `applyLanguage()`

---

## Progress Bar

- Sticky header-area bar showing 0–100%
- Band-based: Part 1 fills 0–46%, Part 2 fills 46–80%, Part 3 fills 80–100%
- Within each part, progress is blended based on how many visible fields are filled
- Updates live on every change/input event

---

## Save & Resume

- "Save & continue later" button saves entire form state to `localStorage` key `nikahFormDraft`
- Saved data: all text inputs, radio selections, checkbox selections, current part, and language
- On page load, `restoreDraft()` reads the draft and restores all values
- `reapplyConditionalVisibility()` re-runs all conditional show/hide logic after restoring
- Toast notification shown on save and on resume
- Draft is cleared on form submit or "Start over"

---

## Autocomplete Fields

### Profession autocomplete (`makeProfessionAutocomplete`)
Two fields share the same implementation:
- **Profession** (own) — `f-profession`
- **Preferred profession** (partner) — `f-pprofession`

Behaviour: type to filter from 45 professions, click or keyboard-navigate to select, blur closes dropdown.

### City autocomplete (`setupCityAutocomplete`)
Filters a local list of cities populated by the selected State (India only). Triggers on focus and every keystroke.

### Native place autocomplete (`setupNativePlaceAutocomplete`)
Field: `f-nativeplace`. Uses the free **OpenStreetMap Nominatim API** — no API key required.
- Triggers after 3 characters typed, debounced 350ms to avoid excessive requests
- Fetches up to 6 results from `nominatim.openstreetmap.org/search`
- Results are full display names (e.g. "Lucknow, Uttar Pradesh, India")
- Supports any place worldwide — villages, cities, districts, countries
- Keyboard navigation (↑ ↓ Enter Escape) and click selection both work
- Stale responses discarded: only renders if the input still matches the query that triggered the fetch

---

## Height Sync

User's own height has two dropdowns (feet and cm) that stay in sync:
- Changing feet → cm updates automatically
- Changing cm → feet updates automatically
- Range: 4'0" (48in / 140cm) to 6'3"+ (76in / 196cm+)

Partner height preference uses feet-only range selects (min/max).

---

## Submit & Summary

On submit:
1. Progress bar set to 100%
2. Form card hidden; done card shown
3. Summary grid built showing key fields from all 3 parts
4. Draft cleared from localStorage

Summary rows (switchable EN/HI): Name, Register as, DOB/Age, Gender, Marital status, Sect, Profession, Education, Country, Partner gender, Partner age range, Preferred sect, Living arrangement, Smoking, Alcohol.

"Start over" button clears draft and reloads the page.

---

## Tooltip / Info System

Each field that has a `?` button shows a tooltip box below the label on click. Clicking elsewhere or clicking another `?` closes the open tooltip. All tooltip content is bilingual via the `T` dictionary.

---

## Key Data Structures

### `T` — UI string dictionary
All static labels, placeholders, error messages, and tooltip text. Each key holds `{en, hi}`.

### `O` — Option sets
All radio/checkbox/dropdown option arrays. Each item holds `{v, en, hi}`. Key sets:

`gender`, `marital`, `yesNo`, `sect`, `psect`, `madhhab`, `pmadhhab`, `salah`, `psalah`, `hijab`, `phijab`, `beard`, `pbeard`, `income`, `education`, `peducation`, `country`, `states`, `motherTongue`, `pmotherTongue`, `languagesSpoken`, `timeline`, `ptimeline`, `relocation`, `prelocate`, `wantChildren`, `familyStructure`, `whoSearching`, `pmarital`, `pchildren`, `pemployment`, `livingArrangement`, `pwantchildren`, `pwali`, `hifz`, `quranReading`, `islamicEducation`, `lifestyleGoals`, `studyIslam`, `halalDiet`, `fasting`, `zakat`, `smoking`, `alcohol`, `halalEntertainment`, `mixedGender`, `music`, `nafaqah`, `wifeWorking`, `mahram`, `housing`, `mahrCapacity`, `careerAfter`, `proposalContact`, `waliRelationship`, `weddingType`, `parentingStyle`, `roleVision`, `hobbies`, `weddingRituals`, `disabilityTypes`, `registerAs`, `childrenCount`, `childrenCustody`

### `SUBSECTS`
Sub-sect options keyed by parent sect: `SUBSECTS.sunni` (8 options), `SUBSECTS.shia` (8 options).

### `RELI_SCALE`
5 items, each `{v, en, hi, enDesc, hiDesc}` — used to render level grid for both self and partner religiosity.

### `PROFESSIONS`
Array of 45 `{en, hi}` objects for profession autocomplete.

### `CITIES_BY_STATE`
Object keyed by state code (e.g. `MH`, `UP`) with arrays of city name strings. Used for city autocomplete when Country = India.

---

---

# Quick-Match Wizard

## Overview

The wizard (`quick-match-wizard.html`) is a **self-contained single-file** UI that sits between registration and the full profile form. It collects 7 lightweight preference questions before showing mock match results. Everything — HTML, CSS, and JS — lives in one file.

**User journey position:**
```
registration.html  →  quick-match-wizard.html  →  index.html (full form)
```

---

## Screens

### 1 — Question card
The main wizard card. Shows one question at a time with progress dots, Back/Next buttons, and skip options.

### 2 — Loading card
Shown after the last question or "Find matches". Displays a progress bar animating over 1.5 seconds with the text "Bismillah — finding your matches...".

### 3 — Results card
Shows 3 mock match cards. Has two CTAs: "Complete my full profile →" (goes to `index.html`) and "Skip — just browse for now".

---

## The 7 Questions

| # | Question | Input type | Answer key |
|---|----------|------------|------------|
| 1 | Where are you looking for a match? | Country dropdown + State dropdown + City text (India only) | `country`, `state`, `city` |
| 2 | What age range are you looking for? | Min / Max number inputs | `ageMin`, `ageMax` |
| 3 | Which sect matters to you? | Pill buttons | `sect` |
| 4 | How regularly should they pray? | Pill buttons | `salah` |
| 5 | How religious would you like them to be overall? | Religiosity level grid (1–5) | `religiosity` |
| 6 | Any preference on marital history? | Pill buttons | `maritalPref` |
| 7 | How soon are they looking to marry? | Pill buttons | `timeline` |

All questions are skippable — no answer is required to advance.

---

## Question Options

**Q3 — Sect**

| Value | EN | HI |
|-------|----|----|
| noPref | No preference | कोई प्राथमिकता नहीं |
| sunni | Sunni | सुन्नी |
| shia | Shia | शिया |
| justMuslim | Just Muslim | सिर्फ़ मुस्लिम |

**Q4 — Salah frequency**

| Value | EN | HI |
|-------|----|----|
| noPref | No preference | कोई प्राथमिकता नहीं |
| 5x | 5× daily | दिन में 5 बार |
| mostly | Mostly regular | अधिकतर नियमित |
| anyPracticing | Any practicing level | कोई भी पाबंद स्तर |

**Q5 — Religiosity level grid** (same as profile form)

| Level | EN | HI | Description |
|-------|----|----|-------------|
| 1 | Cultural | सांस्कृतिक | Muslim by heritage; not currently practicing |
| 2 | Occasional | कभी-कभी | Prays & fasts sometimes; working on consistency |
| 3 | Moderate | मध्यम | Regular prayers & halal diet; open to flexibility |
| 4 | Practicing | पाबंद | 5 daily prayers; Islamic values guide daily life |
| 5 | Highly observant | अत्यधिक पाबंद | Islam is central to every aspect of life |

**Q6 — Marital history preference**

| Value | EN | HI |
|-------|----|----|
| noPref | No preference | कोई प्राथमिकता नहीं |
| neverOnly | Never married only | केवल अविवाहित |
| divorcedOk | Open to divorced | तलाकशुदा के लिए खुला |
| widowedOk | Open to widowed | विधवा/विधुर के लिए खुला |

**Q7 — Timeline**

| Value | EN | HI |
|-------|----|----|
| noPref | No preference | कोई प्राथमिकता नहीं |
| asap | ASAP | जल्द से जल्द |
| 6mo | Within 6 months | 6 महीनों के भीतर |
| 1yr | Within a year | एक साल के भीतर |

---

## Navigation & Transitions

- **Back button**: hidden on Q1, visible on Q2–Q7. Slides question in from the right.
- **Next button**: labelled "Next →" on Q1–Q6, changes to "Find matches →" on Q7.
- **Skip (per question)**: "Skip — not sure yet" link below Next button. Advances without saving an answer.
- **Skip entire wizard**: "Skip and browse" link shown only on Q1. Calls `finishWizard()` immediately.

Transition animation: slide left (forward) / slide right (back), 280ms ease-out. Falls back to 150ms opacity fade when `prefers-reduced-motion` is set.

---

## Progress Dots

7 dots shown in the header bar:
- Completed questions → filled green (`--green-m`)
- Current question → active green pill shape (`--green`, wider)
- Upcoming → grey

---

## Answers Object

All 10 answer fields stored in a single `ANSWERS` object:

```js
{
  country: '',    // e.g. 'IN'
  state: '',      // e.g. 'UP' (India only)
  city: '',       // free text (India only)
  ageMin: '',     // number string
  ageMax: '',     // number string
  sect: '',       // 'noPref' | 'sunni' | 'shia' | 'justMuslim'
  salah: '',      // 'noPref' | '5x' | 'mostly' | 'anyPracticing'
  religiosity: '',// '1'–'5'
  maritalPref: '',// 'noPref' | 'neverOnly' | 'divorcedOk' | 'widowedOk'
  timeline: ''    // 'noPref' | 'asap' | '6mo' | '1yr'
}
```

Saved to `localStorage` key `quick_match_preferences` (JSON) when wizard finishes.

---

## Location Fields (Q1)

- Country dropdown: 12 countries (same list as full form)
- State dropdown and City text input shown **only when Country = India**
- State dropdown: 30 Indian states/UTs
- City: free-text field (no autocomplete in the wizard — simpler than the full form)

---

## Results Screen

Shows 3 hardcoded mock profiles (will be replaced with real API data):

| Name | Meta | Detail |
|------|------|--------|
| Aisha M. | 24 · Delhi | Hanafi · Masters · Hijab |
| Sara K. | 26 · Lucknow | Hanafi · Bachelor · Hijab |
| Zara A. | 23 · Mumbai | Shafi'i · Bachelor · Niqab |

Each card shows name, age/city, a "🔵 Good match" badge, and a detail line.

A toggle link switches between the normal results view and an **empty state** view ("We're still growing in your area...") — used for testing/preview purposes.

---

## Language Switching

Same EN/HI toggle as the full form. Switching language re-renders the current question in place. Works on all three screens (question, loading, results).

---

## Key Data Structures (Wizard)

### `T` — UI string dictionary
Holds all bilingual strings: question text, button labels, loading text, results headers. Each key: `{en, hi}`.

### `RELI_SCALE`
Same 5-item array as the profile form: `{v, en, hi, enDesc, hiDesc}`.

### `QUESTIONS`
Array of 7 objects, each with:
- `render(container)` — function that builds the question UI into the given container
- `answered()` — function that returns `true` if the user has given an answer (used to determine Next button label only; never blocks navigation)

### `ANSWERS`
Single flat object holding all 10 answer values. Mutated directly as the user interacts.
