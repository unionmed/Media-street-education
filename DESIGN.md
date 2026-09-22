# Merit Way design system

## Character

Calm, precise, editorial. A professional learning and media studio with an academic sensibility. Team credentials and useful content carry trust. Keep the interface direct and the layout generous.

## Tokens

- Paper `#f7f5f0`: page canvas.
- White `#ffffff`: elevated reading surfaces.
- Ink `#182b2a`: headings, navigation, dark sections.
- Muted `#596661`: secondary copy on light backgrounds.
- Gold `#b59552`: decorative lines and small highlights; use darker `#795c25` for text on paper.
- Border `#dcded5`: dividers and input outlines.
- Display: locally bundled Instrument Serif, normal weight.
- Body/UI: locally bundled DM Sans variable.
- Arabic: locally bundled Noto Sans Arabic variable; no artificial letter spacing.

## Composition

Maximum content width 1280px. Section spacing 64–112px, 40–64px on mobile. Large displays use `clamp`; reading measure approximately 65 characters. Hero uses a 7/5 split with a typographic statement and an editorial index of the three main routes. Team follows near the top. Programme catalogue uses two columns on desktop with consistent category, title, provider, summary and action positions. Article pages have a quiet reading column and a compact contents rail.

## Interaction

Primary buttons use ink with white text. Hover and press change colour and translate by at most 2px. Visible focus rings, labelled controls and minimum 44px touch targets are required. No looping decorative animation. Respect reduced motion. Mobile navigation expands in normal document flow, reports its state and closes with Escape or route selection.

## Bilingual behaviour

Each language has its own HTML `lang` and `dir`. Layout uses logical padding, margin and text alignment. Latin programme titles and email addresses are isolated with LTR direction. The language switch keeps the page identity. Arabic line height and headline size are tuned independently.
