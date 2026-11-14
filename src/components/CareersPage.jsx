import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CareersHand from "./CareersHand.jsx";
import { readApiJson, VITE_API_URL } from "../apiConfig.js";

function getOpenings(result) {
  if (Array.isArray(result?.data)) return result.data;
  throw new Error("The server returned an unexpected career jobs response.");
}

function formatPrice(price) {
  if (!price || price.min == null || price.max == null) return "";
  const amount = `${Number(price.min).toLocaleString()} – ${Number(price.max).toLocaleString()} ${price.currency || "USD"}`;
  return `${amount}${price.payPeriod ? ` / ${price.payPeriod}` : ""}`;
}

export default function CareersPage() {
  const [openings, setOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadOpenings() {
      if (!VITE_API_URL) {
        setError("Career openings are temporarily unavailable.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${VITE_API_URL}/api/career-jobs`, {
          signal: controller.signal,
        });
        const result = await readApiJson(response, "GET /api/career-jobs");

        if (!response.ok || result?.success === false) {
          throw new Error(result?.message || "Could not load career openings.");
        }

        setOpenings(getOpenings(result));
      } catch (loadError) {
        if (loadError.name !== "AbortError") {
          setError(loadError.message || "Could not load career openings.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadOpenings();
    return () => controller.abort();
  }, []);

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
        {loading && <p className="career-listing-message" role="status">Loading career openings...</p>}
        {!loading && error && <p className="career-listing-message career-listing-error" role="alert">{error}</p>}
        {!loading && !error && openings.length === 0 && (
          <p className="career-listing-message">There are no open positions right now. Please check back soon.</p>
        )}
        {!loading && !error && openings.map((opening) => (
          <article className="career-card" key={opening._id || opening.id || opening.title}>
            <h2>{opening.title}</h2>
            <div className="career-card-details">
              {[opening.location, opening.employmentType, formatPrice(opening.price)]
                .filter(Boolean)
                .map((detail) => <span key={detail}>{detail}</span>)}
            </div>
            <div className="career-card-footer">
              <Link
                className="career-card-view"
                to={`/careers/apply?job=${encodeURIComponent(opening.title)}&jobId=${encodeURIComponent(opening._id || opening.id || "")}`}
              >
                Apply
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
