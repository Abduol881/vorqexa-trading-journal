# Brand system

## Positioning
Vorqexa Journal is a focused, serious trading review workspace: precise, calm, analytical and useful during post-trade review. It belongs to the Vorqexa ecosystem but must remain understandable and usable as a standalone product.

## Visual direction
- Restrained monochrome base: near-black, charcoal, neutral gray and white.
- Green/red are semantic positive/negative financial states; amber is for warnings; neutral blue/gray for secondary data.
- Prioritize readable data tables, aligned tabular numerals, consistent chart scales and clear labels.
- Prefer subtle borders and surface differences over heavy gradients, glowing effects or decorative crypto imagery.
- Use a clean sans-serif for interface text and tabular numerals for price, quantity, percentages and P&L.
- Support keyboard focus, sufficient contrast, responsive layouts and reduced motion.

## Logo and assets
Keep approved assets under `apps/web/public/brand/`: primary wordmark, symbol, monochrome variants, favicon and social preview. Do not ship a temporary mark as the final logo; use a text wordmark fallback until assets are approved.

## Design tokens
Centralize color, spacing, radius, typography, border and semantic status tokens in the global token stylesheet. Feature components consume tokens instead of introducing one-off colors.

## Voice
Direct, calm and specific. Prefer “Last sync: 10:42 UTC” and “3 rows need review” over vague promotional language. Never imply journal analytics predict future performance.
