import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Outlet, Route, useLocation, Routes } from "react-router-dom";
import { SiteHeader, SiteFooter, ArrowIcon } from "./components/layout/SiteLayout.jsx";
import Preloader from "./components/layout/Preloader.jsx";
import MotionEffects from "./components/animations/MotionEffects.jsx";
import RobotFace from "./components/RobotFace.jsx";
import CareersPage from "./components/CareersPage.jsx";
import CareerApplicationPage from "./components/CareerApplicationPage.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import BlogPage from "./components/BlogPage.jsx";
import { VITE_API_URL, VITE_API_URL_REQUIRED_MESSAGE } from "./apiConfig.js";

const services = [
  {
    number: "01",
    title: "Data strategy",
    description:
      "Find the right questions, signals, and structure before investing in the wrong solution.",
    icon: "↗",
  },
  {
    number: "02",
    title: "Analytics & insight",
    description:
      "Turn scattered information into useful answers your whole team can act on.",
    icon: "⌁", 
  },
  {
    number: "03",
    title: "AI & automation",
    description:
      "Build practical, responsible workflows that give good ideas room to grow.",
    icon: "AI",
  },
  {
    number: "04",
    title: "Digital experiences",
    description:
      "Make complex tools feel simple, with thoughtful products designed around people.",
    icon: "◫",
  },
];

const projects = [
  {
    type: "Customer intelligence",
    title: "Seeing the whole customer journey",
    tone: "project-blue",
    visual: "journey",
    description:
      "A sample case-study layout. Add the real challenge, approach, evidence, and approved outcomes here.",
  },
  {
    type: "Data experience",
    title: "Making complex information feel clear",
    tone: "project-green",
    visual: "signal",
    description:
      "A sample case-study layout. Replace this copy with a verified project story and client-approved details.",
  },
];

const caseStudies = [
  {
    type: "Multilingual AI",
    title: "Empowering global AI through expert language solutions",
    client: "Global AI initiatives",
    overview:
      "Datovia Playhouse supports multilingual AI systems with language services, data annotation, localization, and AI training solutions—combining linguistic expertise with technology to help systems communicate across languages and cultures.",
    challenge: [
      "Inconsistent multilingual training data and limited access to qualified language experts.",
      "Cultural nuances lost in translation and quality challenges when scaling across markets.",
      "The need for more accurate, localized AI experiences that earn user trust.",
    ],
    approach: [
      "Analyze project requirements, target markets, and intended use.",
      "Match linguists and AI specialists to the required languages and domains.",
      "Prepare, annotate, and validate datasets with linguistic quality assurance.",
      "Refine deliverables using feedback and evolving project requirements.",
    ],
    outcomes: [
      "More culturally relevant language data for AI development.",
      "Scalable linguistic quality support across global markets.",
      "A structured delivery approach designed to support localization and model improvement.",
    ],
    scope: ["Data annotation", "AI training and evaluation", "Localization & transcreation", "Linguistic QA"],
  },
  {
    type: "Speech data collection & transcription",
    title: "Delivering 1,000+ hours of speech data for AI innovation",
    client: "Shaip",
    overview:
      "Shaip, an AI data platform company, needed a delivery partner to collect and process large-scale multilingual audio data for speech and language model development. Datovia Playhouse provided an end-to-end managed speech data and transcription workflow.",
    challenge: [
      "Collect large volumes of speech across varied demographics and regions.",
      "Transcribe raw audio accurately while maintaining consistent quality.",
      "Meet project timelines, privacy requirements, and changing scale needs.",
    ],
    approach: [
      "Recruit and onboard a diverse pool of native-speaking contributors and transcription specialists.",
      "Coordinate speech collection across regions and participant groups.",
      "Transcribe audio and run multiple rounds of validation and expert review.",
      "Apply quality checks and securely deliver datasets to the project requirements.",
    ],
    outcomes: [
      "Delivered more than 1,000 hours of raw speech data.",
      "Completed transcription and delivery milestones within the project timelines.",
      "Supported multilingual speech-model training with a scalable, managed workflow.",
      "Maintained the project’s stated security and confidentiality requirements.",
    ],
    scope: ["Speech data collection", "Transcription", "Multiple languages and dialects", "End-to-end managed delivery"],
  },
  {
    type: "Speech AI & audio annotation",
    title: "Advancing speech AI with high-accuracy audio annotation",
    client: "Fano Labs",
    overview:
      "Fano Labs develops speech recognition, natural language processing, and conversational intelligence solutions. Datovia Playhouse supported its speech-to-text and audio intelligence work by turning complex multilingual recordings into structured, AI-ready data.",
    challenge: [
      "Handle diverse accents, dialects, and speaking styles across large audio datasets.",
      "Transcribe conversations accurately, including noisy and overlapping speech.",
      "Keep annotation workflows consistent and quality high at scale.",
    ],
    approach: [
      "Assess audio complexity and design workflows around the project guidelines.",
      "Assign linguists and annotators based on language, accent, and domain expertise.",
      "Segment, annotate, and transcribe audio using standardized protocols.",
      "Run layered validation, error correction, and expert review before secure delivery.",
    ],
    outcomes: [
      "Achieved the project-reported 95%+ accuracy target across annotation and transcription tasks.",
      "Delivered structured speech data to support model training and optimization.",
      "Helped strengthen speech-model coverage across accents, dialects, and real-world audio.",
      "Met delivery timelines while maintaining the project’s quality requirements.",
    ],
    scope: ["Audio annotation", "Speech-to-text transcription", "General audio transcription", "Managed delivery"],
  },
];

const solutionCards = [
  {
    title: "Data annotation",
    description:
      "Datovia Playhouse delivers carefully labeled, high-quality datasets that help AI systems learn from real-world content. Our teams annotate text, images, audio, and video to your guidelines, with linguistic expertise and quality checks at every stage.",
    deliverables: ["Text, image, audio & video labeling", "Multilingual and domain-specific annotation", "Validation and quality review"],
  },
  {
    title: "Data collection",
    description:
      "Datovia Playhouse gathers diverse, high-quality data to power AI training and research. We coordinate contributor recruitment and managed collection workflows for speech, text, and other media—built around your project scope and requirements.",
    deliverables: ["Speech and multimedia data collection", "Contributor sourcing and coordination", "Managed, scalable project delivery"],
  },
  {
    title: "Data and model evaluation",
    description:
      "Datovia Playhouse helps teams understand how well their data and AI models perform. We review model outputs for accuracy, consistency, relevance, and language quality, then provide structured human feedback to guide improvement.",
    deliverables: ["Dataset review and validation", "Model response evaluation", "Human feedback and actionable quality insights"],
  },
  {
    title: "Conversational AI",
    description:
      "Datovia Playhouse helps conversational AI understand people and respond naturally. We support chatbot and voice-assistant development with language data, dialogue annotation, transcription, and testing across languages and real-world conversations.",
    deliverables: ["Dialogue and intent annotation", "Speech transcription and language review", "Multilingual conversational testing"],
  },
];

const languages = [
  "Mandarin",
  "Chinese",
  "Japanese",
  "Korean",
  "Vietnamese",
  "Portuguese",
  "Dutch",
  "English",
  "Cantonese",
  "German",
  "French",
];
const partnerLogos = [
  { name: "Appen", src: "/logos/Appen%20(2).svg" },
  { name: "Google Cloud", src: "/logos/google-cloud.svg" },
  { name: "TransPerfect", src: "/logos/transperfect-cropped.png" },
  { name: "LXT AI", src: "/logos/lxt-ai-cropped.png" },
  { name: "Razorpay", src: "/logos/razorpay-logo.svg" },
  { name: "Shiprocket", src: "/logos/shiprocket.svg" },
  { name: "DataBacker", src: "/logos/databacker-cropped.png" },
  { name: "Uber", src: "/logos/uber.svg" },
];

function ProjectVisual({ type }) {
  if (type === "journey") {
    return (
      <div className="journey-visual" aria-hidden="true">
        <div className="journey-ring ring-one" />
        <div className="journey-ring ring-two" />
        <div className="journey-ring ring-three" />
        <span className="journey-center">people<br />+ data</span>
        <span className="journey-label label-one">Listen</span>
        <span className="journey-label label-two">Learn</span>
        <span className="journey-label label-three">Improve</span>
      </div>
    );
  }

  return (
    <div className="signal-visual" aria-hidden="true">
      {[34, 54, 42, 72, 63, 87, 68, 96, 76, 105, 88, 122, 98, 136].map((height, index) => (
        <span key={index} style={{ height: `${height}px`, opacity: 0.35 + index * 0.045 }} />
      ))}
      <div className="signal-caption">FIND THE PATTERN<span>→</span></div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> DATA, MADE HUMAN</div>
            <h1>Clarity in every<span> data point.</span></h1>
            <p className="hero-description">
              We help ambitious teams turn complex data into confident decisions and better digital experiences.
            </p>
            <div className="hero-actions">
              <a className="button liquid-glass-btn" href="#contact">
                <span className="button-text">Let’s make sense of it</span>
                <span className="button-arrow" aria-hidden="true">›</span>
              </a>
              <a className="text-link" href="#work">Explore our approach <ArrowIcon /></a>
            </div>
          </div>
          <div className="hero-art">
            <img
              className="hero-robot-video"
              src="/videos/video_potrait_robot.gif"
              alt="An animated robot"
            />
          </div>
          <div className="hero-footnotes">
            <p>Turn complex data into clear, confident decisions.</p>
            <p>Explore data annotation, collection, evaluation, and conversational AI.</p>
          </div>
        </section>

        <section className="trust-strip" aria-label="Ways we partner">
          <div className="section-wrap trust-inner">
            <p>Good work starts with good questions.</p>
            <div className="trust-values">
              <span>Thoughtful by default</span>
              <span><i>↗</i> Built for real life</span>
              <span><i>◌</i> Better, together</span>
            </div>
          </div>
        </section>

        <section className="partner-logos" aria-label="Our partners">
          <div className="section-wrap">
            <h2 className="partner-logos-heading">Trusted by leading AI innovators</h2>
            <div className="partner-logos-grid">
              {partnerLogos.map(({ name, src }) => (
                <div className={`partner-logo partner-logo-${name.toLowerCase().replace(/\s+/g, "-")}`} key={name}>
                  {src ? <img src={src} alt={`${name} logo`} /> : <span>{name}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-wrap work-section section-pad" id="work">
          <div className="section-heading">
            <div>
              <div className="eyebrow">A SAMPLE OF WHAT WE DO</div>
              <h2>Good questions.<br /><span>Better outcomes.</span></h2>
            </div>
            <p className="heading-aside">A couple of example project stories to show the shape of our work. We’ll replace these with approved case studies and evidence.</p>
          </div>
          <div className="project-grid">
            {projects.map((project, index) => (
              <article className={`project-card ${project.tone}`} key={project.title}>
                <div className="project-card-top">
                  <span>{project.type}</span>
                  <span className="project-number">0{index + 1}</span>
                </div>
                <ProjectVisual type={project.visual} />
                <div className="project-card-copy">
                  <div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                  </div>
                  <a href="#contact" aria-label={`Ask about ${project.title}`}><ArrowIcon diagonal /></a>
                </div>
              </article>
            ))}
          </div>
          <div className="client-note">
            <p><b>What we do.</b> Datovia Playhouse delivers data annotation, data collection, data and model evaluation, and conversational AI services to help teams build better AI experiences.</p>
            <Link className="client-note-tag" to="/solutions">EXPLORE OUR SOLUTIONS ↗</Link>
          </div>
        </section>

        <section className="services-section section-pad" id="services">
          <div className="section-wrap">
            <div className="section-heading services-heading">
              <div>
                <div className="eyebrow"><span className="eyebrow-line" /> WHAT WE BRING TO THE TABLE</div>
                <h2>From first question<br />to <span>what’s next.</span></h2>
              </div>
              <p className="heading-aside">The right mix of thinking, craft, and technology to move your work forward.</p>
            </div>
            <div className="services-list">
              {services.map((service) => (
                <article className="service-row" key={service.number}>
                  <span className="service-number">{service.number}</span>
                  <span className="service-icon" aria-hidden="true">{service.icon}</span>
                  <div className="service-copy"><h3>{service.title}</h3><p>{service.description}</p></div>
                  <a href="#contact" aria-label={`Ask us about ${service.title}`}><ArrowIcon diagonal /></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section-wrap section-pad" id="about">
          <div className="about-visual">
            <div className="about-orbit orbit-a" />
            <div className="about-orbit orbit-b" />
            <div className="about-orbit orbit-c" />
            <div className="about-center"><span>DP</span><small>PEOPLE<br />FIRST</small></div>
            <span className="about-side-label">A LITTLE LOGIC.<br />A LOT OF CURIOSITY.</span>
          </div>
          <div className="about-copy">
            <div className="eyebrow">A LITTLE ABOUT US</div>
            <h2>Data is powerful.<br /><span>People make it matter.</span></h2>
            <p>We’re a curious, collaborative team that believes good data work should make life clearer—not more complicated. We bring strategy, technology, and human understanding together to help ideas go somewhere useful.</p>
            <p className="about-note">This space is ready for your real company story, team introductions, working culture, and behind-the-scenes photos.</p>
            <Link to="/about" className="text-link">Get to know us <ArrowIcon /></Link>
            <div className="culture-tags"><span>Open minds</span><span>Shared ownership</span><span>Always learning</span></div>
          </div>
        </section>

        <section className="languages-section">
          <div className="section-wrap languages-inner">
            <div>
              <div className="eyebrow">GOOD IDEAS HAVE NO BORDERS</div>
              <h2>Thoughtful work,<br /><span>in your language.</span></h2>
            </div>
            <div className="language-list">
              {languages.map((language, index) => (
                <div className="language-item" key={language}>
                  <span>{String(index + 1).padStart(2, "0")}</span><b>{language}</b><i>●</i>
                </div>
              ))}
              <p>Language support across 300+ languages and dialects.</p>
            </div>
          </div>
        </section>

        <section className="evidence-section section-wrap section-pad">
          <div className="evidence-card">
            <div className="evidence-mark">↗</div>
            <div className="evidence-copy">
              <div className="eyebrow">SHOW YOUR WORK</div>
              <h2>Good claims come<br />with <span>good evidence.</span></h2>
              <p>Add approved metrics, research methods, dataset details, and source notes to demonstrate how each result was reached. We’ll only publish evidence you can stand behind.</p>
              <a className="text-link" href="#contact">Ask us about our approach <ArrowIcon /></a>
            </div>
            <div className="evidence-side">
              <div className="evidence-data-row"><span>01</span><b>Traceable sources</b><i>↗</i></div>
              <div className="evidence-data-row"><span>02</span><b>Clear methodology</b><i>↗</i></div>
              <div className="evidence-data-row"><span>03</span><b>Responsible data use</b><i>↗</i></div>
              <small>DATASETS / PROVIDER DETAILS TO BE CONFIRMED</small>
            </div>
          </div>
        </section>


        <section className="robot-face-section">
      {/* <div className="hero-content">
        <h1>Intelligence, designed for impact.</h1>
      </div> */}

      <RobotFace />
    </section>



        <section className="contact-section section-wrap section-pad" id="contact">
          <div className="contact-card">
            <div className="contact-left">
              <div className="contact-heading-row">
                <h2>Already know what <span>you’re looking for?</span></h2>
                {/* <span className="contact-client-name">Appen</span> */}
              </div>
              <p>Tell us what you need and we’ll help you find the right next step.</p>
              <Link className="button button-lime" to="/contact">Book a meeting <ArrowIcon diagonal /></Link>
            </div>
            <div className="contact-right">
              <div className="contact-orbit" />
              <section className="testimonial-section">
          <div className="section-wrap testimonial-inner">
            <div className="testimonial-content" aria-label="Client testimonial">
              <div className="testimonial-name">
                <img src="/logos/Appen%20(2).svg" alt="Appen logo" />
              </div>
              <blockquote>I’ve had the pleasure of working with DatoviaPlayHouse, and it has been a wonderful experience. Their team is professional, supportive, and committed to delivering quality work. I truly appreciate their dedication and look forward to future collaborations.”</blockquote>
            </div>
          </div>
        </section>
              <Link to="/contact" aria-label="Contact Datovia Playhouse"><ArrowIcon diagonal /></Link>
            </div>
          </div>
        </section>

        {/* <section className="testimonial-section">
          <div className="section-wrap testimonial-inner">
            <div className="testimonial-content" aria-label="Client testimonial">
              <div className="testimonial-name">
                <img src="/logos/Appen%20(2).svg" alt="Appen logo" />
              </div>
              <blockquote>I’ve had the pleasure of working with Andovar on several projects, and I’ve always been impressed by their professionalism and dedication to delivering top-quality AI training data. They are a trusted partner who I continually look to for new opportunities.</blockquote>
            </div>
          </div>
        </section> */}
      </main>
    </>
  );
}

function AboutPage() {
  return (
    <main className="inner-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> ABOUT DATOVIA PLAYHOUSE</div>
        <h1>Data is powerful.<br /><span>People make it matter.</span></h1>
        <p>We bring strategy, technology, and human understanding together to make complex data useful in everyday decisions.</p>
      </section>
      <section className="inner-content section-wrap">
        <div className="inner-story-visual"><div className="about-orbit orbit-a" /><div className="about-orbit orbit-b" /><div className="about-orbit orbit-c" /><div className="about-center"><span>DP</span><small>PEOPLE<br />FIRST</small></div></div>
        <div className="inner-story-copy">
          <div className="eyebrow">OUR APPROACH</div>
          <h2>Thoughtful data.<br /><span>Useful outcomes.</span></h2>
          <p>We’re a collaborative team that believes good data work should make life clearer—not more complicated. We start by listening, ask better questions, and shape the right mix of insight and technology around the people who will use it.</p>
          <p>This page is ready for your company story, team introductions, working culture, and behind-the-scenes photos.</p>
          <div className="culture-tags"><span>Open minds</span><span>Shared ownership</span><span>Always learning</span></div>
        </div>
      </section>
      <section className="inner-values">
        <div className="section-wrap">
          <div className="eyebrow">WHAT WE BELIEVE</div>
          <div className="inner-value-grid">
            <article><span>01</span><h3>Make it understandable.</h3><p>Good work gives people clarity, not another layer of complexity.</p></article>
            <article><span>02</span><h3>Build it together.</h3><p>The best outcomes come from listening and sharing ownership.</p></article>
            <article><span>03</span><h3>Stay curious.</h3><p>We keep learning, testing assumptions, and improving the work.</p></article>
          </div>
        </div>
      </section>
      <section className="inner-cta section-wrap"><h2>Have a good question?<br /><span>Let’s talk.</span></h2><Link className="button button-dark" to="/contact">Contact us <ArrowIcon diagonal /></Link></section>
    </main>
  );
}

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  async function handleContactSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    setFeedback({ type: "", message: "" });

    try {
      if (!VITE_API_URL) throw new Error(VITE_API_URL_REQUIRED_MESSAGE);

      const response = await fetch(`${VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("fullName"),
          email: formData.get("emailAddress"),
          subject: formData.get("subject"),
          message: formData.get("message"),
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Could not send your message.");
      }

      form.reset();
      setFeedback({ type: "success", message: "Thanks! Your message has been sent." });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error.message || "Could not connect to the server. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="inner-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> CONTACT / START HERE</div>
        <h1>Have a challenge?<br /><span>Let’s talk it through.</span></h1>
        <p>Tell us what you’re working on, what’s getting in the way, or what you’d like to make possible.</p>
      </section>
      <section className="contact-page-content section-wrap">
        <div className="contact-page-card">
          <div className="contact-page-copy">
            <div className="eyebrow">SAY HELLO</div>
            <h2>Tell us what’s<br /><span>on your mind.</span></h2>
            <p>Share a little about what you’re working on and our team will get back to you.</p>
            <form className="contact-form" onSubmit={handleContactSubmit}>
              <div className="form-field">
                <label htmlFor="contact-full-name">Full name</label>
                <input id="contact-full-name" name="fullName" type="text" autoComplete="name" placeholder="Your name" required />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">Email address</label>
                <input id="contact-email" name="emailAddress" type="email" autoComplete="email" placeholder="you@example.com" required />
              </div>
              <div className="form-field form-field-wide">
                <label htmlFor="contact-subject">Subject</label>
                <input id="contact-subject" name="subject" type="text" placeholder="What would you like to discuss?" required />
              </div>
              <div className="form-field form-field-wide">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" rows="5" placeholder="Tell us a little about your project..." required />
              </div>
              {feedback.message && (
                <p className={`form-note ${feedback.type}`} role="status" aria-live="polite">
                  {feedback.message}
                </p>
              )}
              <button className="button button-dark form-submit" type="submit" disabled={submitting}>
                {submitting ? "Sending..." : "Send message"} <ArrowIcon diagonal />
              </button>
              <p className="form-note">
                Your message will be sent securely and saved for the team to review.
              </p>
            </form>
          </div>
          <div className="contact-page-side">
            <div className="contact-illustration" aria-hidden="true">
              <div className="illustration-orbit illustration-orbit-one" />
              <div className="illustration-orbit illustration-orbit-two" />
              <svg className="mail-illustration" viewBox="0 0 240 190" fill="none">
                <rect x="39" y="45" width="162" height="111" rx="8" fill="#A7CFCC" />
                <path d="M45 54L115 109C118 111.4 122 111.4 125 109L195 54" stroke="#285956" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M47 146L98 101M193 146L143 101" stroke="#3C7F7A" strokeWidth="5" strokeLinecap="round" />
                <circle cx="190" cy="41" r="17" fill="#E5F0EE" />
                <path d="M190 32V50M181 41H199" stroke="#3C7F7A" strokeWidth="3" strokeLinecap="round" />
                <circle cx="46" cy="35" r="5" fill="#3C7F7A" />
                <circle cx="205" cy="132" r="4" fill="#78A9A4" />
              </svg>
              <span className="illustration-caption">GOOD THINGS<br />START WITH A HELLO</span>
            </div>
            <div className="contact-detail"><small>EMAIL</small><a href="mailto:hello@datoviaplayhouse.com">hello@datoviaplayhouse.com</a></div>
            <div className="contact-detail"><small>PHONE</small><a href="tel:+916000034322">(+91) 6000-034-322</a></div>
            <div className="contact-detail"><small>NRRD OFFICE</small><address>House No. 210, Ashraful House, 2nd Floor, Shernagar, Dhubri, Assam – 783335, India</address></div>
          </div>
        </div>
      </section>
    </main>
  );
}

const privacySections = [
  {
    title: "1. Introduction and scope",
    paragraphs: [
      "Datovia Playhouse LLP (Datovia Playhouse, we, us, or our) respects your privacy and is committed to protecting personal information handled through our website, business activities, and services. This policy explains how information may be collected, used, shared, retained, and protected when you visit datoviaplayhouse.com, contact us, apply for work, participate in a data collection project, work with us as a freelancer or vendor, or engage with us as a client or business partner.",
      "Our services include multilingual data and language work such as transcription, translation, localization, audio data collection, annotation, data labeling, language evaluation, quality assurance, and datasets for AI and machine-learning applications. Additional privacy notices, consent forms, data-processing terms, or project agreements may apply to particular activities. Where law requires consent for a processing activity, we will seek it separately; website use alone does not constitute consent.",
    ],
  },
  {
    title: "2. Information we collect",
    paragraphs: [
      "Information you provide may include your name, email address, telephone number, country, business name, job title, qualifications, language proficiency, work history, project preferences, messages, inquiries, quotations or proposals requested, applications, onboarding details, invoices, tax or payment information, and information you provide when participating in surveys, interviews, recordings, or other projects.",
      "Depending on the website configuration and technologies in use, technical information may be collected when you visit, such as your IP address, browser and device details, operating system, pages visited, approximate time spent, referral source, access logs, cookie identifiers where enabled, and performance or diagnostic information.",
      "We may receive relevant information from clients, authorized representatives, project partners, recruitment partners, payment providers, vendors, or other organizations we work with. We expect those sources to have an appropriate legal basis and permissions to share it.",
      "For language data and AI projects, information may include audio or voice recordings, video or images, transcripts, translations, annotations, language assessments, speaker or project identifiers, task metadata, language, dialect or accent attributes, recording quality, task acceptance details, consent records, and participation information. Project notices and agreements describe the specific information involved. Whether voice data is biometric or otherwise specially regulated depends on its nature, use, processing, and applicable law.",
    ],
  },
  {
    title: "3. How we use information",
    paragraphs: [
      "We may use information to operate, secure, troubleshoot, and improve the website; respond to inquiries and maintain business relationships; deliver and coordinate services; recruit, onboard, and manage project participation; assign tasks, review submissions, perform quality assurance, and coordinate project delivery; process invoices, payments, accounting, and tax records; prepare, organize, annotate, license, and deliver datasets under applicable permissions and agreements; and support authorized AI or machine-learning projects.",
      "We may also use information to prevent fraud and misuse, protect systems and operations, meet legal, regulatory, contractual, and recordkeeping obligations, improve business and service quality, and send service or marketing communications where legally permitted. We will not use information for a materially different purpose where additional notice, consent, or another legal basis is required and has not been obtained.",
    ],
  },
  {
    title: "4. Legal grounds for processing",
    paragraphs: [
      "Where applicable law requires a legal basis, processing may rely on your consent, steps requested by you before entering into a contract, performance of a contract, compliance with legal obligations, or another lawful basis recognized by the relevant law. You may withdraw consent where permitted; withdrawal does not affect processing lawfully completed before it. Separate participant, service, and data-processing agreements may provide additional details.",
    ],
  },
  {
    title: "5. How we share information",
    paragraphs: [
      "We may share relevant information with service providers supporting website hosting, infrastructure, business email and communications, project management, collaboration, secure storage and data processing, payments and finance, recruitment and verification, administration, security, analytics, or technical support. We aim to limit sharing to what is reasonably necessary and use appropriate contractual and security measures where required.",
      "For an agreed project, we may share project information and deliverables—including approved recordings, transcripts, annotations, or related metadata—with clients, authorized partners, or recipients identified in the applicable agreement, subject to participant permissions and law.",
      "We may also disclose information to comply with law, valid legal process or lawful public-authority requests; protect rights and safety, investigate suspected fraud, or enforce agreements; or as part of a merger, restructuring, financing, acquisition, or asset transfer, subject to applicable law and safeguards.",
      "Datovia Playhouse LLP does not sell personal information for money. Processing or sharing in an authorized service, dataset, or AI project must still follow its agreement, relevant permissions, and applicable law.",
    ],
  },
  {
    title: "6. Data protection and security",
    paragraphs: [
      "We use reasonable safeguards appropriate to the information and risks to help protect personal information from unauthorized access, loss, misuse, alteration, disclosure, or destruction. Depending on the system or project, measures may include role-based access, confidentiality obligations, secure transfer and storage, account protection, data minimization, controlled sharing, monitoring, incident response, and contractual requirements for service providers.",
      "No electronic storage or transmission method is completely secure. If a personal data breach occurs, we will assess and address it and notify affected individuals or authorities where required by law. You are responsible for protecting credentials, devices, and confidential information you access through our services.",
    ],
  },
  {
    title: "7. Data retention",
    paragraphs: [
      "We retain personal information only as long as reasonably necessary for its purpose, subject to legal, contractual, and operational requirements. Retention may depend on the relationship and project, recordkeeping obligations, legal claims, consent, security, fraud prevention, and dispute resolution. Recruitment records may be retained for recruitment administration, while financial records may be retained for legally required accounting periods. Audio, transcripts, and dataset materials may have project-specific retention, deletion, or licensing terms. When information is no longer needed, we take reasonable steps to delete, anonymize, or securely dispose of it, subject to law and applicable agreements.",
    ],
  },
  {
    title: "8. Your privacy rights and choices",
    paragraphs: [
      "Depending on your location and applicable law, you may be able to ask what personal information we process, request access, correction or deletion, withdraw consent, request restriction or object to certain processing, request a portable copy, opt out of marketing, or raise a concern with a data protection authority. These rights are subject to legal conditions and exceptions; we may need to retain information to comply with law, perform a contract, or establish or defend legal claims.",
      "To submit a request, email privacy@datoviaplayhouse.com with the subject “Privacy Request — DatoviaPlayHouse LLP” and enough detail to identify the relevant records. We may request reasonable information to verify your identity or authority. We respond within the period required by applicable law and explain any refusal where legally required. We will not require you to waive legal rights as a condition of making a request.",
    ],
  },
  {
    title: "9. Marketing communications",
    paragraphs: [
      "We may send service-related messages necessary to respond to inquiries, administer projects, provide updates, or manage a business relationship. Where legally permitted, we may send marketing about our services, company news, or opportunities; we obtain prior consent where required. Opt out using an unsubscribe link where available or by emailing privacy@datoviaplayhouse.com. We may still send necessary transactional, contractual, security, or administrative communications.",
    ],
  },
  {
    title: "10. International data transfers",
    paragraphs: [
      "We may work with clients, vendors, freelancers, service providers, and project partners in different countries. Information may therefore be accessed, processed, or transferred across borders for authorized purposes. Where transfers are legally restricted, we take steps to meet applicable requirements and use appropriate safeguards where required, such as contractual protections, access restrictions, and data minimization.",
    ],
  },
  {
    title: "11. Third-party websites and services",
    paragraphs: [
      "This policy does not govern third-party websites or platforms we do not control. Review their privacy policies and terms before providing information. We are not responsible for independent third-party privacy practices except where applicable law or an agreement makes us responsible.",
      "This website loads fonts from Google Fonts. When your browser requests those fonts, Google may receive technical information such as your IP address and browser details. Google's handling of that information is governed by Google's own privacy information. This website may also link to third-party sites.",
    ],
  },
  {
    title: "12. Children’s privacy",
    paragraphs: [
      "Our website is intended for individuals aged 18 and older. We do not knowingly collect personal information from children under 18 through the website without an appropriate legal basis and required permissions or safeguards. A project involving minors requires separate project review, appropriate notices, valid parental or guardian permissions where required, and safeguards mandated by law. If you believe a child has inappropriately provided us information, contact privacy@datoviaplayhouse.com.",
    ],
  },
  {
    title: "13. Website contact form",
    paragraphs: [
      "The website does not have account registration or online submission. The contact form opens your default email application with the details you entered and a message addressed to hello@datoviaplayhouse.com; the website itself does not send or store that message. Your email application and provider handle it if you choose to send it. If you email us directly, we receive the information in your message and associated contact details.",
    ],
  },
  {
    title: "14. Changes to this privacy policy",
    paragraphs: [
      "We may update this policy to reflect changes in our operations, website technologies, services, or legal requirements. The latest version will be published on this page. Where a material change requires additional notice or consent, we will take the required steps. We encourage you to review this policy periodically.",
    ],
  },
  {
    title: "15. Contact information",
    paragraphs: [
      "For questions, requests, complaints, or concerns about this policy or personal information, contact Datovia Playhouse LLP at privacy@datoviaplayhouse.com. For privacy-related inquiries, use the subject “Privacy Request — DatoviaPlayHouse LLP.” Our registered office is NRRD Office, House No. 210, Ashraful House, 2nd Floor, Shernagar, Dhubri, Assam – 783335, India.",
    ],
  },
  {
    title: "16. Cookie policy",
    paragraphs: [
      "Cookies are small text files that websites may store on your device. Similar technologies can include pixels, tags, scripts, and local storage. Their actual use depends on the website configuration and integrated services.",
      "This website currently does not implement analytics, advertising, or cookie preference tools in its application code. It loads Google Fonts, which may involve third-party technical requests. The deployed hosting configuration and any future integrations should be checked to confirm whether additional cookies or similar technologies are used.",
      "In general, strictly necessary cookies may support essential requested functions where permitted by law. Functional cookies may remember preferences; analytics cookies may measure website use and performance; advertising cookies, if implemented, may measure or personalize promotions. We will seek consent before activating non-essential cookies where required by law. We do not claim that these optional categories are currently in use.",
    ],
  },
  {
    title: "17. Cookie duration and third parties",
    paragraphs: [
      "Session cookies generally expire when a browser session ends; persistent cookies remain until they expire or are deleted. Actual duration depends on each cookie’s provider and configuration. First-party cookies are set by the website domain; third-party cookies may be set by external services integrated into the site. Third parties may process information under their own terms and privacy policies.",
    ],
  },
  {
    title: "18. Cookie preferences and browser controls",
    paragraphs: [
      "If a cookie preference tool becomes available, you can use it to accept or reject non-essential categories, select categories, change preferences, or withdraw consent where applicable. Strictly necessary cookies may continue where essential and permitted by law. Preferences may reset if you clear browser data or use another device or browser.",
      "Most browsers allow you to view, block, or delete cookies through privacy or security settings. Blocking cookies may affect some website features. Browser settings may not provide the same controls as a website preference tool, where one is available.",
    ],
  },
  {
    title: "19. Cookie transparency and updates",
    paragraphs: [
      "The cookie inventory, purposes, providers, and durations should be verified against the live website configuration, rather than assumed. If analytics, advertising, or other non-essential technologies are introduced, this policy should be updated and required consent obtained before those technologies are activated. We may update this Cookie Policy as technologies and legal requirements change and will seek renewed consent for material changes where required.",
    ],
  },
];

const termsSections = [
  {
    title: "1. Acceptance of the terms",
    paragraphs: [
      "These terms govern your access to and use of the Datovia Playhouse LLP website, including its content, features, resources, and services made available through the website. Datovia Playhouse provides language and localization services, multilingual data solutions, transcription, translation, annotation, data labeling, audio data collection, language evaluation, and related AI data services.",
      "By accessing or using the website, you agree to these terms and the applicable Privacy Policy. If you do not agree, discontinue use of the website. The website is intended for individuals aged 18 or older and for businesses or other legal entities acting through authorized representatives. You represent that you have the legal capacity and authority to accept these terms.",
    ],
  },
  {
    title: "2. Changes to these terms",
    paragraphs: [
      "We may revise these terms at our discretion and publish changes on this page. Unless applicable law requires otherwise, changes take effect when published and apply to subsequent website use. Continued use after publication indicates acceptance to the extent permitted by law. Amendments to separate service or data agreements are governed by those agreements.",
    ],
  },
  {
    title: "3. Website access",
    paragraphs: [
      "We may modify, suspend, restrict, or discontinue any part of the website, subject to applicable law and contractual obligations. We do not guarantee uninterrupted, secure, error-free, or continuous availability and may restrict access for maintenance, security, operational, or legal reasons.",
      "You are responsible for arranging access, providing accurate and complete information through website forms or inquiries, maintaining the confidentiality of any credentials issued to you, reporting suspected unauthorized access, and complying with applicable laws. Do not knowingly provide false, misleading, fraudulent, or unauthorized information. Information submitted through the website is subject to our Privacy Policy.",
    ],
  },
  {
    title: "4. Intellectual property",
    paragraphs: [
      "Unless stated otherwise, website content—including text, graphics, logos, branding, designs, layouts, visual materials, and software—is owned by or licensed to Datovia Playhouse LLP and protected by applicable intellectual property laws. Rights remain with their respective owners. We grant you a limited, revocable, non-exclusive, non-transferable right to access and use the website for lawful informational and business purposes.",
      "Except as permitted in writing or by law, do not reproduce, distribute, commercially exploit, modify, or create derivative works from website materials; remove proprietary notices; misuse our branding or imply an unauthorized affiliation; or reverse-engineer protected software. Third-party names, trademarks, and logos remain the property of their owners.",
      "If you voluntarily provide feedback or suggestions, you permit us to evaluate and use them in our operations and services on a non-exclusive, worldwide, royalty-free basis to the extent permitted by law. This does not transfer ownership of your confidential information, personal data, or independently owned intellectual property.",
    ],
  },
  {
    title: "5. Website content and dataset samples",
    paragraphs: [
      "Website descriptions, projects, demonstrations, language capabilities, and sample materials are provided for informational and evaluation purposes unless expressly stated otherwise. Sample datasets, recordings, images, transcripts, annotations, or other demonstration materials may be used only for personal evaluation, demonstration, or internal non-commercial testing unless a separate written agreement authorizes more.",
      "Without written authorization, do not sell, sublicense, redistribute, publish, or commercially exploit samples; use them to train, fine-tune, evaluate, or develop commercial AI systems; attempt to identify or re-identify individuals or extract confidential information; remove usage notices; or violate privacy, intellectual property, contractual, or legal rights.",
      "Commercial dataset access, licensing, delivery, customization, and use must be agreed in writing. The applicable agreement sets the permitted purpose, scope, duration, territory, redistribution rights, confidentiality, and security requirements. A website description or sample does not grant ownership or unrestricted dataset rights. Use reasonable safeguards and follow applicable privacy, data protection, confidentiality, and security requirements when handling materials.",
    ],
  },
  {
    title: "6. Permitted website use",
    paragraphs: [
      "Use the website only for lawful purposes. Do not engage in fraud, impersonation, deception, or harassment; submit false credentials or project information; infringe others’ rights; send spam or malicious code; interfere with website operation or security; or attempt unauthorized access to systems, accounts, or restricted areas.",
      "Do not scrape or collect website content using automated tools without written authorization, except where law permits. Do not conduct unauthorized vulnerability or penetration testing, misrepresent an affiliation or endorsement, evade restrictions through multiple accounts where accounts are offered, or unlawfully collect personal information. We may investigate suspected violations and take proportionate action consistent with applicable law.",
    ],
  },
  {
    title: "7. User submissions",
    paragraphs: [
      "The website may allow inquiries, feedback, applications, proposals, vendor information, project requirements, comments, or other submissions. You are responsible for ensuring submissions are accurate, lawful, non-malicious, do not infringe rights or disclose another party’s confidential information without authorization, and comply with privacy and data protection laws. You represent that you have the rights and permissions needed to submit them.",
      "You authorize us to use submissions as reasonably necessary to receive, review, respond, and communicate with you about the requested services or engagement, subject to our Privacy Policy and applicable law. We do not acquire ownership of your underlying intellectual property solely because you submit it. Separate agreements govern materials they cover. We may decline or restrict submissions that we reasonably believe violate these terms or law.",
    ],
  },
  {
    title: "8. Confidentiality and personal information",
    paragraphs: [
      "Website submissions may include business contact details, project specifications, applications, or other operational information. Our processing of personal information is governed by our Privacy Policy and applicable law.",
      "Do not submit passwords, payment-card details, sensitive personal information, confidential client datasets, or other restricted materials through general website forms unless the channel is expressly designed and authorized for that purpose. Use an appropriate secure channel and, where needed, a separate written confidentiality agreement to exchange confidential information. These terms do not override separate confidentiality obligations.",
    ],
  },
  {
    title: "9. Business inquiries and services",
    paragraphs: [
      "Website services may include translation, transcription, localization, language quality assurance, multilingual audio, text, image, and video data collection, annotation, data labeling, dataset preparation, language evaluation, speech data, AI data support, vendor recruitment, and project coordination.",
      "Website descriptions, examples, language coverage, availability, and estimated delivery capabilities are informational and are not a binding offer or guarantee of availability, volume, pricing, delivery dates, or project acceptance. Fees, payment schedules, deliverables, quality standards, acceptance criteria, licensing, confidentiality, data protection, and liability must be established in a proposal, purchase order, statement of work, service agreement, or other written contract. That agreement governs the contracted services.",
    ],
  },
  {
    title: "10. Recruitment, freelancers, and vendors",
    paragraphs: [
      "Information about projects, vacancies, freelance opportunities, vendor onboarding, and recruitment is informational unless expressly stated otherwise. An application, profile, proposal, or inquiry does not guarantee selection, onboarding, project allocation, employment, or engagement.",
      "Engagements are subject to applicable contracts, project instructions, eligibility criteria, and verification procedures. Applicants and vendors must provide accurate information and must not submit fraudulent documents or misrepresent their identity or qualifications. We may request further information, reject applications, or discontinue onboarding in accordance with law and applicable agreements. Payment, task acceptance, and project quality requirements are governed by the relevant written agreement or project terms.",
    ],
  },
  {
    title: "11. Monitoring, suspension, and termination",
    paragraphs: [
      "To the extent permitted by law, we may investigate suspected misuse, restrict violating content, suspend website access where reasonably necessary for security or legal compliance, refer suspected unlawful activity to authorities where appropriate or required, and take reasonable steps to protect the website, users, partners, and intellectual property.",
      "We may suspend or terminate access for material violations, misuse, or conduct creating a legitimate security, legal, or operational risk. Where reasonably practicable and legally appropriate, we may provide notice or an opportunity to address the issue. Ending website access does not automatically end a separate service agreement, dataset license, or contract. Payments, refunds, suspension, and cancellation of contracted work are governed by the applicable agreement and law.",
    ],
  },
  {
    title: "12. Reliance on website information",
    paragraphs: [
      "Website information is provided for general informational purposes. We endeavor to keep it useful but do not guarantee it is complete, current, error-free, or suitable for every purpose. Service descriptions, samples, language lists, technical information, announcements, and illustrative results may change. Verify material information with us before relying on it for commercial, technical, legal, or operational decisions. Third-party information remains the responsibility of its provider; its inclusion does not necessarily imply endorsement.",
    ],
  },
  {
    title: "13. Third-party websites and services",
    paragraphs: [
      "The website may link to third-party websites, applications, platforms, or services for convenience or information. We do not control and are not responsible for their content, security, availability, policies, or practices. Their own terms and privacy policies govern your use. A link alone does not imply sponsorship, partnership, endorsement, or authorization by Datovia Playhouse LLP.",
    ],
  },
  {
    title: "14. Links to our website",
    paragraphs: [
      "You may link to our homepage if the link is lawful, fair, not misleading, does not damage our reputation, and does not imply an unauthorized association, partnership, sponsorship, or endorsement. Do not frame the website misleadingly, misrepresent your relationship with us, use our branding without authorization, or link from unlawful or rights-infringing content. We may request removal of unauthorized links where appropriate and permitted by law.",
    ],
  },
  {
    title: "15. Disclaimer of warranties",
    paragraphs: [
      "To the maximum extent permitted by applicable law, the website and its content are provided “as is” and “as available.” We do not warrant continuous or uninterrupted availability, freedom from errors or security vulnerabilities, accuracy or completeness of information, suitability for your requirements, or that downloadable materials will always be free from harmful components. You are responsible for device security, backups, and safeguards when accessing or downloading materials.",
      "Nothing in these terms excludes or limits any warranty, right, or remedy that cannot lawfully be excluded or limited.",
    ],
  },
  {
    title: "16. Limitation of liability",
    paragraphs: [
      "To the maximum extent permitted by law, Datovia Playhouse LLP and its partners, employees, representatives, and service providers will not be liable for indirect, incidental, special, consequential, exemplary, or punitive losses arising from website access or use, including loss of profits, business opportunities, anticipated savings, data, goodwill, or business interruption where legally permissible.",
      "We are not responsible for losses arising from circumstances beyond our reasonable control, unauthorized access caused by factors outside that control, third-party websites, or misuse of website materials. Nothing excludes or limits liability for fraud, willful misconduct, gross negligence where exclusion is prohibited, death or personal injury where prohibited, or other liability that cannot legally be limited. Contracted services and dataset licensing are governed by their applicable written agreement and law.",
    ],
  },
  {
    title: "17. Indemnification",
    paragraphs: [
      "To the extent permitted by law, you are responsible for losses, claims, liabilities, and reasonable costs arising directly from your unlawful website use, material breach of these terms, or infringement of another party’s rights through materials you submit. Where legally attributable to your conduct, you agree to indemnify Datovia Playhouse LLP and its partners, personnel, and authorized service providers against resulting third-party claims and reasonable legal expenses. This does not require indemnification for our own unlawful conduct or waive rights that cannot be waived.",
    ],
  },
  {
    title: "18. Governing law and jurisdiction",
    paragraphs: [
      "These terms are governed by the laws of India, subject to applicable conflict-of-law rules and mandatory legal requirements. Disputes relating to these terms or website use are subject to the competent courts in India, with venue determined by applicable law and relevant facts. A valid dispute-resolution, arbitration, or jurisdiction clause in a separate written agreement governs disputes within its scope. Nothing limits mandatory rights or remedies under applicable law.",
    ],
  },
  {
    title: "19. Waiver and severability",
    paragraphs: [
      "Failure to enforce a provision on one occasion does not waive the right to enforce it later. If a provision is unlawful, invalid, or unenforceable, it will be limited or severed to the minimum extent necessary, and the remaining provisions continue to apply to the extent permitted by law.",
    ],
  },
  {
    title: "20. Entire agreement",
    paragraphs: [
      "These terms, together with the applicable Privacy Policy and any other website policies expressly incorporated by reference, govern general access to and use of the website. They do not replace or override separate written agreements for services, employment or freelance engagements, dataset licensing, confidentiality, or other commercial arrangements. Where a separate agreement expressly governs a matter, it applies to that matter to the extent of any inconsistency, subject to applicable law.",
    ],
  },
];

const dataGovernanceSections = [
  {
    title: "Purpose",
    paragraphs: [
      "This policy describes the framework Datovia Playhouse LLP uses to govern, protect, manage, and monitor data throughout its lifecycle, with the aim of meeting applicable legal requirements, client contractual obligations, and internal standards.",
      "It applies to operations involving data collection, processing, annotation, transcription, translation, localization, AI training, quality assurance, and related services.",
    ],
  },
  {
    title: "Scope",
    paragraphs: [
      "This policy applies to employees, contractors, freelancers, vendors, project participants, temporary staff, and third-party service providers who handle data for Datovia Playhouse LLP.",
      "It covers client data, participant information, confidential business information, and company records processed in connection with our work.",
    ],
  },
  {
    title: "Data governance principles",
    paragraphs: [
      "Our governance principles are accountability, transparency, lawful processing, data minimization, purpose limitation, accuracy, confidentiality, integrity, availability, and continuous improvement.",
    ],
  },
  {
    title: "Data classification",
    paragraphs: [
      "Information is classified according to its sensitivity and intended use. Public information is approved for public release. Internal information is intended for business use within the organization. Confidential information includes client information, project documents, pricing, operational procedures, and proprietary business information.",
      "Restricted information requires the highest level of protection and may include personal or sensitive personal information, authentication credentials, financial records, confidential client datasets, AI training datasets, and security information.",
    ],
  },
  {
    title: "Roles and responsibilities",
    paragraphs: [
      "Management is responsible for approving governance policies, allocating appropriate resources, monitoring compliance, and reviewing governance performance.",
      "Project managers are responsible for checking project and client requirements, monitoring project security, and reporting compliance concerns. Employees and contractors must follow company policies, protect confidential information, report incidents promptly, and complete required compliance training.",
    ],
  },
  {
    title: "Data lifecycle management",
    paragraphs: [
      "Data is managed through its lifecycle, including collection, validation, processing, quality assurance, secure storage, secure transmission, retention, and secure deletion. Each stage should follow documented procedures and the applicable project instructions.",
    ],
  },
  {
    title: "Security controls and access management",
    paragraphs: [
      "Safeguards may include role-based access controls, password protection, multi-factor authentication where applicable, encryption during storage and transmission, secure backups, endpoint protection, network monitoring, regular security updates, audit logging, and restricted administrative access.",
      "Access to client information is granted only on a need-to-know basis, approved as appropriate, limited according to job responsibilities, reviewed periodically, and removed when no longer required.",
    ],
  },
  {
    title: "Compliance and risk management",
    paragraphs: [
      "Data handling must follow applicable privacy and data protection laws, client contractual obligations, confidentiality agreements, internal procedures, ethical standards, and information security requirements.",
      "Periodic risk assessments identify security, operational, compliance, and privacy risks. Appropriate mitigation measures are implemented and monitored.",
    ],
  },
  {
    title: "Incident management",
    paragraphs: [
      "Any suspected security or compliance incident should be reported immediately to the project contact or hello@datoviaplayhouse.com. The incident will be assessed and, as appropriate, investigated and contained; affected clients will be notified where required; corrective actions will be implemented; and incident records will be maintained.",
    ],
  },
  {
    title: "Compliance reviews and audits",
    paragraphs: [
      "Internal compliance reviews are conducted to assess adherence to company policies, client requirements, data protection obligations, and information security procedures. Management reviews findings and oversees corrective actions.",
    ],
  },
  {
    title: "Ethical business conduct",
    paragraphs: [
      "Personnel are expected to conduct business honestly, fairly, and professionally. Bribery, corruption, fraud, conflicts of interest, other unethical business practices, and unauthorized disclosure of confidential information are not acceptable.",
    ],
  },
  {
    title: "Vendor compliance",
    paragraphs: [
      "Third-party vendors must maintain confidentiality, protect client information, comply with applicable laws and contractual obligations, and follow company security requirements. Failure to meet these requirements may result in suspension or termination of the business relationship, subject to applicable agreements.",
    ],
  },
  {
    title: "Training and awareness",
    paragraphs: [
      "Personnel receive periodic training on data protection, information security, privacy, confidentiality, ethical conduct, incident reporting, and client-specific compliance requirements.",
    ],
  },
  {
    title: "Policy violations",
    paragraphs: [
      "Violations may result in corrective action, suspension of system access, termination of a contract or engagement, or legal action where applicable.",
    ],
  },
  {
    title: "Review and updates",
    paragraphs: [
      "This policy is reviewed annually and when significant legal, regulatory, client, or operational changes occur. Project-specific contracts and instructions apply where they set more specific requirements.",
    ],
  },
];

const remoteWorkSecuritySections = [
  {
    title: "Purpose and who this applies to",
    paragraphs: [
      "This agreement sets security responsibilities for employees, freelancers, contractors, vendors, and consultants who work remotely and access Datovia Playhouse systems, client information, or confidential data. It applies when using Company-issued devices, approved personal devices, cloud platforms, project portals, and communication systems. It supplements any stricter project, client, or legal requirements.",
    ],
  },
  {
    title: "User responsibilities and device security",
    paragraphs: [
      "Protect Company and client information from unauthorized access, use devices only for authorized business purposes, follow applicable security procedures, and maintain confidentiality of project information.",
      "Devices used for Company work must have a strong password, automatic screen locking, current operating-system and security updates, active antivirus or endpoint protection, and a firewall. Enable full-disk encryption where supported and protect devices from unauthorized physical access. Use only authorized devices and accounts, and do not disable security controls or change security configurations without authorization.",
    ],
  },
  {
    title: "Passwords, multi-factor authentication, and software",
    paragraphs: [
      "Enable multi-factor authentication for Company-supported systems whenever available. Do not share passwords, reuse Company passwords on personal accounts, or share access credentials. Use strong passwords and report suspected credential compromise immediately.",
      "Do not install unauthorized or pirated software, disable antivirus or other security protections, or make unauthorized changes to device security settings.",
    ],
  },
  {
    title: "Confidential information and secure working",
    paragraphs: [
      "Client information, project materials, business information, software, documentation, credentials, and data accessed during work are confidential. Do not copy confidential information without authorization, disclose it to unauthorized people, store it on unapproved cloud services, or use it for personal benefit. These confidentiality responsibilities continue after the engagement ends.",
      "Use trusted internet connections, avoid unsecured public Wi-Fi whenever possible, and use a VPN whenever required. Work where screens, conversations, documents, and devices cannot be viewed, overheard, or accessed by unauthorized people.",
    ],
  },
  {
    title: "Client data and incident reporting",
    paragraphs: [
      "Access client information only for assigned work, process it according to project instructions, store it securely, and return or delete it when instructed.",
      "Immediately report lost or stolen devices, malware, suspected unauthorized access, data breaches, phishing attempts, and security vulnerabilities to the IT Security Team at it-remote@datoviaplayhouse.com. Follow instructions to help contain and address the incident.",
    ],
  },
  {
    title: "Monitoring, return of property, and compliance",
    paragraphs: [
      "Company systems, devices, and client platforms may be monitored for security, compliance, and audit purposes, subject to applicable laws and contractual obligations.",
      "When requested or when an engagement ends, return Company property and securely return or delete Company documents, client information, access credentials, and storage media. Do not retain confidential information without authorization.",
      "Users must follow Company information security and data protection policies, privacy requirements, client security requirements, and applicable laws. Non-compliance may result in suspension of system access, removal from projects, termination of an employment or contract relationship, or other action permitted by applicable law and agreement.",
    ],
  },
  {
    title: "Applicable terms",
    paragraphs: [
      "This agreement forms part of the Company’s information security and remote work requirements and applies throughout the engagement. Applicable law and any client agreement may impose additional or different obligations; the relevant project and contractual requirements should be reviewed for each engagement.",
    ],
  },
];

function LegalPage({ title, description, sections, contactEmail = "hello@datoviaplayhouse.com" }) {
  return (
    <main className="inner-page legal-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / THE DETAILS</div>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <article className="section-wrap legal-document">
        <p className="legal-draft-note">
          Draft for review: this general website copy is not legal advice. Please confirm it reflects your actual practices and have it reviewed for your jurisdiction before publishing.
        </p>
        {sections.map((section) => (
          <section className="legal-section" key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <p className="legal-contact">Questions? <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      </article>
    </main>
  );
}

function PrivacyPolicyPage() {
  return (
    <LegalPage
      title="Privacy & cookie policy"
      description="How Datovia Playhouse handles personal information and cookies across our website, services, and projects."
      sections={privacySections}
      contactEmail="privacy@datoviaplayhouse.com"
    />
  );
}

function TermsPage() {
  return (
    <LegalPage
      title="Terms of use of the website"
      description="The terms governing access to and use of the Datovia Playhouse website."
      sections={termsSections}
    />
  );
}

function CaseStudiesPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / OUR WORK</div>
        <h1>Case studies</h1>
        <p>Examples of how language expertise, careful quality work, and scalable delivery help teams build better AI experiences.</p>
      </section>
      <section className="section-wrap content-page-body">
        <div className="case-study-list">
          {caseStudies.map((study, index) => (
            <article className={`case-study-card project-${index % 2 === 0 ? "blue" : "green"}`} key={study.title}>
              <div className="case-study-heading">
                <div className="case-study-heading-copy">
                  <div className="project-card-top">
                    <span>{study.type}</span>
                    <span className="project-number">0{index + 1}</span>
                  </div>
                  <h2>{study.title}</h2>
                  <p className="case-study-client">{study.client}</p>
                </div>
                <div className={`case-study-art case-study-art-${index + 1}`} aria-hidden="true">
                  <span className="case-study-orbit case-study-orbit-one" />
                  <span className="case-study-orbit case-study-orbit-two" />
                  <span className="case-study-art-center">{index === 0 ? "LANGUAGE × AI" : index === 1 ? "1,000+ HOURS" : "95%+ ACCURACY"}</span>
                  <span className="case-study-art-caption">{index === 1 ? "SPEECH DATA AT SCALE" : index === 2 ? "ANNOTATION FOR SPEECH AI" : "BUILT FOR EVERY VOICE"}</span>
                </div>
              </div>
              <p className="case-study-overview">{study.overview}</p>
              <div className="case-study-details">
                <section className="case-study-detail">
                  <h3>Project scope</h3>
                  <ul className="case-study-tags">{study.scope.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="case-study-detail">
                  <h3>The challenge</h3>
                  <ul>{study.challenge.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
                <section className="case-study-detail">
                  <h3>Our approach</h3>
                  <ol>{study.approach.map((item) => <li key={item}>{item}</li>)}</ol>
                </section>
                <section className="case-study-detail">
                  <h3>Outcomes</h3>
                  <ul>{study.outcomes.map((item) => <li key={item}>{item}</li>)}</ul>
                </section>
              </div>
              <Link className="case-study-cta text-link" to="/contact">Talk with us about a similar project <ArrowIcon diagonal /></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const faqs = [
  {
    question: "What does Datovia Playhouse do?",
    answer: "We help teams make complex data clearer and more useful through data strategy, analytics and insight, AI and automation, and digital experiences.",
  },
  {
    question: "How do I get started?",
    answer: "Get in touch and tell us what you’re trying to solve. We can learn more about your needs and discuss a suitable next step.",
  },
  {
    question: "Which industries or project sizes do you support?",
    answer: "The right fit depends on the challenge and the support you need. Contact us with a little context so we can understand your project.",
  },
  {
    question: "How can I ask about a partnership or supplier opportunity?",
    answer: "Email hello@datoviaplayhouse.com with a short introduction and the kind of opportunity you have in mind.",
  },
];

function FaqPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / HELP</div>
        <h1>Frequently asked questions</h1>
        <p>A few starting points about our work and how to get in touch.</p>
      </section>
      <section className="section-wrap content-page-body faq-list">
        {faqs.map(({ question, answer }) => (
          <article className="faq-item" key={question}>
            <h2>{question}</h2>
            <p>{answer}</p>
          </article>
        ))}
        <p className="faq-contact">Still have a question? <Link to="/contact">Contact our team</Link>.</p>
      </section>
    </main>
  );
}

function SolutionsPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / CAPABILITIES</div>
        <h1>Solutions</h1>
        <p>Practical support to help turn complex data challenges into clearer decisions and useful experiences.</p>
      </section>
      <section className="section-wrap content-page-body">
        <div className="solution-card-grid">
          {solutionCards.map((solution, index) => (
            <article className={`solution-card project-${index % 2 === 0 ? "blue" : "green"}`} key={solution.title}>
              <span className="solution-card-number">0{index + 1}</span>
              <h2>{solution.title}</h2>
              <p>{solution.description}</p>
              <h3>What we deliver</h3>
              <ul>{solution.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
              <Link className="solution-card-link" to="/contact">Discuss your project <ArrowIcon diagonal /></Link>
            </article>
          ))}
        </div>
        <Link className="button button-dark solution-cta" to="/contact">Discuss a project <ArrowIcon diagonal /></Link>
      </section>
    </main>
  );
}

const supplierCodeSections = [
  {
    title: "Integrity and lawful conduct",
    paragraphs: ["Suppliers are expected to act honestly, comply with applicable laws and regulations, and avoid bribery, corruption, fraud, and conflicts of interest."],
  },
  {
    title: "Respectful and fair work",
    paragraphs: ["Suppliers should treat people with dignity, provide a safe working environment, prohibit discrimination and harassment, and not use forced or child labor."],
  },
  {
    title: "Privacy, security, and responsible data use",
    paragraphs: ["Suppliers should protect confidential information and personal data, use them only for authorized purposes, and maintain safeguards appropriate to the information they handle."],
  },
  {
    title: "Environmental responsibility",
    paragraphs: ["Suppliers are encouraged to understand and reduce the environmental impacts of their operations and comply with applicable environmental requirements."],
  },
  {
    title: "Raising concerns",
    paragraphs: ["Suppliers may raise questions or concerns about this code by contacting hello@datoviaplayhouse.com. Retaliation for raising a concern in good faith is not acceptable."],
  },
];

function SupplierCodePage() {
  return (
    <LegalPage
      title="Supplier code of conduct"
      description="The principles we expect suppliers and business partners to follow when working with Datovia Playhouse."
      sections={supplierCodeSections}
    />
  );
}

function DataGovernancePage() {
  return (
    <LegalPage
      title="Data governance and compliance policy"
      description="Principles for responsible, secure, and compliant handling of data across its lifecycle."
      sections={dataGovernanceSections}
    />
  );
}

function RemoteWorkSecurityPage() {
  return (
    <LegalPage
      title="Remote work device security agreement"
      description="Security responsibilities for people accessing Datovia Playhouse systems, client information, or project data while working remotely."
      sections={remoteWorkSecuritySections}
      contactEmail="it-remote@datoviaplayhouse.com"
    />
  );
}


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      <Preloader />
      <MotionEffects />
      <ScrollToTop />
      <Routes>
        <Route path="admin" element={<AdminDashboard apiUrl={VITE_API_URL} />} />
        <Route element={<><SiteHeader /><Outlet /><SiteFooter /></>}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/apply" element={<CareerApplicationPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="solutions" element={<SolutionsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="case-studies" element={<CaseStudiesPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="supplier-code-of-conduct" element={<SupplierCodePage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms-and-conditions" element={<TermsPage />} />
          <Route path="data-governance-and-compliance-policy" element={<DataGovernancePage />} />
          <Route path="remote-work-device-security-agreement" element={<RemoteWorkSecurityPage />} />
          <Route path="*" element={<main className="inner-page section-wrap not-found"><h1>Page not found.</h1><Link className="button button-dark" to="/">Back to home <ArrowIcon /></Link></main>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
