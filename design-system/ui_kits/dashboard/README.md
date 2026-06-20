# Operator Dashboard — UI Kit

The SupaPark web dashboard operators use to run their facilities — watch live revenue, occupancy, lanes and sessions, and manage the sales→deployment pipeline (Leads → Projects). **Dark, dense, data-rich** — "Vercel meets Bloomberg." EN / ID toggle, desktop + mobile.

- **`index.html`** — the full clickable app. Sidebar nav routes between pages; table rows open detail pages; the floating **Desktop / Mobile** pill (bottom-right) switches layouts.

### Screens
| Page | File | Notes |
|---|---|---|
| **Shell** | `Shell.jsx` | 240px sidebar (logo, location selector, nav w/ amber active rail, language toggle). Mobile: phone frame, top bar, 5-item bottom nav, full-nav sheet. |
| **Overview** | `Overview.jsx` | 4 stat cards · 7-day revenue area chart · occupancy donut (car vs moto) · recent-sessions table · alert. |
| **Leads** + **Lead Detail** | `Leads.jsx` | CRM list (stats, search + status/source filters, empty state) → detail (contact + facility cards, map, notes, status/convert/delete actions). |
| **Projects** + **Project Detail** | `Projects.jsx` | Deployment list → detail with the 5-stage **pipeline bar** (planning → procurement → installation → testing → live). |
| Sessions / Revenue / Members / Plate Rules / Devices / Settings | `Shell.jsx` (Stub) | Secondary nav destinations — present in the shell, module-preview placeholder. |

### Shared kit — `ui.jsx` (`window.SPUI`)
`Icon` (Lucide) · `StatCard` · `StatusPill` (CRM taxonomy) · `PageHeader` · `SearchInput`/`Select`/`FilterBar` · `Panel` · `Table`/`THRow`/`TD` · `EmptyState` · `MapPanel` (stylized **dark** map + amber pin — no light OSM tiles) · `Pipeline` · `RevenueChart` · `OccupancyGauge` · `rupiah()` helpers. Demo data in `data.js` (`window.SP_DATA`).

### Taxonomy colors
Lead status — new `#3B82F6` · contacted `#F5A623` · qualified `#22C55E` · converted `#A855F7` · lost `#EF4444`.
Project status — planning `#3B82F6` · procurement `#F5A623` · installation `#F97316` · testing `#A855F7` · live `#22C55E`.
These are **category** colors for data, distinct from brand amber (which still means action/authority on CTAs and the active nav rail).

Composes the design-system primitives (`Logo`, `StatusBadge`, `PlateDisplay`, `Card`…) from `window.SupaParkDesignSystem_80b640` + Lucide. Recreated from the real `aldoradiputra/parkir` `dashboard/` Next.js app — tokens lifted from its `tailwind.config.ts`.
