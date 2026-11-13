import React, { useEffect, useState } from "react";

const testimonials = [
  {
    name: "APPEN",
    logo: "/logos/Appen%20(2).svg",
    quote:
      "I’ve had the pleasure of working with DatoviaPlayHouse, and it has been a wonderful experience. Their team is professional, supportive, and committed to delivering quality work. I truly appreciate their dedication and look forward to future collaborations.”",
  },
  {
    name: "UBER",
    logo: "/logos/uber.svg",
    quote:
      "DatoviaPlayHouse has shown excellent expertise in human data labeling, delivering high-quality datasets with 98% accuracy. Their attention to detail, quality control, and professionalism make them a reliable partner.",
  },
  {
    name: "LXT AI",
    logo: "/logos/lxt-ai-cropped.png",
    quote:
      "With its strong recruitment network, DatoviaPlayHouse has helped us source native speakers across multiple languages and regions for voice and AI data collection projects. Their efficient coordination and multilingual sourcing capabilities make them a dependable partner.",
  },
];

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % testimonials.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <div className="section-wrap testimonial-inner">
      <article className="testimonial-content" aria-label={`${activeTestimonial.name} client testimonial`}>
        <div className="testimonial-name">
          <img src={activeTestimonial.logo} alt={`${activeTestimonial.name} logo`} />
        </div>
        <blockquote key={activeTestimonial.name} aria-live="polite">
          {activeTestimonial.quote}
        </blockquote>
        <div className="testimonial-controls" aria-label="Choose a testimonial">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              className={index === activeIndex ? "testimonial-indicator is-active" : "testimonial-indicator"}
              type="button"
              aria-label={`Show ${testimonial.name} testimonial`}
              aria-pressed={index === activeIndex}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
      </article>
    </div>
  );
}
