from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional
class ComplaintCreate(BaseModel):
    description:str; location:str; user_id:Optional[int]=None
class ComplaintUpdate(BaseModel):
    status:Optional[str]=None; department:Optional[str]=None; priority:Optional[str]=None
class ComplaintOut(BaseModel):
    model_config=ConfigDict(from_attributes=True)
    id:int; description:str; category:str; priority:str; location:str; status:str
    department:str; created_at:datetime; resolved_at:Optional[datetime]=None
    resolution_time_hours:Optional[float]=None
class RegisterRequest(BaseModel):
    name:str; email:str; password:str; role:str="citizen"
class LoginRequest(BaseModel):
    email:str; password:str
