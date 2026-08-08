from fastapi import APIRouter,Depends,HTTPException
from sqlalchemy.orm import Session
from database.database import get_db
from database.models import User,EventLog
from database.schemas import RegisterRequest,LoginRequest
import hashlib
router=APIRouter()
def hp(x): return hashlib.sha256(x.encode()).hexdigest()
@router.post("/register")
def register(p:RegisterRequest,db:Session=Depends(get_db)):
    if db.query(User).filter(User.email==p.email).first(): raise HTTPException(409,"Email already registered")
    u=User(name=p.name,email=p.email,password_hash=hp(p.password),role=p.role);db.add(u);db.commit();db.refresh(u)
    return {"id":u.id,"name":u.name,"email":u.email,"role":u.role}
@router.post("/login")
def login(p:LoginRequest,db:Session=Depends(get_db)):
    u=db.query(User).filter(User.email==p.email).first()
    if not u or u.password_hash!=hp(p.password): raise HTTPException(401,"Invalid credentials")
    db.add(EventLog(user_id=u.id,event_type="login",details="User login"));db.commit()
    return {"id":u.id,"name":u.name,"email":u.email,"role":u.role}
