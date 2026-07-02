# Claude Code Task — Nikah Platform Registration Flow

## Your job
Build the complete pre-wizard registration flow for the Nikah Platform — a Shariah-compliant Muslim matrimony web and mobile app. This flow sits at the very beginning of the user journey, before the quick-match wizard begins.

---

## Files you need to read first
Before writing a single line of code, read these files in full:
1. `nikah-platform-master-document.md` — the single source of truth for the entire platform
2. `quick-match-wizard-spec.md` — the wizard that immediately follows this registration flow
3. `FORM_SPEC.md` — the full 3-part profile form that comes later in the journey
4. `form.js` — existing form logic, components, and validation patterns to reuse

---

## The complete flow you are building

```
Screen 1 — Landing page
        ↓
Screen 2 — Enter phone number OR email
        ↓
Screen 3 — OTP verification (6 digits)
        ↓
Screen 4 — Enter name + select gender
        ↓
Screen 5 — Welcome screen (3 seconds, auto-advances)
        ↓
[Wizard begins — already specced in quick-match-wizard-spec.md]
```

---

## Screen 1 — Landing page

### Layout
```
┌─────────────────────────────┐
│                             │
│          ☪️                 │
│     Nikah Platform          │
│                             │
│  "Your Nikah begins         │
│   with sincerity"           │
│                             │
│  ─────────────────────      │
│                             │
│  ✅ Verified profiles       │
│  ✅ Privacy first           │
│  ✅ Islamic guidance        │
│                             │
│  ─────────────────────      │
│                             │
│  "Alhamdulillah we found    │
│   each other through        │
│   this platform"            │
│   — Anonymous couple,       │
│     Lucknow                 │
│                             │
│  ─────────────────────      │
│                             │
│  [ Get started → ]          │
│                             │
│  Already have an account?   │
│  Sign in                    │
│                             │
└─────────────────────────────┘
```

### Rules
- Single CTA button "Get started →" — no separate bride/groom buttons at this stage, gender is collected on Screen 4
- Success story rotates between 3 anonymous quotes (hardcode for now, will be CMS-managed later)
- "Sign in" link below the main CTA for returning users
- Platform logo is crescent moon ☪️ icon — no custom image required at this stage
- Background is white, primary colour is #1a6e3c (platform green)

---

## Screen 2 — Phone number or email

### Layout
```
┌─────────────────────────────┐
│ ←                           │
│                             │
│  Create your account        │
│                             │
│  Phone number               │
│  ┌─────────────────────┐    │
│  │ +91  98765 43210    │    │
│  └─────────────────────┘    │
│                             │
│  ─── or ───                 │
│                             │
│  Email address              │
│  ┌─────────────────────┐    │
│  │ your@email.com      │    │
│  └─────────────────────┘    │
│                             │
│  [ Continue → ]             │
│                             │
│  By continuing you agree    │
│  to our Privacy Policy      │
│  and Islamic Principles     │
│                             │
└─────────────────────────────┘
```

### Rules
- User must fill either phone OR email — not both required, but at least one
- Phone field has country code prefix — default to +91 (India), dropdown for other country codes
- Country code dropdown uses same country list as the full form (12 countries)
- Email field shown below phone with "or" divider — both always visible, not a toggle
- "Continue" button is disabled until at least one valid value is entered
- Phone validation: numeric only, minimum 10 digits after country code
- Email validation: standard email format
- If both are filled — store both, send OTP to phone (phone takes priority)
- If only email — send OTP to email
- Privacy Policy and Islamic Principles links are tappable — open in a bottom sheet or new tab (placeholder pages acceptable at this stage)
- Back arrow returns to landing page

---

## Screen 3 — OTP verification

### Layout
```
┌─────────────────────────────┐
│ ←                           │
│                             │
│  Verify your number         │
│                             │
│  We sent a 6-digit code to  │
│  +91 XXXXX 43210            │
│  (or "your@email.com")      │
│                             │
│  ┌──┐ ┌──┐ ┌──┐            │
│  │  │ │  │ │  │            │
│  └──┘ └──┘ └──┘            │
│  ┌──┐ ┌──┐ ┌──┐            │
│  │  │ │  │ │  │            │
│  └──┘ └──┘ └──┘            │
│                             │
│  Resend code in 45s         │
│                             │
│  [ Verify → ]               │
│                             │
│  Wrong number? Go back      │
│                             │
└─────────────────────────────┘
```

### Rules
- 6 individual digit input boxes — auto-advance to next box on each digit entry
- Auto-paste from clipboard (SMS OTP autofill on mobile)
- OTP expires in 10 minutes
- Maximum 3 wrong attempts before 30 minute lockout — show lockout message with countdown timer
- Resend available after 45 seconds — show countdown, then "Resend code" link appears
- "Verify" button activates only when all 6 digits are filled
- Auto-submits when 6th digit is entered — do not require manual tap of Verify button
- "Wrong number? Go back" returns to Screen 2 with the phone/email field pre-filled
- Show the destination clearly — phone number masked (+91 XXXXX 43210) or email address in full

---

## Screen 4 — Name and gender

### Layout
```
┌─────────────────────────────┐
│ ←                           │
│                             │
│  Almost there               │
│                             │
│  What should we call you?   │
│                             │
│  ┌─────────────────────┐    │
│  │ Your first name     │    │
│  └─────────────────────┘    │
│                             │
│  I am looking for a         │
│                             │
│  ┌──────────┐ ┌──────────┐  │
│  │          │ │          │  │
│  │  Bride   │ │  Groom   │  │
│  │ (I am a  │ │ (I am a  │  │
│  │  groom)  │ │  bride)  │  │
│  │          │ │          │  │
│  └──────────┘ └──────────┘  │
│                             │
│  [ Let's begin → ]          │
│                             │
└─────────────────────────────┘
```

### Rules
- Name field: first name only, text input, minimum 2 characters, maximum 30 characters
- Name is used for personalisation throughout the app ("Bismillah Ahmed!") — stored as display name, not legal name
- Gender selection: two large tap-friendly cards, not small pills — this is an important choice and the UI must reflect that weight
- Card labels read "I am a groom (looking for a bride)" and "I am a bride (looking for a groom)" — explicit framing removes any ambiguity
- Both name and gender are required — "Let's begin" button disabled until both are filled
- Selected gender card gets a green border (#1a6e3c) and a subtle green background tint (#f0f7f0) — unselected card stays white with grey border
- This gender value drives ALL conditional logic throughout the wizard and full form (hijab vs beard fields, partner gender lock in Part 2, male-only vs female-only fields in Part 3)
- Store gender in user record immediately on this screen — do not wait for form submission
- Back arrow returns to OTP screen — warn user that going back will require re-verification

---

## Screen 5 — Welcome screen

### Layout
```
┌─────────────────────────────┐
│                             │
│                             │
│                             │
│           ☪️                │
│                             │
│      Bismillah.             │
│      Welcome to             │
│      Nikah Platform,        │
│      [first name].          │
│                             │
│      May Allah make this    │
│      journey easy and       │
│      blessed for you.       │
│                             │
│                             │
│                             │
└─────────────────────────────┘
```

### Rules
- Auto-advances after exactly 3 seconds — no button, no tap required
- Shows user's first name inline in the welcome message
- Background is platform green (#1a6e3c), text is white — this is the only screen with a full green background
- Arabic calligraphy watermark behind the text (SVG, low opacity ~10%, decorative only)
- Crescent moon icon at top — same as platform logo
- On Eid: message changes to "Eid Mubarak [name]. May this celebration bring you closer to your Nikah."
- On first day of Ramadan: "Ramadan Mubarak [name]. May this blessed month bring you your righteous match."
- After 3 seconds, transitions directly into the first screen of the quick-match wizard (slide up transition, 300ms ease-out)
- No back navigation from this screen — registration is complete, user is now logged in

---

## Transitions between screens

| From | To | Transition |
|------|----|-----------|
| Screen 1 → 2 | Landing → Phone/email | Slide up (new screen from bottom), 280ms ease-out |
| Screen 2 → 3 | Phone/email → OTP | Slide left (horizontal), 280ms ease-out |
| Screen 3 → 4 | OTP → Name/gender | Slide left, 280ms ease-out |
| Screen 4 → 5 | Name/gender → Welcome | Fade only (not slide — this is a moment, not a step), 350ms ease-in-out |
| Screen 5 → Wizard | Welcome → Wizard Q1 | Slide up, 300ms ease-out |
| Any back navigation | — | Reverse of the forward direction |

Respect `prefers-reduced-motion` — replace all transitions with a 150ms cross-fade when set.

---

## Returning user — sign in flow

When a returning user taps "Sign in" on the landing page:

```
Enter phone number or email
        ↓
OTP verification (same Screen 3)
        ↓
Lands directly on Home screen
(skip name/gender — already stored)
(skip welcome screen — already seen)
(skip wizard — already completed)
```

### Rules
- No password ever — OTP is the only authentication method
- Session persists for 30 days — user should not need to re-verify unless they explicitly sign out or session expires
- If user completed the wizard previously, wizard answers are already stored — do not show wizard again

---

## Data stored after registration is complete

| Field | Value | Notes |
|-------|-------|-------|
| `user_id` | UUID | Generated at OTP verification |
| `phone` | String (hashed) | If provided |
| `email` | String (hashed) | If provided |
| `display_name` | String | From Screen 4 name field |
| `gender` | Enum (male/female) | From Screen 4 gender cards |
| `account_status` | `registered` | Becomes `active` after selfie at end of full form |
| `registration_completed_at` | Timestamp | Set when Screen 4 is submitted |
| `quick_match_preferences` | JSON object | Populated by wizard (next task) |
| `trust_score` | Integer, starts at 0 | Increases as verifications complete |
| `wizard_completed` | Boolean, starts false | Set to true after wizard is finished |

---

## Error states to handle

| Situation | Message shown |
|-----------|--------------|
| Phone number already registered | "This number already has an account. Sign in instead?" with sign-in link |
| Email already registered | "This email already has an account. Sign in instead?" with sign-in link |
| OTP wrong (attempts 1–2) | "Incorrect code. X attempts remaining." |
| OTP wrong (attempt 3) | "Too many attempts. Please wait 30 minutes before trying again." with countdown timer |
| OTP expired | "This code has expired. Tap to resend a new one." |
| Network error on any screen | "No connection. Check your internet and try again." with retry button |
| SMS not received after 45s | "Didn't receive it? Resend" link appears — tapping resends to same number |
| Name too short (under 2 chars) | "Please enter your name" — shown on tap of Let's begin |
| Gender not selected | "Please select who you are looking for" — shown on tap of Let's begin |

---

## Design tokens

| Token | Value |
|-------|-------|
| Primary green | #1a6e3c |
| Light green tint | #f0f7f0 |
| Border green | #e8f0e9 |
| Text primary | #111827 |
| Text secondary | #6b7280 |
| Error red | #dc2626 |
| White | #ffffff |
| Border radius — inputs | 8px |
| Border radius — cards | 12px |
| Border radius — buttons | 10px |
| Input height | 48px |
| OTP box size | 44×52px |
| Gender card height | 120px minimum |
| Font | -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif |

---

## What NOT to build in this task

- Do not build the quick-match wizard — separate task, see `quick-match-wizard-spec.md`
- Do not build the selfie verification screen — comes after the full profile form, not here
- Do not build the full 3-part profile form — already built in `form.js`
- Do not build social login (Google / Apple) — not in scope
- Do not add a password field anywhere — OTP only, no passwords ever
- Do not add email/phone verification badges — those are calculated later in the trust score system

---

## Acceptance criteria

- [ ] User can register with phone number only
- [ ] User can register with email only
- [ ] OTP is sent correctly to whichever contact method was provided
- [ ] OTP auto-submits on 6th digit entry without requiring manual button tap
- [ ] OTP auto-fills from clipboard on mobile
- [ ] Wrong OTP shows attempt count and locks account for 30 minutes after 3 failures
- [ ] Resend OTP available after 45 seconds with visible countdown
- [ ] Name field enforces 2–30 character limit
- [ ] Gender selection cards are visually unambiguous — selected state is obvious
- [ ] Both name and gender are required before "Let's begin" is enabled
- [ ] Welcome screen shows user's first name and auto-advances after exactly 3 seconds
- [ ] All 5 screens transition correctly per the transition table above
- [ ] Returning user sign-in bypasses name/gender and welcome screens entirely
- [ ] All error states display clear, non-technical messages
- [ ] `prefers-reduced-motion` is respected on all transitions
- [ ] Gender value is immediately stored and available to the wizard that follows
- [ ] Already-registered phone/email shows sign-in prompt, not an error
- [ ] Works correctly on mobile (iOS Safari, Android Chrome) and desktop (Chrome, Safari, Firefox)

---

*Nikah Platform — Registration Flow Implementation Spec v1.0*
*Claude Code build task — read `nikah-platform-master-document.md` and `quick-match-wizard-spec.md` alongside this file*
