import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function CareerApplicationPage() {
  const [submissionMessage, setSubmissionMessage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setSubmissionMessage("This form is not connected to a submission service yet. Your application has not been sent.");
  }

  return (
    <main className="inner-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> CAREERS / APPLY</div>
        <h1>Application form</h1>
        <p>Share your contact details and resume with our team.</p>
      </section>
      <section className="careers-application section-wrap" aria-labelledby="application-heading">
        <h2 id="application-heading">Your details</h2>
        <form className="application-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="applicant-name">Full name</label>
            <input id="applicant-name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="form-field">
            <label htmlFor="applicant-email">Email</label>
            <input id="applicant-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="form-field">
            <label htmlFor="applicant-phone">Phone</label>
            <input id="applicant-phone" name="phone" type="tel" autoComplete="tel" required />
          </div>
          <div className="form-field">
            <label htmlFor="applicant-resume">Resume</label>
            <input
              id="applicant-resume"
              name="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              required
            />
          </div>
          <button className="button button-dark form-submit" type="submit">Submit application</button>
        </form>
        {submissionMessage && <p className="application-status" role="status">{submissionMessage}</p>}
        <Link className="application-back-link" to="/careers">Back to careers</Link>
      </section>
    </main>
  );
}
