# Nikah Platform — AI Agent Behavioral Guidelines

> **How to use this file:** this is a *supplementary* behavioral layer, not a replacement for `CLAUDE.md` or any other repo file. If a `CLAUDE.md` already exists, append this content under a `## Behavioral Guidelines` heading rather than overwriting anything. It is tool-agnostic — the same rules work as Cursor Rules (`.cursorrules`) or Windsurf instructions with no changes needed.
>
> **What this file is not:** a foolproof contract. An AI agent reading this can still occasionally slide back into its default behavior over a long session. Treat this as something that shifts the *overall distribution* of its behavior toward correct, not a guarantee of any single output.

---

## 1. The Three Failure Modes This File Exists to Prevent

Left to its own defaults, an AI coding agent on this project will tend toward:

1. **Silent Assumption** — interpreting a loose spec on its own and sprinting forward blindly. On this project specifically, that's dangerous: a "reasonable-sounding" guess about who can approve a conversation, or which contact info gets disclosed to whom, is exactly the kind of decision that's already been gotten wrong twice in this project's history (the original entity mislabeling; the Guardian/Wali authority model taking five rounds of clarification to get right). Guessing here isn't a style problem, it's a religious-compliance and privacy problem.
2. **Overcomplexity** — introducing unwanted abstractions, class wrappers, or heavy boilerplate where a plain, direct implementation would do.
3. **Scope Creep** — reformatting neighboring functions, switching code patterns, or "improving" unrelated code while doing an assigned task.

## 2. The Three Rules That Prevent Them

### 2.1 Explicit Alignment
**When a spec has more than one reasonable interpretation, stop and ask — don't pick one silently.**

This project has hard-won precedent for what happens when this rule is skipped: the original architecture draft mislabeled an entity, and the Guardian/Wali authority model went through five separate rounds of "wait, that's not quite what I meant" before landing correctly (display-only vs. Proxy control, promotion vs. swap, the messaging-routing exception when a Wali's login is down). Every one of those was a case where a plausible-sounding guess would have been *wrong* in a way that wasn't obvious until traced through a real example.

**Concretely, halt and ask before proceeding on any of these:**
- Anything touching who can approve/reject a conversation, or whose contact info gets disclosed.
- Anything touching the discount/pricing calculation (gender, age, marital status, revert status).
- Anything touching what data is collected, stored, or exposed — check the **Fields Never Collected** list (Section 4) first.
- Anything where a field name, endpoint shape, or business rule in the code doesn't match the Architecture Design Document or OpenAPI spec (Section 5) — the docs are the source of truth; if the code and docs disagree, that's a stop-and-ask, not a "code wins" or "docs win" silent assumption either way.

### 2.2 Senior Engineering Guard
**Output should read like it was written by a senior engineer optimizing for the next person's ability to understand it in six months — not the most clever solution, the clearest one.**

- No new abstraction layer, wrapper class, or design pattern unless the task at hand genuinely needs it *today* — not "might need it later."
- Match the existing patterns in the file/module you're editing before introducing a new one.
- If a function is doing one clear thing, keep it one function. Don't split for the sake of splitting.
- Business logic (Wali-approval branching, contact disclosure, gateway selection, discount calculation) stays in the Next.js API layer — never in Supabase RLS policies or Edge Functions (ADR-010). This is a standing architectural constraint, not a per-task judgment call.

### 2.3 Perfect Diffs
**A diff should touch exactly the files and lines the task requires — nothing incidentally reformatted, renamed, or reorganized along the way.**

- If you notice an unrelated problem while working, mention it in your response — don't fix it in the same diff.
- Don't reformat a file's existing style to match your preference on the way through.
- A reviewer should be able to look at the diff and immediately see it does one thing.

## 3. Goal-Driven Execution — How to Turn a Task Into Instructions

Don't give the agent a vague imperative. Give it a **verifiable goal**: a concrete pass/fail condition it can check its own work against.

| Instead of (vague imperative) | Give it (verifiable goal) |
|---|---|
| "Add the Wali approval endpoint" | "Write tests for: Proxy Wali approves → messaging unblocks + contact disclosed; display-only Wali attempts approval → rejected 403; revoked approval → new messages blocked, history preserved. Then implement until all pass." |
| "Fix the discount calculation" | "Build a reproducing test case with a divorced, 58-year-old, revert male profile (three eligible discounts at once) asserting only the single highest applies. Make it pass." |
| "Clean up the Conversation module" | "Verify all existing tests pass before and after, with zero changes to the public API (`/conversations/*` request/response shapes unchanged)." |
| "Add the 15-day inactivity job" | "Write a test asserting an account that logged in exactly 15 days ago is NOT yet deactivated, and one 16 days ago IS. Make both pass before considering this done." |

This pattern applies to every task on this project, not just the examples above — if you're about to hand the agent an imperative with no way to check its own work, rewrite it as a goal with a pass condition first.

## 4. Nikah-Platform-Specific Non-Negotiables

These aren't style preferences — violating them reopens problems this project has already spent significant effort resolving.

- **Server-side authority, always.** Every check of who can approve, disclose, or message is enforced in the Next.js API layer against the database (`Wali.ControlLevel`, `Wali.IsActive`, `User.Role`), never inferred from a client-supplied flag, which screen a request came from, or a hidden/unlinked route. A path like `/admin` is a routing convenience, not a security boundary (ADR-011) — every request under it still checks `User.Role = Admin` server-side.
- **Fields Never Collected:** sexual history, exact home address, credit score/debt, social media credentials, political affiliation, forced medical/immigration disclosures, unwarranted criminal history, photos of children, mandatory skin colour, IQ results, menstrual/reproductive medical details. No entity should ever grow a column for any of these without a deliberate, separately-reviewed product decision — never as a side effect of an unrelated task.
- **Naming:** use "Wali," not "Guardian," in all new code, comments, and identifiers — the whole codebase was swept to this terminology deliberately; don't reintroduce the old name.
- **Contact disclosure is an audited event.** Any code path that reveals a phone number to another user must write a `ContactDisclosure` row recording who/why/when — never a silent field exposure.
- **Payments:** gateway and final charge amount are always computed server-side (`Profile.Country` decides Razorpay vs. Stripe) — never trust a client-supplied amount or gateway choice. Webhook signatures (`X-Razorpay-Signature` / `Stripe-Signature`) are verified on every call, no exceptions.
- **Supabase is infrastructure, not a second logic layer.** Auth, Storage, and Realtime are self-hosted Supabase services (ADR-009); Row-Level Security is used only as defense-in-depth for Realtime/Storage access, never as the primary place a business rule is decided (ADR-010).

## 5. Source of Truth — Where to Look Before Guessing

If a spec question comes up, check these, in order, before asking the human:

1. **`Nikah_Platform_Complete_Design_Document.pdf`** (v1.4) — Sections 1–16 + Appendices. This is the authoritative reference for every business rule, ADR, and the full screen-flow walkthrough (Appendix E).
2. **`Nikah_Platform_OpenAPI_v0.6.yaml`** — the exact endpoint contracts; field names here must match the code exactly, no silent renaming.
3. **The `.puml` diagram scripts** — Class, Sequence, Container, Deployment, Use Case — for a visual gut-check when a relationship or flow seems ambiguous from prose alone.

If the question still isn't answered by these, that's a genuine Explicit Alignment moment (Section 2.1) — stop and ask, don't guess.

## 6. Stack Reference

For quick orientation — full rationale for each choice is in the ADRs (Design Document Section 14), not repeated here:

| Layer | Choice |
|---|---|
| Frontend | React, served by Next.js (sole Phase 1 client — native apps deferred, ADR-002) |
| Backend | Next.js API routes, modular monolith |
| Database | Supabase Postgres (self-hosted) |
| Auth | Supabase Auth (GoTrue), phone-OTP |
| Realtime | Supabase Realtime, RLS-gated |
| Storage | Supabase Storage, signed-URL access only |
| Cache | Redis (cache only, not pub/sub) |
| Payments | Razorpay (India) / Stripe (international), server-selected |
| Hosting | Self-hosted VPS, Docker Compose (ADR-005) |
| ORM | Prisma or Drizzle |
| Testing | Jest + React Testing Library, Playwright (E2E), Vitest/Supertest (API), k6 (load) |
