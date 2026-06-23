**Findings**
- No actionable P0/P1/P2 mismatches remain.

**Source Visual Truth**
- Figma file: `SOabVL5SHyW0zWnS0SE0I0`
- Primary nodes checked: `149:5534` theme button, `149:5577` device detail card, `149:5762` defect table, `149:5436` sidebar navigation, plus the user-provided laptop screenshot for target interaction placement.
- Key dark-mode tokens from Figma: card `#1e293b`, primary text `#f3f4f6`, secondary text `#cbd5e1`, muted text `#94a3b8`, link/action blue `#7db0ff`, success `#4ade80`, warning `#fbbf24`, danger `#f87171`.

**Implementation Evidence**
- URL: `http://localhost:5173/cases/device-health-management-platform`
- State: case page `PC后台` tab, embedded PC preview iframe, theme button clicked to dark mode.
- Browser checks passed:
  - iframe `.pc-preview-page` class becomes `pc-preview-page is-dark`.
  - theme button accessible label switches to `切换到浅色模式`.
  - Figma sidebar expanded items include `润滑项管理`, `润滑计划`, `润滑工单`.
  - brand logo remains an unfiltered image while utility icons adapt to the dark surface.

**Required Fidelity Surfaces**
- Theme button: implemented as the Figma `32 x 32` rounded `8px` icon button and wired to real theme state.
- Dark surface system: sidebar/topbar/main background, cards, date filter, dropdown, table header, rows, chart grid, and text hierarchy follow the Figma dark palette.
- Device card: card background, image dark overlay, title, detail labels, values, and running pill match the Figma dark component values.
- Defect table: header background, `42px` row rhythm, row borders, right-aligned dates, and status pills match the dark table node.
- Navigation: sidebar keeps the dashboard group and adds the Figma lubrication child group in the expanded state.

**Patches Made**
- Added `isDarkMode` state and `toggleTheme()` in `DeviceHealthPcPreview.vue`.
- Wired the top theme icon button with pressed state and dynamic accessible labels.
- Added dark-mode SCSS overrides for the PC preview shell, cards, navigation, table, chart, status pills, dropdown, and utility icons.
- Added the Figma sidebar lubrication children while keeping existing app routing and case shell behavior intact.

**Implementation Checklist**
- `npm run build` passed twice after the changes.
- In-app browser verification passed after reload, PC tab switch, and iframe theme-button click.
- Final visual screenshot reviewed in the case-page laptop mockup.

**Follow-up Polish**
- P3: a strict pixel overlay could be created later if the short-lived Figma screenshots are downloaded into a persistent comparison artifact.

final result: passed
