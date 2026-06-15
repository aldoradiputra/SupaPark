---
name: supapark-design
description: Use this skill to generate well-branded interfaces and assets for SupaPark — Indonesia's affordable, ticketless, offline-first smart parking system — either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components (booth kiosk + operator dashboard) for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (`tokens/`, `components/core/`, `ui_kits/booth/`, `ui_kits/dashboard/`, `ui_kits/onboarding/`, `ui_kits/pwa/`, `guidelines/`, `assets/`).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and create static HTML files for the user to view. If working on production code, you can copy assets and read the rules here to become an expert in designing with this brand.

Key things to internalize before designing:
- **Two contexts, two palettes.** The **booth kiosk** is pure-black ultra-contrast (#000000 / #FFFFFF / #00FF88 / #FF3333), Bahasa-only, ≥80px taps. The **dashboard** is soft dark (#0A0A0A → #111 → #1A1A1A surfaces), EN/ID. Never mix them.
- **Amber #F5A623 is the only brand color** and means action/authority — never decorative.
- **Plus Jakarta Sans** for UI, **JetBrains Mono** for plates/money. Plates are always mono + amber + tracked.
- **Voice:** professional, direct, operational. No exclamation marks on status. No emoji in product UI. Icons are **Lucide**.
- **Hard rules:** no gradients on surfaces, no corners > 12px, no serif fonts, no white backgrounds (except a QR), no spinners.

If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
