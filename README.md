# GRAND LINE RUMBLE Website + Gameplay Runtime

Marketing web experience and deterministic gameplay runtime foundation for a manga-inspired platform fighter, built with Next.js App Router + TypeScript + Tailwind + Framer Motion.

## Setup
- `npm install`
- `npm run dev`
- `npm run lint`
- `npm run test`
- `npm run build`

## Architecture
- `app/` route-driven pages, runtime sandbox page, and API handlers
- `components/` reusable UI system (cards, modal, FAQ, form, media lightbox)
- `data/` typed seed JSON for fighters, stages, modes, roadmap, FAQ, media
- `lib/` metadata/utilities plus gameplay runtime engine in `lib/game`
- `tests/` Jest + RTL UI tests and gameplay runtime tests

## Gameplay Runtime Systems
`lib/game` now contains production-style simulation systems:
- Match phase machine: `countdown -> live -> sudden-death -> finished`
- Deterministic frame stepping (`stepMatchRuntime`) with per-frame player input
- Combat model: light/heavy/special/ultimate, hitstun, knockback scaling, combo tracking
- Stage hazards with periodic trigger windows
- Stocks + KO + respawn + blast-zone checks
- Crew assist and ultimate meter economy
- Runtime API simulation endpoint: `POST /api/runtime/simulate`
- Runtime UI sandbox: `/runtime`


## Play In Browser (Sandbox)
1. `npm install`
2. `npm run dev`
3. Open `http://localhost:3000/runtime`
4. Press **Start** and use controls:
   - Move: `A/D` or `←/→`
   - Jump: `W` / `↑` / `Space`
   - Light: `J`
   - Heavy: `K`
   - Special: `L`
   - Ultimate: `I`
   - Dodge: `Shift`

## Backend Integration TODOs
- Connect `app/api/playtest/route.ts` to CRM/email provider
- Add persistent runtime match store + authoritative server loop
- Add rollback netcode/session sync endpoint and replay logging

## Production notes
- Deploy to Vercel
- Add analytics (PostHog/Plausible)
- Integrate email provider + bot-safe rate limiting
