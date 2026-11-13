import React, { useEffect, useState } from "react";
import { readApiJson, VITE_API_URL_REQUIRED_MESSAGE } from "../apiConfig.js";

function getErrorMessage(result, fallback) {
  return typeof result?.message === "string" && result.message ? result.message : fallback;
}

function getContactRows(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.contacts)) return result.contacts;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.inquiries)) return result.inquiries;
  if (Array.isArray(result?.data?.contacts)) return result.data.contacts;

  throw new Error("The server returned an unexpected contact response.");
}

function getApplicationRows(result) {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.applications)) return result.applications;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.applications)) return result.data.applications;

  throw new Error("The server returned an unexpected applications response.");
}

function getCareerJobRows(result) {
  if (Array.isArray(result?.data)) return result.data;
  throw new Error("The server returned an unexpected career jobs response.");
}

function getContactValue(contact, keys) {
  for (const key of keys) {
    if (contact[key] !== undefined && contact[key] !== null && contact[key] !== "") {
      return contact[key];
    }
  }
  return "";
}

function getSafeResumeUrl(value) {
  if (!value) return "";

  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : "";
  } catch {
    return "";
  }
}

function formatSubmittedDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleString();
}

export default function AdminDashboard({ apiUrl }) {
  const [token, setToken] = useState(() => window.sessionStorage.getItem("adminToken") || "");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contacts, setContacts] = useState([]);
  const [applications, setApplications] = useState([]);
  const [careerJobs, setCareerJobs] = useState([]);
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [loadingCareerJobs, setLoadingCareerJobs] = useState(false);
  const [postingCareerJob, setPostingCareerJob] = useState(false);
  const [deletingCareerJob, setDeletingCareerJob] = useState("");
  const [careerJobError, setCareerJobError] = useState("");
  const [careerJobMessage, setCareerJobMessage] = useState("");
  const [loginError, setLoginError] = useState("");
  const [contactsError, setContactsError] = useState("");
  const [applicationsError, setApplicationsError] = useState("");

  useEffect(() => {
    if (!token) return undefined;

    if (!apiUrl) {
      setContactsError(VITE_API_URL_REQUIRED_MESSAGE);
      setApplicationsError(VITE_API_URL_REQUIRED_MESSAGE);
      setCareerJobError(VITE_API_URL_REQUIRED_MESSAGE);
      return undefined;
    }

    const controller = new AbortController();

    async function loadList(endpoint, parseRows, fallback, setRows, setError, setLoading) {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`${apiUrl}${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: controller.signal,
        });
        const result = await readApiJson(response, endpoint);

        if (response.status === 401 || response.status === 403) {
          window.sessionStorage.removeItem("adminToken");
          setToken("");
          setContacts([]);
          setApplications([]);
          setCareerJobs([]);
          setLoginError("Your admin session has expired. Please sign in again.");
          return;
        }

        if (!response.ok || result?.success === false) {
          throw new Error(getErrorMessage(result, fallback));
        }

        setRows(parseRows(result));
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message || "Could not connect to the server. Please try again.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    function loadContacts() {
      return loadList(
        "/api/contact",
        getContactRows,
        "Could not load contact submissions.",
        setContacts,
        setContactsError,
        setLoadingContacts
      );
    }

    function loadApplications() {
      setLoadingApplications(true);
      return loadList(
        "/api/applications",
        getApplicationRows,
        "Could not load applications.",
        setApplications,
        setApplicationsError,
        setLoadingApplications
      );
    }

    function loadCareerJobs() {
      return loadList(
        "/api/career-jobs",
        getCareerJobRows,
        "Could not load career openings.",
        setCareerJobs,
        setCareerJobError,
        setLoadingCareerJobs
      );
    }

    loadContacts();
    loadApplications();
    loadCareerJobs();
    return () => controller.abort();
  }, [apiUrl, token]);

  async function handleCareerJobSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setCareerJobError("");
    setCareerJobMessage("");
    setPostingCareerJob(true);
    const formData = new FormData(form);
    const min = Number(formData.get("priceMin"));
    const max = Number(formData.get("priceMax"));

    try {
      if (!apiUrl) throw new Error(VITE_API_URL_REQUIRED_MESSAGE);
      if (min > max) throw new Error("Maximum pay must be greater than or equal to minimum pay.");

      const response = await fetch(`${apiUrl}/api/career-jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.get("title"),
          department: formData.get("department"),
          location: formData.get("location"),
          employmentType: formData.get("employmentType"),
          description: formData.get("description"),
          requirements: formData.get("requirements"),
          price: {
            min,
            max,
            currency: formData.get("currency"),
            payPeriod: formData.get("payPeriod"),
          },
        }),
      });
      const result = await readApiJson(response, "POST /api/career-jobs");

      if (response.status === 401 || response.status === 403) {
        window.sessionStorage.removeItem("adminToken");
        setToken("");
        throw new Error("Your admin session has expired. Please sign in again.");
      }

      if (!response.ok || result?.success === false) {
        throw new Error(getErrorMessage(result, "Could not post this career opening."));
      }

      if (!result?.data) throw new Error("The server did not return the posted career opening.");
      setCareerJobs((currentJobs) => [result.data, ...currentJobs]);
      form.reset();
      setCareerJobMessage("Career opening posted successfully.");
    } catch (error) {
      setCareerJobError(error.message || "Could not post this career opening.");
    } finally {
      setPostingCareerJob(false);
    }
  }

  async function handleCareerJobDelete(job) {
    const jobId = job._id || job.id;
    if (!jobId) {
      setCareerJobError("This career opening cannot be deleted because it has no ID.");
      return;
    }
    if (!window.confirm(`Delete the "${job.title}" career opening?`)) return;

    setCareerJobError("");
    setCareerJobMessage("");
    setDeletingCareerJob(jobId);

    try {
      if (!apiUrl) throw new Error(VITE_API_URL_REQUIRED_MESSAGE);

      const response = await fetch(`${apiUrl}/api/career-jobs/${encodeURIComponent(jobId)}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      const result = await readApiJson(response, "DELETE /api/career-jobs/:id");

      if (response.status === 401 || response.status === 403) {
        window.sessionStorage.removeItem("adminToken");
        setToken("");
        throw new Error("Your admin session has expired. Please sign in again.");
      }

      if (!response.ok || result?.success === false) {
        throw new Error(getErrorMessage(result, "Could not delete this career opening."));
      }

      setCareerJobs((currentJobs) => currentJobs.filter((currentJob) => (
        (currentJob._id || currentJob.id) !== jobId
      )));
      setCareerJobMessage("Career opening deleted successfully.");
    } catch (error) {
      setCareerJobError(error.message || "Could not delete this career opening.");
    } finally {
      setDeletingCareerJob("");
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");

    try {
      if (!apiUrl) throw new Error(VITE_API_URL_REQUIRED_MESSAGE);

      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result = await response.json();

      if (!response.ok || result?.success === false) {
        throw new Error(getErrorMessage(result, "Could not sign in."));
      }

      if (typeof result?.token !== "string" || !result.token) {
        throw new Error("The server did not return an authentication token.");
      }

      window.sessionStorage.setItem("adminToken", result.token);
      setPassword("");
      setToken(result.token);
    } catch (error) {
      setLoginError(error.message || "Could not connect to the server. Please try again.");
    }
  }

  function handleLogout() {
    window.sessionStorage.removeItem("adminToken");
    setToken("");
    setContacts([]);
    setApplications([]);
    setContactsError("");
    setApplicationsError("");
    setCareerJobError("");
    setCareerJobMessage("");
    setLoginError("");
  }

  if (!token) {
    return (
      <main className="admin-page">
        <section className="admin-panel admin-login-panel">
          <div className="eyebrow"><span className="status-dot" /> ADMIN</div>
          <h1>Admin sign in</h1>
          <p>Sign in to view contact responses and career applications.</p>
          <form className="admin-login-form" onSubmit={handleLogin}>
            <div className="form-field">
              <label htmlFor="admin-email">Email</label>
              <input
                id="admin-email"
                type="email"
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="admin-password">Password</label>
              <input
                id="admin-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            {loginError && <p className="admin-feedback admin-feedback-error" role="alert">{loginError}</p>}
            <button className="button button-dark form-submit" type="submit">Sign in</button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-heading">
        <div>
          <div className="eyebrow"><span className="status-dot" /> ADMIN DASHBOARD</div>
          <h1>Admin dashboard</h1>
          <p>Manage career openings, contact messages, and applications.</p>
        </div>
        <button className="admin-logout" type="button" onClick={handleLogout}>Sign out</button>
      </header>
      <section className="admin-panel admin-applications-panel" aria-labelledby="post-career-heading">
        <div className="admin-table-heading">
          <h2 id="post-career-heading">Post a career opening</h2>
        </div>
        <form className="career-job-form" onSubmit={handleCareerJobSubmit}>
          <div className="career-job-form-grid">
            <div className="form-field">
              <label htmlFor="career-job-title">Job title</label>
              <input id="career-job-title" name="title" type="text" required />
            </div>
            <div className="form-field">
              <label htmlFor="career-job-department">Department</label>
              <input id="career-job-department" name="department" type="text" required />
            </div>
            <div className="form-field">
              <label htmlFor="career-job-location">Location</label>
              <input id="career-job-location" name="location" type="text" placeholder="Remote" required />
            </div>
            <div className="form-field">
              <label htmlFor="career-job-type">Employment type</label>
              <select id="career-job-type" name="employmentType" defaultValue="" required>
                <option value="" disabled>Select employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="form-field career-job-form-wide">
              <label htmlFor="career-job-description">Description</label>
              <textarea id="career-job-description" name="description" rows="4" required />
            </div>
            <div className="form-field career-job-form-wide">
              <label htmlFor="career-job-requirements">Requirements</label>
              <textarea id="career-job-requirements" name="requirements" rows="4" required />
            </div>
            <div className="form-field">
              <label htmlFor="career-job-price-min">Minimum pay</label>
              <input id="career-job-price-min" name="priceMin" type="number" min="0" step="any" required />
            </div>
            <div className="form-field">
              <label htmlFor="career-job-price-max">Maximum pay</label>
              <input id="career-job-price-max" name="priceMax" type="number" min="0" step="any" required />
            </div>
            <div className="form-field">
              <label htmlFor="career-job-currency">Currency</label>
              <input id="career-job-currency" name="currency" type="text" defaultValue="USD" required />
            </div>
            <div className="form-field">
              <label htmlFor="career-job-pay-period">Pay period</label>
              <select id="career-job-pay-period" name="payPeriod" defaultValue="" required>
                <option value="" disabled>Select pay period</option>
                <option value="Hourly">Hourly</option>
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
          </div>
          {careerJobError && <p className="admin-feedback admin-feedback-error" role="alert">{careerJobError}</p>}
          {careerJobMessage && <p className="admin-feedback" role="status">{careerJobMessage}</p>}
          <button className="button button-dark form-submit" type="submit" disabled={postingCareerJob}>
            {postingCareerJob ? "Posting..." : "Post job"}
          </button>
        </form>
      </section>
      <section className="admin-panel admin-applications-panel" aria-labelledby="manage-careers-heading">
        <div className="admin-table-heading">
          <h2 id="manage-careers-heading">Posted career openings</h2>
          {!loadingCareerJobs && !careerJobError && <span>{careerJobs.length} openings</span>}
        </div>
        {loadingCareerJobs && <p className="admin-feedback" role="status">Loading career openings...</p>}
        {!loadingCareerJobs && careerJobs.length === 0 && !careerJobError && (
          <p className="admin-feedback">No career openings posted yet.</p>
        )}
        {!loadingCareerJobs && careerJobs.length > 0 && (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Title</th>
                  <th scope="col">Department</th>
                  <th scope="col">Location</th>
                  <th scope="col">Employment type</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {careerJobs.map((job, index) => {
                  const jobId = job._id || job.id || `${job.title}-${index}`;
                  return (
                    <tr key={jobId}>
                      <td>{job.title}</td>
                      <td>{job.department}</td>
                      <td>{job.location}</td>
                      <td>{job.employmentType}</td>
                      <td>
                        <button
                          className="admin-delete-button"
                          type="button"
                          onClick={() => handleCareerJobDelete(job)}
                          disabled={deletingCareerJob === jobId}
                        >
                          {deletingCareerJob === jobId ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section className="admin-panel" aria-labelledby="contact-responses-heading">
        <div className="admin-table-heading">
          <h2 id="contact-responses-heading">Contact submissions</h2>
          {!loadingContacts && !contactsError && <span>{contacts.length} responses</span>}
        </div>
        {loadingContacts && <p className="admin-feedback" role="status">Loading contact responses...</p>}
        {contactsError && <p className="admin-feedback admin-feedback-error" role="alert">{contactsError}</p>}
        {!loadingContacts && !contactsError && contacts.length === 0 && (
          <p className="admin-feedback">No contact responses yet.</p>
        )}
        {!loadingContacts && !contactsError && contacts.length > 0 && (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Message</th>
                  <th scope="col">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((contact, index) => (
                  <tr key={contact._id || contact.id || `${contact.email || contact.emailAddress || "contact"}-${index}`}>
                    <td>{getContactValue(contact, ["name", "fullName"])}</td>
                    <td>{getContactValue(contact, ["email", "emailAddress"])}</td>
                    <td>{getContactValue(contact, ["subject"])}</td>
                    <td className="admin-message-cell">{getContactValue(contact, ["message"])}</td>
                    <td>{formatSubmittedDate(getContactValue(contact, ["createdAt", "created_at", "submittedAt"]))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section className="admin-panel admin-applications-panel" aria-labelledby="career-applications-heading">
        <div className="admin-table-heading">
          <h2 id="career-applications-heading">Career applications</h2>
          {!loadingApplications && !applicationsError && <span>{applications.length} applications</span>}
        </div>
        {loadingApplications && <p className="admin-feedback" role="status">Loading career applications...</p>}
        {applicationsError && <p className="admin-feedback admin-feedback-error" role="alert">{applicationsError}</p>}
        {!loadingApplications && !applicationsError && applications.length === 0 && (
          <p className="admin-feedback">No career applications yet.</p>
        )}
        {!loadingApplications && !applicationsError && applications.length > 0 && (
          <div className="admin-table-scroll">
            <table className="admin-table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Resume</th>
                  <th scope="col">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application, index) => {
                  const resumeUrl = getSafeResumeUrl(application.resumeUrl);

                  return (
                    <tr key={application._id || application.id || `${application.email || "application"}-${index}`}>
                      <td>{getContactValue(application, ["name", "fullName"])}</td>
                      <td>{getContactValue(application, ["email", "emailAddress"])}</td>
                      <td>{getContactValue(application, ["phone"])}</td>
                      <td>
                        {resumeUrl ? (
                          <a href={resumeUrl} target="_blank" rel="noreferrer">View resume</a>
                        ) : (
                          getContactValue(application, ["resumeUrl"])
                        )}
                      </td>
                      <td>{formatSubmittedDate(getContactValue(application, ["createdAt", "created_at", "submittedAt"]))}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
