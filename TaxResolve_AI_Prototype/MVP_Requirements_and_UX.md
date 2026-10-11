# AI Tax Notice Resolution Assistant — MVP Requirements & UX

## Product definition
- **Product:** AI Tax Notice Resolution Assistant
- **Initial scope:** GST mismatch notices
- **Potential customer segments:** CA/tax firms and in-house corporate tax teams
- **Primary user:** Tax Manager / Senior Tax Professional
- **Core promise:** Turn a GST notice and supporting documents into an evidence-backed response draft for professional review.
- **Research caveat:** Three survey responses have been collected, all directional and from CA/tax-firm users. Findings should not be presented as representative research.

## MVP workflow
1. **Upload notice:** attach the notice or load the fictional sample case.
2. **Review notice analysis:** inspect extracted issue, taxpayer, period, amount, notice reference and illustrative deadline.
3. **Upload supporting evidence:** attach multiple supporting files or use the sample evidence bundle. This step is required before evidence analysis.
4. **Evidence and tax research:** review evidence statuses, unresolved gaps and links to potential official source material.
5. **Draft response and review:** edit a response draft, download it, review a checklist and mark the draft reviewed. No filing occurs.

## Functional requirements
- FR-01: Upload a notice and display the selected file.
- FR-02: Show notice facts and the alleged mismatch, with uncertainty noted.
- FR-03: Allow multiple supporting files to be uploaded and listed before analysis.
- FR-04: Evidence analysis must be initiated only after at least one supporting document is added.
- FR-05: Show evidence as matched, partially matched, review-needed, missing or conflicting; the production system must support traceability to source records.
- FR-06: Present relevant tax research sources with exact references and links where retrieved.
- FR-07: Generate an editable draft based on available evidence and supported sources.
- FR-08: Flag missing facts, unverified legal references and unresolved gaps.
- FR-09: Let a tax professional review and edit the draft; never submit automatically.
- FR-10: Provide useful error/empty states for missing files or unsupported formats.

## Acceptance criteria
- AC-01: With a supported notice, key notice fields appear for user review; unavailable fields are flagged rather than inferred.
- AC-02: The notice screen displays issue, tax period, amount and deadline when those details are available.
- AC-03: The user can upload multiple supporting documents and see successful file names.
- AC-04: Evidence analysis is unavailable until at least one evidence file has been added.
- AC-05: With no supporting evidence, the system does not claim to have verified the mismatch against records.
- AC-06: The findings screen distinguishes supporting, partial and unresolved evidence.
- AC-07: Each production legal claim must cite a retrieved authoritative source; unverified citations must be clearly flagged.
- AC-08: The draft is editable and downloadable, and includes unresolved-item reminders when needed.
- AC-09: Review status can be recorded, but no automatic filing or submission is available.
- AC-10: All demo figures, entities, documents and dates are marked fictional/illustrative.

## What the prototype implements vs simulates
- **Implemented in the UI:** navigation, notice file selection, sample case selection, multiple evidence file selection, sample evidence bundle, prerequisite gating, evidence status display, source-link display, editable draft, draft download, and demo review state.
- **Simulated:** notice extraction, document parsing, evidence matching/reconciliation, tax research retrieval/synthesis, amount-gap calculation and AI draft generation.
- **Not connected:** any LLM, live tax database, GST portal, ERP, customer data, or filing system.

## Product guardrails
- AI supports a tax professional; it does not replace legal judgement.
- Use synthetic data in the demo.
- Never present an illustrative finding as an actual computation from user-uploaded files.
- Ground legal research in versioned authoritative sources and exact citations before production use.
- Keep human review mandatory before any response is used or submitted.
