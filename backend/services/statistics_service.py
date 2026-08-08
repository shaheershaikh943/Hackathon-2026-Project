import pandas as pd
from database.models import Complaint
def df(db):
    rows=db.query(Complaint).all()
    return pd.DataFrame([{"category":r.category,"priority":r.priority,"status":r.status,
    "department":r.department,"location":r.location,"resolution_time_hours":r.resolution_time_hours}
    for r in rows])
def overview(db):
    x=df(db); n=len(x)
    return {"total":n,"open":int((x.status=="Open").sum()) if n else 0,
            "resolved":int((x.status=="Resolved").sum()) if n else 0,
            "high_critical":int(x.priority.isin(["High","Critical"]).sum()) if n else 0}
def frequencies(db):
    x=df(db); return {c:(x[c].value_counts().to_dict() if not x.empty else {}) for c in ["category","priority","status","department","location"]}
def resolution_stats(db):
    s=pd.to_numeric(df(db).get("resolution_time_hours",pd.Series(dtype=float)),errors="coerce").dropna()
    if s.empty:return {"count":0}
    q1,q3=s.quantile(.25),s.quantile(.75); iqr=q3-q1
    mode=s.mode().iloc[0] if not s.mode().empty else None
    return {"count":int(s.count()),"mean":float(s.mean()),"median":float(s.median()),
    "mode":None if mode is None else float(mode),"min":float(s.min()),"max":float(s.max()),
    "range":float(s.max()-s.min()),"variance":float(s.var()) if len(s)>1 else 0,
    "standard_deviation":float(s.std()) if len(s)>1 else 0,"q1":float(q1),"q3":float(q3),
    "iqr":float(iqr),"lower_fence":float(q1-1.5*iqr),"upper_fence":float(q3+1.5*iqr),
    "outliers":[float(v) for v in s[(s<q1-1.5*iqr)|(s>q3+1.5*iqr)]]}
