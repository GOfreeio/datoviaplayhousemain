import React from "react";
import { Link } from "react-router-dom";
import CareersHand from "./CareersHand.jsx";

const openings = [
  {
    category: "AI & Language",
    title: "AI Response Evaluator",
    details: ["Remote", "Part-time"],
  },
  {
    category: "Data Operations",
    title: "Data Annotation Specialist",
    details: ["Remote", "Flexible hours"],
  },
  {
    category: "Language Quality",
    title: "Language Quality Reviewer",
    details: ["Remote", "Part-time"],
  },
  {
    category: "Data & Analytics",
    title: "Data Quality Analyst",
    details: ["Remote", "Full-time"],
  },
];

export default function CareersPage() {
  return (
    <main className="inner-page careers-page">
      <section className="inner-hero section-wrap careers-hero">
        <div className="careers-hero-copy">
          <div className="eyebrow"><span className="status-dot" /> CAREERS</div>
          <h1>Careers</h1>
          <p>
            At Datovia Playhouse, we bring people together to make data and AI more useful.
            We welcome curious, thoughtful people who care about quality, communicate clearly,
            and enjoy learning. Explore our current opportunities below and apply with your resume.
          </p>
        </div>
        <CareersHand />
      </section>
      <section className="career-listings section-wrap" aria-label="Career opportunities">
        {openings.map((opening) => (
          <article className="career-card" key={opening.title}>
            <span className="career-card-category">{opening.category}</span>
            <h2>{opening.title}</h2>
            <div className="career-card-details">
              {opening.details.map((detail) => <span key={detail}>{detail}</span>)}
            </div>
            <div className="career-card-footer">
              <span className="career-card-status">Open</span>
              <Link className="career-card-view" to="/careers/apply">Apply</Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
