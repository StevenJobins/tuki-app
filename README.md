# Tuki Family App 2.0

A premium React + TypeScript companion app for **Tuki Learning Tower** families. Built with love in Switzerland.

## Features

- **Rezepte** — Age-filtered recipes with step-by-step instructions and Tuki-Tips
- **Montessori-Aktivitäten** — Learning activities by development area (Motorik, Sensorik, Kreativität, Sprache, Mathe, Natur)
- **Entwicklungs-Tracker** — Milestone tracking from 12 months to 5 years
- **Community** — Parent feed with tips, photos, and the Tuki Family Club
- **Tuki-Sterne** — Gamification: Kids earn stars and level up from "Kleiner Entdecker" to "Küchenchef"
- **Saisonale Inhalte** — Season-aware recipes and activities
- **PWA** — Installable, offline-capable, mobile-first

## Brand Identity

- **Font:** Rubik (Light, Regular, Medium, SemiBold)
- **Tuki Rot:** `#8F5652` / `#7A3E3A`
- **Tuki Mint:** `#AADBD7` / `#A0D1CA`
- **Secondary:** Blau `#5E6578`, Orange `#E18B63`

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3
- Framer Motion
- React Router 6
- PWA (Service Worker)

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run build
```

Deployed automatically to GitHub Pages via `.github/workflows/deploy.yml`.

## Project Structure

```
src/
├── components/     # Reusable UI components
├── context/        # App state (favorites, stars, progress)
├── data/           # Recipes, activities, milestones
├── hooks/          # Custom React hooks
├── pages/          # Route pages
└── assets/         # Static assets
```

---

**Tuki** — Auf Augenhöhe. Made by mimodo AG, Switzerland.
