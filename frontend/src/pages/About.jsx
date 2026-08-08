import {Link} from "react-router-dom";

export default function About(){
  return <div className="about-page">
    <section className="about-hero">
      <div className="about-avatar">MS</div>
      <div>
        <span className="eyebrow">PROJECT PROFILE</span>
        <h1>Muhammad Shaheer Shaikh</h1>
        <p className="about-lead">Student profile and project information for the CivicAI Smart Civic Services application.</p>
      </div>
    </section>

    <div className="about-grid">
      <section className="panel profile-card">
        <div className="profile-label">STUDENT DETAILS</div>
        <div className="profile-row"><span>Name</span><strong>Muhammad Shaheer Shaikh</strong></div>
        <div className="profile-row"><span>Father's Name</span><strong>Salahuddin</strong></div>
        <div className="profile-row"><span>Roll No.</span><strong>AIDS-797327</strong></div>
        <div className="profile-row"><span>Program</span><strong>SMIT AI Data Science</strong></div>
        <div className="profile-row"><span>Batch</span><strong>Batch 4 Student</strong></div>
        <div className="profile-row"><span>Mentor</span><strong>Sir Yasir Nawaz Memon</strong></div>
      </section>

      <section className="panel project-card">
        <span className="eyebrow">ABOUT THE PROJECT</span>
        <h2>CivicAI Smart Civic Services</h2>
        <p>This project uses AI-assisted complaint classification, prioritization and analytics to help citizens report civic problems and help service teams respond more efficiently.</p>
        <div className="project-pills"><span>AI Assistance</span><span>Civic Complaints</span><span>Data Analytics</span><span>FastAPI + React</span></div>
        <Link className="btn primary" to="/">← Back to overview</Link>
      </section>
    </div>

    <section className="panel mentor-note">
      <div className="mentor-icon">✦</div>
      <div><span className="eyebrow">MENTOR</span><h3>Sir Yasir Nawaz Memon</h3><p>Guidance and mentorship for the AI Data Science Batch 4 learning journey.</p></div>
    </section>
  </div>
}
