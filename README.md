# AI Smart Civic Services

An AI-powered civic complaint and service-management platform built for the **AI Smart Civic Services Problem-Solving Hackathon** (Batch 4 — Statistics track).

Citizens report local infrastructure problems (broken streetlights, water leaks, damaged roads, garbage overflow, etc.), and the system uses AI to classify, prioritize, and summarize each complaint — turning unstructured citizen reports into structured, actionable data for service teams, backed by statistical analytics on complaint trends.

> **Status:** 🚧 In progress — core AI + backend logic implemented, deployment pending.

---

## 📌 Problem Statement

Citizens regularly face local infrastructure and service issues, but reporting is often fragmented and service teams struggle to judge urgency or route complaints to the right department. This project builds a single platform that takes a raw complaint and turns it into structured, prioritized, actionable information — with statistics that reveal what problems are most common, urgent, or slow to resolve.

---

## 🧠 AI Features Implemented

| Feature | Role |
|---|---|
| **Complaint Classification** | Analyzes complaint text and predicts a category (e.g. Road, Water, Waste, Electricity, Drainage, Safety, Other). |
| **Priority Prediction** | Estimates urgency — Low, Medium, High, or Critical — from the complaint text. |
| **AI Assistant (Q&A)** | Natural-language interface for querying complaints/system data (e.g. "How many high-priority complaints are open?"). |

> AI technology, model/API choice, and the reasoning behind it will be documented here as the implementation is finalized — see [AI Approach](#-ai-approach--limitations) below.

---

## 📊 Statistics & Analytics (Batch 4 focus)

As a Statistics-track submission, the platform emphasizes analyzing complaint data alongside AI classification:

- Complaint counts and category frequency distributions
- Priority distribution across complaints
- Descriptive statistics (mean, median, mode, range, variance, standard deviation) on relevant metrics such as resolution time
- Quartiles / IQR for identifying outliers in complaint volume or resolution time
- Charts/visualizations for categories, priorities, locations, and trends over time

---

## 🗂 Data Model

| Field | Description |
|---|---|
| `complaint_id` | Unique complaint identifier |
| `description` | Citizen's complaint text |
| `category` | AI-predicted classification |
| `priority` | AI-predicted urgency level |
| `location` | Complaint location |
| `date` | Submission date/time |
| `status` | Open / Assigned / In Progress / Resolved |
| `assigned_department` | Responsible service department |
| `ai_output` | Stored classification, priority, and/or summary from the AI layer |

---

## 🏗 Architecture

```
Citizen / Admin UI  →  Python API (Flask)  →  Complaint Manager  →  AI Service  →  Database
                                                                          ↓
                                                                  Admin Dashboard
                                                                (statistics + trends)
```

| Layer | Implementation |
|---|---|
| UI | (e.g. HTML/CSS/JS — update to match your actual frontend) |
| Backend API | Flask |
| Complaint Manager | Handles creating, updating, assigning, and tracking complaints |
| AI Service | Classification + priority prediction + AI assistant |
| Database | SQLite *(planned/in progress)* |
| Analytics | Complaint counts, category/priority distributions, resolution-time statistics |
| Deployment | *Not yet deployed — target platform TBD (Render / Railway / PythonAnywhere)* |

---

## 🛠 Tech Stack

- **Backend:** Python, Flask
- **AI/ML:** *(fill in — e.g. scikit-learn model, Hugging Face pipeline, or an LLM API used for classification/priority/assistant)*
- **Database:** SQLite
- **Frontend:** *(fill in your actual UI stack)*

---

## 📁 Project Structure

```
Hackathon-2026-Project/
│
├── app.py                  # Flask application entry point
├── ai_service/              # Classification, priority prediction, AI assistant logic
├── templates/ / static/     # Frontend (if using Flask templates)
├── database/                 # SQLite DB and models
├── requirements.txt
└── README.md
```

> Update this structure to match your actual file/folder layout.

---

## ▶️ Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/shaheershaikh943/Hackathon-2026-Project.git
   cd Hackathon-2026-Project
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the app locally:
   ```bash
   python app.py
   ```
5. Open your browser at `http://127.0.0.1:5000`

---

## 🧪 AI Approach & Limitations

- **Input:** Raw complaint text (and optionally an uploaded image, if implemented).
- **Processing:** *(describe the model/API used for classification, priority prediction, and the assistant)*
- **Output:** Predicted category, priority level, and/or a response to natural-language queries.
- **Limitations:** Predictions are based on a limited training/example set and are not guaranteed to be fully accurate — this is a hackathon prototype, not a production-grade classifier. Edge cases and ambiguous complaints may be misclassified.

---

## 🚀 Deployment

Not yet deployed. Planned target: *(Render / Railway / PythonAnywhere — update once live)*.

---

## 📋 Hackathon Submission Checklist

- [x] Complaint classification
- [x] Priority prediction
- [x] AI assistant (Q&A)
- [x] Statistics/analytics on complaint data
- [x] Public deployment

---

## 📬 Contact

**Author:** Shaheer Shaikh
**GitHub:** [@shaheershaikh943](https://github.com/shaheershaikh943)

---

## 📄 License

Built for the AI Smart Civic Services Problem-Solving Hackathon, for educational and portfolio purposes.
