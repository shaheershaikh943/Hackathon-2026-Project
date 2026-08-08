# CivicAI — Polished UI v5

This frontend upgrade adds a more interactive civic-service experience while preserving the existing FastAPI integration.

## Included

- Cascading Province → City → Area location dropdowns
- Persistent selected service area using browser localStorage
- Animated KPI counters and dashboard cards
- Animated category bars and donut-style demand visualization
- Civic-service illustrations for city, water, waste and roads
- Floating CivicAI help assistant
- Situation/urgency/quick-response guidance for common civic problems
- Complaint filters and detail modal
- Dark/light mode
- Responsive layout
- Demo civic cases for presentations

## Run

```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:5173`.

Keep the FastAPI service running separately on `http://localhost:8000`.

## AI note

The existing FastAPI complaint workflow uses the project's trained TF-IDF + Logistic Regression CivicAI model for category and priority prediction. The floating UI assistant provides immediate user-help guidance and a fallback situation assessment when the user is exploring a problem before submitting it.
