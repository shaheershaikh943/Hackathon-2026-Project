from sqlalchemy import Column,Integer,String,Text,DateTime,ForeignKey,Float
from datetime import datetime
from .database import Base
class User(Base):
    __tablename__="users"
    id=Column(Integer,primary_key=True); name=Column(String(100),nullable=False)
    email=Column(String(150),unique=True,nullable=False); password_hash=Column(String(255),nullable=False)
    role=Column(String(30),default="citizen"); created_at=Column(DateTime,default=datetime.utcnow)
class Complaint(Base):
    __tablename__="complaints"
    id=Column(Integer,primary_key=True); user_id=Column(Integer,ForeignKey("users.id"))
    description=Column(Text,nullable=False); category=Column(String(50),nullable=False)
    priority=Column(String(30),nullable=False); location=Column(String(200),nullable=False)
    status=Column(String(30),default="Open"); department=Column(String(100),nullable=False)
    created_at=Column(DateTime,default=datetime.utcnow); resolved_at=Column(DateTime)
    resolution_time_hours=Column(Float)
class EventLog(Base):
    __tablename__="event_log"
    id=Column(Integer,primary_key=True); user_id=Column(Integer,ForeignKey("users.id"))
    complaint_id=Column(Integer,ForeignKey("complaints.id")); event_type=Column(String(60),nullable=False)
    details=Column(Text); timestamp=Column(DateTime,default=datetime.utcnow)
