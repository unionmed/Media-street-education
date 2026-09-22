# Merit Way design system

## Character

A bold learning-and-media studio. Midnight blue, luminous lime and generous editorial typography express curiosity and forward movement. Original SVG geometry gives the site a visual identity without stock photography or a heavy animation framework. Supplied team portraits provide the human counterpoint.

## Tokens

- Midnight `#101c26`: hero, navigation and footer.
- Ink `#14232d`: primary text.
- Lime `#d3ef92`: dark-surface accents and the contact section.
- Paper `#f8f9f5`: reading canvas.
- Mist `#edf1e9`: secondary surfaces.
- Muted `#526268`: secondary text on light surfaces.
- Green `#3d6339`: accessible accent text on light surfaces.
- Lilac `#d5c8f0`: decorative contrast.
- Locally bundled Instrument Serif, DM Sans and Noto Sans Arabic.

## Composition

The landing page moves from an immersive split hero to an illustrated pathway triptych, a staggered team portrait composition, selected learning, a dark academic section, an illustrated journal and an oversized lime invitation. Programme visuals use a category-specific geometric system. Shared internal page heroes have orbital contour backgrounds. Articles retain a quiet reading column and a contents rail.

`globals.css` contains the foundational layout and page components. `redesign.css` owns the studio visual treatment and its responsive overrides. Keep new visual rules there; reuse the shared tokens rather than introducing one-off colour values in components.

## Motion

The hero uses a small CSS/SVG orbital scene with a three-way pathway selector, fine-pointer parallax and an explicit pause control. Continuous motion is purely decorative. Entrance effects are brief and run once per observed element. Hover treatments reinforce links and visual hierarchy. No scroll hijacking, autoplay audio/video, cursor replacement or required animation delays.

Respect `prefers-reduced-motion`, including changes during a session. Content remains server rendered and usable without JavaScript. Do not make content visibility depend on successful observer initialization. Keep visible focus rings, labelled controls and at least 44px primary interaction targets.

## Bilingual behaviour

Each language has its own HTML `lang` and `dir`. Use logical layout properties. Isolate Latin programme titles, provider names and email addresses. Arabic headlines use independently tuned line heights and no artificial italic. Language switching preserves the current page identity. Test at 320px, typical phone sizes and desktop widths.
