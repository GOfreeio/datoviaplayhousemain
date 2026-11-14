import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { VITE_API_URL, VITE_API_URL_REQUIRED_MESSAGE } from "../apiConfig.js";

const responsibilities = [
  "Listen to audio recordings and accurately transcribe spoken content into text, following project-specific formatting, punctuation, and grammar guidelines.",
  "Deliver high-quality transcription for assigned client projects and follow client-specific Written Domain Conventions.",
  "Stay familiar with client-written Domain Conventions and clean-room policies.",
  "Use current training materials and guidelines to ensure compliance and quality.",
  "Review and proofread transcripts for accuracy and completeness.",
  "Report technical issues or concerns promptly through the appropriate channels.",
  "Suggest process improvements that can enhance efficiency and quality.",
  "Manage time effectively to meet deadlines and maintain productivity and quality.",
  "Handle confidential information with discretion and follow privacy and security guidelines.",
  "Participate in other projects and tasks as assigned.",
];

const qualifications = [
  "Typing speed of 40 WPM or higher in Azerbaijani (az_az) is preferred.",
  "Excellent written and verbal communication skills, with strong attention to punctuation, grammar, and spelling.",
  "Ability to quickly learn and follow client-specific style guides and written domain conventions.",
  "Strong research skills, especially when verifying names, locations, and products.",
  "Proficiency with Mac and PC platforms, Microsoft Office, and Google Workspace.",
  "Strong interpersonal and relationship-building skills, with the ability to communicate across diverse perspectives.",
  "Demonstrated ability to meet deadlines and maintain high standards of work.",
  "Ability to listen to and handle sensitive information professionally and confidentially.",
];

const requirements = [
  "High school diploma or equivalent; additional training in linguistics, transcription, or a related field is a plus.",
  "Must be authorized to work in the United States; work sponsorship is not provided.",
  "Must be at least 18 years old.",
  "Reliable transportation for commuting to on-site facilities, if required.",
  "Ability to read and type in the language applied for and understand a range of accents and dialects. Candidates must pass a language assessment.",
];

const physicalRequirements = [
  "Ability to move around office and other work environments, including standing and walking for extended periods.",
  "Ability to remain seated for extended periods while working at a computer.",
  "Ability to bend, reach, and perform tasks requiring typical office mobility.",
  "Manual dexterity to operate a keyboard and mouse efficiently.",
  "Ability to wear headphones for extended periods while listening to audio.",
  "Ability to perform repetitive typing tasks with sustained concentration.",
];

const projectTypes = [
  "Data Collection",
  "Audio Recording",
  "Transcription",
  "Translation",
  "Localization",
  "Data Annotation",
  "AI/LLM Data Training",
  "Quality Assurance (QA)",
  "MTPE",
  "Other",
];

export default function CareerApplicationPage() {
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [searchParams] = useSearchParams();
  const jobId = searchParams.get("jobId")?.trim() || "";
  const requestedJobTitle = searchParams.get("job")?.trim() || "";
  const [listedJob, setListedJob] = useState(null);
  const [jobLoadError, setJobLoadError] = useState("");
  const jobTitle = listedJob?.title || requestedJobTitle || "Azerbaijani Transcriber";

  useEffect(() => {
    if (!jobId) return undefined;
    const controller = new AbortController();

    async function loadJob() {
      try {
        if (!VITE_API_URL) throw new Error(VITE_API_URL_REQUIRED_MESSAGE);

        const response = await fetch(`${VITE_API_URL}/api/career-jobs`, {
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok || result?.success === false || !Array.isArray(result?.data)) {
          throw new Error(result?.message || "Could not load this career opening.");
        }

        const job = result.data.find((item) => (item._id || item.id) === jobId);
        if (!job) throw new Error("This career opening is no longer available.");
        setListedJob(job);
      } catch (error) {
        if (error.name !== "AbortError") {
          setJobLoadError(error.message || "Could not load this career opening.");
        }
      }
    }

    loadJob();
    return () => controller.abort();
  }, [jobId]);

  async function handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    setSubmissionMessage("Submitting application...");

    try {
      const interestedProjectTypes = formData.getAll("projectTypes");

      if (interestedProjectTypes.length === 0) {
        setSubmissionMessage("Select at least one project type.");
        return;
      }

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
            location: formData.get("countryAndCity"),
            nativeLanguage: formData.get("nativeLanguage"),
            otherLanguages: formData.get("otherLanguages"),
            languageProficiency: formData.get("languageProficiency"),
            hasAdditionalLanguageExpertise: formData.get("additionalLanguageExpertise") === "Yes",
            additionalLanguageExpertise: String(
              formData.get("additionalLanguageExpertiseDetails") || ""
            ).trim(),
            projectTypes: interestedProjectTypes,
            professionalExpertise: formData.get("professionalExpertise"),
            hasRelevantExperience: formData.get("previousExperience") === "Yes",
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

      if (!response.ok || result?.success === false) {
        throw new Error(result.message || "Could not submit your application.");
      }

      form.reset();
      setSubmissionMessage("Your application was submitted successfully.");
    } catch (error) {
      setSubmissionMessage(
        error instanceof TypeError
          ? "Could not reach the application server. Check VITE_API_URL, make sure the backend is running, and confirm its CORS settings allow this website."
          : error.message || "Could not connect to the server."
      );
    }
  }

  return (
    <main className="inner-page">
      <section className="career-application-layout section-wrap">
        <article className="career-description">
          <div className="eyebrow"><span className="status-dot" /> CAREERS / APPLY</div>
          <h1>{jobTitle}</h1>
          {jobId && !listedJob && (
            <p className={jobLoadError ? "career-job-load-error" : "career-form-intro"} role={jobLoadError ? "alert" : "status"}>
              {jobLoadError || "Loading job details..."}
            </p>
          )}
          {listedJob ? (
            <>
              <p className="career-hours">
                <strong>{listedJob.department}</strong>
                {" · "}{listedJob.location}
                {" · "}{listedJob.employmentType}
                {listedJob.price?.min != null && listedJob.price?.max != null && (
                  <>{" · "}{listedJob.price.min}–{listedJob.price.max} {listedJob.price.currency} {listedJob.price.payPeriod}</>
                )}
              </p>
              {listedJob.description && (
                <section className="career-description-section" aria-labelledby="job-description-heading">
                  <h2 id="job-description-heading">Description</h2>
                  <p className="career-job-long-description">{listedJob.description}</p>
                </section>
              )}
              {listedJob.requirements && (
                <section className="career-description-section" aria-labelledby="job-requirements-heading">
                  <h2 id="job-requirements-heading">Requirements</h2>
                  <p className="career-job-long-description">{listedJob.requirements}</p>
                </section>
              )}
            </>
          ) : !jobId ? (
            <>
          <p className="career-description-lead">
            {jobTitle === "Azerbaijani Transcriber" ? (
              <>
                With Datovia Playhouse, native <strong>Azerbaijani speakers</strong> can earn extra
                money with flexible hours. We are seeking a detail-oriented, motivated Azerbaijani
                Transcriber to accurately convert audio and video recordings into written text while
                following client-specific conventions and standards. The ideal candidate has strong
                listening skills, excellent grammar, and a keen eye for detail.
              </>
            ) : (
              <>
                Join Datovia Playhouse as a <strong>{jobTitle}</strong>. We are looking for a
                detail-oriented, motivated team member who follows project guidelines, meets quality
                standards, and contributes to reliable project delivery.
              </>
            )}
          </p>
          <p className="career-hours"><strong>Flexible hours:</strong> 8 to 40 hours per week.</p>

          <section className="career-description-section">
            <h2>Why Join Us?</h2>
            <ul>
              <li><strong>Daily perks and occasional treats:</strong> Enjoy stocked snack bars, periodic team lunches, and social events.</li>
              <li><strong>Culture and connection:</strong> Join a friendly, collaborative environment where team members support one another.</li>
              <li><strong>Growth and impact:</strong> We invest in our people, prioritize internal promotions, and support clear career pathways.</li>
            </ul>
          </section>

          <section className="career-description-section">
            <h2>Key Responsibilities</h2>
            <ul>{responsibilities.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="career-description-section">
            <h2>Qualifications &amp; Skills</h2>
            <ul>{qualifications.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="career-description-section">
            <h2>Requirements</h2>
            <ul>{requirements.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="career-description-section">
            <h2>Physical Requirements</h2>
            <ul>{physicalRequirements.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="career-description-section">
            <h2>About Us</h2>
            <p>
              Datovia Playhouse is a global data company delivering language and data services,
              building on its roots as a production company. Originally creating content to
              support children’s language acquisition, we have grown through a commitment to
              excellence, forward-thinking strategies, and global cultural experience.
            </p>
            <p>
              Founded as an educational production company, Datovia Playhouse created an
              award-winning children’s series that taught fundamental subjects through engaging
              programming. Since 2019, we have expanded into a comprehensive data services
              provider offering transcription, translation, linguistic analysis, rating, systems
              testing, localization, field and studio recording, language skill verification,
              and specialized data handling focused on sensitivity and diversity.
            </p>
          </section>

          <section className="career-description-section">
            <h2>Additional Information</h2>
            <p>
              At Datovia Playhouse, we address complex challenges with agility and deliver secure
              data solutions across diverse environments. Our team is dedicated to high standards
              and exceptional service.
            </p>
            <h3>Disclaimer</h3>
            <p>
              All engagements are contingent upon successful completion of a background screening.
              Datovia Playhouse is an equal opportunity organization committed to diversity and
              inclusion. We welcome applicants of all backgrounds and abilities, regardless of
              location or engagement type. For accommodations or inquiries, please contact HR.
            </p>
            <h3>Candidate Privacy</h3>
            <p>
              Datovia Playhouse collects and processes personal information as part of its
              recruiting process. Before applying, review our{" "}
              <a
                href="https://drive.google.com/file/d/1FQmtZjqQk-sRmMPnPsqPuBb9O0QjZVDy/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
              >
                Candidate Privacy Policy
              </a>{" "}
              to learn what we collect, how we use it, and your rights.
            </p>
          </section>
            </>
          ) : null}
          <Link className="application-back-link" to="/careers">Back to careers</Link>
        </article>

        <section className="careers-application" aria-labelledby="application-heading">
          <h2 id="application-heading">Apply for {jobTitle}</h2>
          <p className="career-form-intro">Tell us about your languages, experience, and project interests.</p>
          <form className="application-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="applicant-name">Full name</label>
              <input id="applicant-name" name="name" type="text" autoComplete="name" required />
            </div>
            <div className="form-field">
              <label htmlFor="applicant-email">Email address</label>
              <input id="applicant-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="form-field">
              <label htmlFor="applicant-phone">WhatsApp or contact number</label>
              <input id="applicant-phone" name="phone" type="tel" autoComplete="tel" required />
            </div>
            <div className="form-field">
              <label htmlFor="applicant-resume">Google Drive resume link</label>
              <input
                id="applicant-resume"
                name="resumeUrl"
                type="url"
                placeholder="https://drive.google.com/..."
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="applicant-location">Which country and city are you currently located in?</label>
              <input
                id="applicant-location"
                name="countryAndCity"
                type="text"
                placeholder="For example: Dhubri, India"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="applicant-native-language">What is your native language?</label>
              <input id="applicant-native-language" name="nativeLanguage" type="text" required />
            </div>
            <div className="form-field">
              <label htmlFor="applicant-other-languages">Which other languages do you speak?</label>
              <textarea id="applicant-other-languages" name="otherLanguages" rows="3" placeholder="List any other languages you speak." />
            </div>
            <div className="form-field">
              <label htmlFor="applicant-proficiency">What is your proficiency level in each language?</label>
              <textarea
                id="applicant-proficiency"
                name="languageProficiency"
                rows="3"
                placeholder="For example: Hindi — native; English — advanced."
                required
              />
            </div>
            <fieldset className="form-choice-group">
              <legend>Do you have any additional language expertise?</legend>
              <div className="form-choice-options">
                <label className="form-choice">
                  <input type="radio" name="additionalLanguageExpertise" value="Yes" required />
                  <span>Yes</span>
                </label>
                <label className="form-choice">
                  <input type="radio" name="additionalLanguageExpertise" value="No" />
                  <span>No</span>
                </label>
              </div>
              <div className="form-field">
                <label htmlFor="applicant-language-expertise-details">If yes, please specify.</label>
                <textarea id="applicant-language-expertise-details" name="additionalLanguageExpertiseDetails" rows="3" />
              </div>
            </fieldset>
            <fieldset className="form-choice-group">
              <legend>Which types of projects are you interested in?</legend>
              <p className="form-choice-hint">Select all that apply.</p>
              <div className="form-choice-grid">
                {projectTypes.map((projectType) => (
                  <label className="form-choice" key={projectType}>
                    <input type="checkbox" name="projectTypes" value={projectType} />
                    <span>{projectType}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="form-field">
              <label htmlFor="applicant-expertise">Which area best describes your professional expertise?</label>
              <textarea id="applicant-expertise" name="professionalExpertise" rows="3" required />
            </div>
            <fieldset className="form-choice-group">
              <legend>Do you have previous experience in AI, data collection, or language-related projects?</legend>
              <div className="form-choice-options">
                <label className="form-choice">
                  <input type="radio" name="previousExperience" value="Yes" required />
                  <span>Yes</span>
                </label>
                <label className="form-choice">
                  <input type="radio" name="previousExperience" value="No" />
                  <span>No</span>
                </label>
              </div>
            </fieldset>
            <button className="button button-dark form-submit" type="submit">Submit application</button>
          </form>
          {submissionMessage && <p className="application-status" role="status">{submissionMessage}</p>}
        </section>
      </section>
    </main>
  );
}
