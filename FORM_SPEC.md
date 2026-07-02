# Nikah Platform — Profile Form Specification
**Version:** 1.4 | **Language Support:** English + Hindi | **Parts:** 3
**Files:** `index.html` (markup/structure), `form.js` (data, logic, validation)

> **Prototype note:** Required-field markers (`*`) are shown purely as a visual indicator of what a production version would enforce. No field is currently mandatory — clicking Next/Submit always proceeds regardless of what's filled in. Conditional show/hide behavior (e.g. Hijab/Beard, Divorce docs, Disability type, Wedding rituals, Sub-sect, State/City, Wali details, Children details) is unaffected and still works based on other answers. Save & Resume is implemented via browser `localStorage` rather than true server-side storage, since there is no backend/login in this prototype.

---
## Changelog from v1.3
- **Added:** "Not educated / No formal education" option to Education level (Part 1).
- **Changed:** State dropdown expanded from 17 to all **36 Indian states and union territories**, each with a matching city list for the city autocomplete.
- **Added:** Conditional "children details" block (Part 1) — shown when Marital status is Divorced or Widowed *and* "Do you have children?" = Yes. Asks: how many children, who they currently live with (With me / With their other parent / With other family / Shared arrangement), and a free-text box for anything else relevant to a future spouse.

## Changelog from v1.2
- **Added:** Optional "Would you like to display Wali (वली / guardian) details on your profile?" toggle (Part 3, Shared) — independent of the "Register as: Bride / Groom / Wali" flow in Part 1. If Yes: captures Wali's name, phone number, and relationship to the candidate. A further "show this contact number on your profile?" sub-toggle keeps the phone number verification-only by default, requiring explicit opt-in before it's shown publicly.

## Changelog from v1.1
- **Removed all blocking validation.** Part transitions and final submit no longer check required fields — this is a visual prototype, not a production form.
- **Added Save & Resume**, implemented via browser `localStorage` (this prototype has no backend/login — see note below).
- **Added:** "Did you convert to Islam (revert)?" field (Part 1, Religious Identity) — resolves the open item from the subscription discount rules, which need revert status to calculate the men's revert discount. Pure data capture; no discount UI is shown in the form itself.

## Changelog from v1.0
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

---
## Save & Resume

> **Prototype implementation note:** the production spec calls for server-side draft storage against the user's account. This prototype has no backend or login, so Save & Resume is implemented with **browser `localStorage`** instead — it persists per-browser, per-device, not across devices or accounts. This is the closest faithful simulation without real auth/storage infrastructure.

| Behaviour | Detail |
|-----------|--------|
| Save trigger | "💾 Save & continue later" button, visible above all 3 parts at all times. Click saves every field's current value, the active part, and the selected language to `localStorage` under key `nikahFormDraft`; shows a confirmation toast and a "Last saved: <time>" line |
| Resume | On reopening `index.html` in the same browser, the saved draft is detected automatically on load — all fields (including cascading ones like state→city, sect→sub-sect, and the locked partner-gender) are restored, conditional sections are re-shown correctly, and the form jumps straight to the part the user left off at, with a "Welcome back" toast |
| Clearing the draft | The saved draft is cleared automatically on successful submit, and on "Start over" |
| Visibility | A saved-but-incomplete profile does not appear in search (per the 60% completeness rule defined in the screens spec) — not enforced in this prototype since there is no search/matching surface here |

---
## Part 1 — About You

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
| Did you convert to Islam (revert)? | Radio pill (Yes/No) | Optional | *(ⓘ tooltip)*. Pure background data capture — also the field referenced by the subscription discount rules' revert-discount eligibility (see project-level section below) |
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

---
## Part 2 — Partner Sought

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

---
## Part 3 — Religious Preferences

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
| Wali name | Text input | Yes | |
| Wali relationship | Radio pill | Yes | *(ⓘ tooltip)* |

**Shared:**
| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Would you like to display Wali (वली / guardian) details on your profile? | Radio pill (Yes/No) | Optional | *(ⓘ tooltip)*. Independent of the Part 1 "Register as: Wali" flow — this is the candidate's own choice to surface guardian info on their profile |
| Wali's name | Text input | Conditional | Shows only if the toggle above = Yes |
| Wali's phone number | Text input | Conditional | Shows only if the toggle above = Yes. Kept verification-only unless the show-contact sub-toggle below is Yes |
| Wali's relationship to you | Radio pill | Conditional | Shows only if the toggle above = Yes. Father / Brother / Uncle / Appointed Wali / No wali available |
| Would you also like to show this contact number on your profile? | Radio pill (Yes/No) | Conditional | *(ⓘ tooltip)*. Shows only if the main toggle = Yes. Default expectation is No — number stays internal; Yes shows it on the public profile |
| Wedding type preference | Radio pill | Optional | Simple Nikah / Small reception / Large wedding |
| **Which functions/rituals would you like to have?** | Checkbox pill (multi) | Conditional | **Shows only if Wedding type = Large wedding.** Options: Mehndi, Haldi, Sangeet/music night, Nikah ceremony, Walima (reception), Baraat, Rukhsati, Joint family dinner |
| Islamic parenting style preference | Radio pill | Optional | |
| Husband-wife role vision | Radio pill | Optional | |
| Anything else about your deen | Textarea | Optional | |

---
## Help Tooltips
25 fields across all three parts carry a small **(?)** button next to the label. Clicking it toggles an inline explanation box (blue-tinted) directly below the label; clicking elsewhere, or the button again, closes it. Only one tooltip is open at a time. Tooltip text is bilingual and switches instantly with the language toggle.

Fields with tooltips: Marital status, Divorce documentation, Disability, Sect, Madhhab, Salah frequency, Religiosity level, Hijab status, Wali involved, Who is conducting search, Native place, Preferred sect, Preferred Madhhab, Hijab preference, Wali involvement (partner), Aqeedah, Hifz, Islamic education level, Halal entertainment standards, Mixed gender interaction comfort, Nafaqah, Mahr (offering/expectation), Proposal contact preference, Wali relationship.

---
## Conditional Logic Rules (current)
| Trigger | Effect |
|---------|--------|
| Marital = Divorced | Show "Do you have children?" and "Divorce documentation" (required) |
| Marital = Widowed | Show "Do you have children?" |
| Marital = Divorced/Widowed AND children = Yes | Show children details block (count, custody, free-text) |
| Register as = Wali | Show Wali registrant details (name, phone, relation, relationship) |
| Display Wali details toggle = Yes | Show Wali's name, phone, relationship, and the show-contact sub-toggle |
| Disability = Yes | Show disability-type checklist |
| Gender = Female | Show Hijab status (Part 1); show Beard preference (Part 2, since preferred partner is male); show female-only fields (Part 3) |
| Gender = Male | Show Beard status (Part 1); show Hijab preference (Part 2, since preferred partner is female); show male-only fields (Part 3) |
| Gender changes (Part 1) | Part 2 "Preferred partner gender" is auto-set to the opposite and locked (disabled, cannot be changed) |
| Country = India | Show State dropdown + City autocomplete (populated from the selected state) |
| Sect / Preferred sect = Sunni or Shia | Show matching sub-sect dropdown |
| Wedding type = Large wedding | Show wedding rituals checklist |
| Height ft ↔ cm | Selecting either auto-fills the converted value in the other |

---
## Progress Bar
Blended within fixed checkpoints — reflects real-time field completion inside the current part, mapped into that part's band, rather than jumping only at part transitions.
| Part | Band |
|------|------|
| Part 1 | 0% – 46% |
| Part 2 | 46% – 80% |
| Part 3 | 80% – 100% |
| Submitted | 100% |

---
## Fields Never Collected
Unchanged from v1.0 — sexual history, exact home address, credit score/debt, social media credentials, political affiliation, forced medical/immigration disclosures, criminal history as required, photos of children, skin colour as a required field, IQ results, menstrual/reproductive medical details.

---
## Related: Subscription Discount Rules
*(Defined at the project level, not inside the form itself — documented here for cross-reference since divorce, age, and revert status are captured by this form.)*

Discounts apply **only to men** — women's accounts are free regardless of these factors.

| Discount category | Discount % | Source field used to determine eligibility |
|-------------------|-----------|----------------------------------------------|
| Age above 55 | 55% off | Date of birth (Part 1) |
| Divorced | 50% off | Marital status (Part 1) |
| Converted Muslim (revert) | 50% off | "Did you convert to Islam (revert)?" (Part 1, Religious Identity) |
| Widowed | 50% off | Marital status (Part 1) |

- If a man qualifies for multiple discount categories at once, only the **highest single discount** applies — discounts do not stack.
- All four source fields are now captured by the form as of v1.2 (the revert field was the missing one — added this version). No discount UI is shown anywhere in the form itself; this is a subscription/pricing-screen concern, out of scope here.

---
*Nikah Platform Profile Form Spec v1.4 — reflects the current state of `index.html` / `form.js`.*
