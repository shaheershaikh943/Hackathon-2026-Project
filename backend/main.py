from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.database import Base, engine
from api.complaints import router as complaints_router
from api.analytics import router as analytics_router
from api.auth import router as auth_router

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Smart Civic Services API", version="1.0.0")
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"],
                   allow_credentials=True, allow_methods=["*"], allow_headers=["*"])
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(complaints_router, prefix="/api/complaints", tags=["Complaints"])
app.include_router(analytics_router, prefix="/api/analytics", tags=["Analytics"])

@app.get("/")
def root(): return {"message": "AI Smart Civic Services API is running"}

@app.get("/health")
def health(): return {"status": "ok"}
