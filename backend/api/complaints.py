from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import Complaint,EventLog
from database.schemas import ComplaintCreate,ComplaintUpdate,ComplaintOut
from services.ai_service import analyze,department_for
from datetime import datetime
router=APIRouter()
@router.post("",response_model=ComplaintOut)
def create(p:ComplaintCreate,db:Session=Depends(get_db)):
    if not p.description.strip() or not p.location.strip(): raise HTTPException(400,"Description and location are required")
    cat,pri=analyze(p.description)
    c=Complaint(user_id=p.user_id,description=p.description,location=p.location,category=cat,priority=pri,department=department_for(cat))
    db.add(c);db.commit();db.refresh(c)
    db.add(EventLog(user_id=p.user_id,complaint_id=c.id,event_type="complaint_created",details=f"{cat}/{pri}"));db.commit()
    return c
@router.get("",response_model=list[ComplaintOut])
def list_all(db:Session=Depends(get_db)): return db.query(Complaint).order_by(Complaint.id.desc()).all()
@router.get("/{id}",response_model=ComplaintOut)
def get_one(id:int,db:Session=Depends(get_db)):
    c=db.get(Complaint,id)
    if not c: raise HTTPException(404,"Complaint not found")
    return c
@router.put("/{id}",response_model=ComplaintOut)
def update(id:int,p:ComplaintUpdate,db:Session=Depends(get_db)):
    c=db.get(Complaint,id)
    if not c: raise HTTPException(404,"Complaint not found")
    for k,v in p.model_dump(exclude_none=True).items(): setattr(c,k,v)
    if c.status=="Resolved" and not c.resolved_at:
        c.resolved_at=datetime.utcnow();c.resolution_time_hours=(c.resolved_at-c.created_at).total_seconds()/3600
    db.commit();db.refresh(c);return c
@router.delete("/{id}")
def delete(id:int,db:Session=Depends(get_db)):
    c=db.get(Complaint,id)
    if not c: raise HTTPException(404,"Complaint not found")
    db.delete(c);db.commit();return {"message":"Complaint deleted"}
