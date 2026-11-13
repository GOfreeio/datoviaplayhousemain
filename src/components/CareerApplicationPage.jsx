import React, { useState } from "react";
import { Link } from "react-router-dom";
import { VITE_API_URL, VITE_API_URL_REQUIRED_MESSAGE } from "../apiConfig.js";

export default function CareerApplicationPage() {
  const [submissionMessage, setSubmissionMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmissionMessage("Submitting application...");

    try {
      if (!VITE_API_URL) throw new Error(VITE_API_URL_REQUIRED_MESSAGE);

      const response = await fetch(
        `${VITE_API_URL}/api/applications`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            email: formData.get("email"),
            phone: formData.get("phone"),
            resumeUrl: formData.get("resumeUrl"),
          }),
        }
      );

      const responseText = await response.text();
      let result;

      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Server returned an invalid response (HTTP ${response.status}). Check that the backend is running and the API URL is correct.`
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not submit your application.");
      }

      form.reset();
      setSubmissionMessage("Your application was submitted successfully.");
    } catch (error) {
      setSubmissionMessage(error.message || "Could not connect to the server.");
    }
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
            <label htmlFor="applicant-resume">Google Drive resume link</label>
            <input
              id="applicant-resume"
              name="resumeUrl"
              type="url"
              placeholder="https://drive.google.com/file/d/..."
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
