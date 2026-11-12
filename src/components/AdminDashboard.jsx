import React, { useEffect, useState } from "react";
import { API_URL_REQUIRED_MESSAGE } from "../apiConfig.js";

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
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [contactsError, setContactsError] = useState("");
  const [applicationsError, setApplicationsError] = useState("");

  useEffect(() => {
    if (!token) return undefined;

    if (!apiUrl) {
      setContactsError(API_URL_REQUIRED_MESSAGE);
      setApplicationsError(API_URL_REQUIRED_MESSAGE);
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
        const result = await response.json();

        if (response.status === 401 || response.status === 403) {
          window.sessionStorage.removeItem("adminToken");
          setToken("");
          setContacts([]);
          setApplications([]);
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

    loadContacts();
    loadApplications();
    return () => controller.abort();
  }, [apiUrl, token]);

  async function handleLogin(event) {
    event.preventDefault();
    setLoginError("");

    try {
      if (!apiUrl) throw new Error(API_URL_REQUIRED_MESSAGE);

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
          <h1>Submissions</h1>
          <p>Review website contact messages and career applications.</p>
        </div>
        <button className="admin-logout" type="button" onClick={handleLogout}>Sign out</button>
      </header>
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
