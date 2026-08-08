from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from database.database import get_db
from services.statistics_service import overview,frequencies,resolution_stats
router=APIRouter()
@router.get("/overview")
def get_overview(db:Session=Depends(get_db)): return overview(db)
@router.get("/frequencies")
def get_frequencies(db:Session=Depends(get_db)): return frequencies(db)
@router.get("/resolution-time")
def get_resolution(db:Session=Depends(get_db)): return resolution_stats(db)
