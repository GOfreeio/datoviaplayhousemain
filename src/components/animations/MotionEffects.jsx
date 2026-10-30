import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function MotionEffects() {
  const location = useLocation();

  useEffect(() => {
    document.body.classList.add("motion-ready");
    const selectors = [
      ".section-heading",
      ".project-card",
      ".service-row",
      ".partner-logo",
      ".solution-card",
      ".case-study-card",
      ".testimonial-card",
      ".languages-inner",
      ".about-copy",
      ".contact-left",
      ".evidence-copy",
      ".faq-item",
      ".legal-content",
      ".hero-copy",
      ".hero-art",
      ".trust-inner",
    ];
    const nodes = document.querySelectorAll(selectors.join(","));
    nodes.forEach((node) => node.classList.add("reveal-on-scroll"));

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return () => document.body.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, [location.pathname]);

  return null;
}

