# CivicAI UI — Polished v7

## Updates
- Redesigned dropdowns with readable labels, larger menus, scrolling, active-state checkmarks, keyboard Escape handling, and disabled dependent location states.
- Added Province → City → Area location flow.
- Added a prominent Resolution Time Statistical Summary with median hero metric and Mean, Median, Mode, Variance, Standard Deviation, Q1, Q3, IQR and Upper Fence.
- Added animated/interactive complaint intake with progress steps, character counter, quick-start field examples, live AI guidance, readiness state, and field-aware illustrations.
- Added civic-service visuals for water, waste, roads, public lighting, and city services using lightweight inline SVG artwork.
- Added field-specific gradients and responsive/dark-mode styling.

## Run
```powershell
cd frontend
npm.cmd install
npm.cmd run dev
```

Open `http://localhost:5173`.

Keep FastAPI running separately:
```powershell
cd backend
venv\Scripts\activate
python -m uvicorn main:app --reload
```
