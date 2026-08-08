import re
KEYWORDS={"Water":["water","leak","pipe","pipeline"],"Drainage":["drain","sewage","sewer","flood","blocked"],
"Waste":["garbage","trash","waste","dumpster","litter"],"Road":["road","pothole","street","pavement"],
"Electricity":["electric","electricity","wire","power","light"],"Safety":["danger","unsafe","hazard","accident","exposed"]}
def analyze(text):
    t=text.lower(); category="Other"
    for cat,words in KEYWORDS.items():
        if any(re.search(r"\b"+re.escape(w)+r"\b",t) for w in words):
            category=cat; break
    critical=["fire","exposed wire","dangerous","emergency","collapse"]
    high=["leak","flood","blocked","broken","hazard"]
    priority="Critical" if any(x in t for x in critical) else "High" if any(x in t for x in high) else "Medium" if len(t.split())>8 else "Low"
    return category,priority
def department_for(category):
    return {"Water":"Water Department","Drainage":"Drainage Department","Waste":"Waste Management",
    "Road":"Roads & Works","Electricity":"Electricity Department","Safety":"Public Safety",
    "Other":"General Services"}.get(category,"General Services")
