# Energy Mix Frontend

React + TypeScript app that visualises the energy generation mix for Great Britain and helps find the optimal EV charging window.

## Live

- **App:** https://energy-frontend-zawz.onrender.com
- **Backend – Energy Mix:** https://energy-backend-8wur.onrender.com/api/energy-mix
- **Backend – Optimal Window (3h):** https://energy-backend-8wur.onrender.com/api/optimal-window?hours=3

> First request may take up to 60 seconds (free Render instance).

## Tech Stack

- React 19, TypeScript, Vite, Recharts

## Features

- Three pie charts showing daily energy mix for today, tomorrow and the day after
- Clean energy percentage indicator per day
- Optimal EV charging window calculator (1–6 hours)

## Run Locally

```bash
git clone https://github.com/stelczyk/energy-frontend
cd energy-frontend
npm install
npm run dev
```

> Backend is deployed at https://energy-backend-8wur.onrender.com — no additional configuration needed.