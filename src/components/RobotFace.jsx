
import { useEffect, useRef } from "react";
import "./RobotFace.css";

const services = {
  image: [
    {
      title: "Bounding Box Labeling",
      description:
        "Accurate object identification for detection models.",
    },
    {
      title: "Polygon / Semantic Segmentation",
      description:
        "Fine-grained annotations for medical, retail, and automotive imagery.",
    },
    {
      title: "Keypoint / Landmark Mapping",
      description:
        "Pinpoint features for face, body, and gesture recognition.",
    },
    {
      title: "Classification & Tagging",
      description:
        "Multi-level labeling for diverse image taxonomies.",
    },
  ],

  video: [
    {
      title: "Object Detection & Tracking",
      description:
        "Persistent IDs and frame-to-frame continuity for moving objects.",
    },
    {
      title: "Action & Event Labeling",
      description:
        "Tag behaviors, interactions, and scene changes over time.",
    },
    {
      title: "Temporal Segmentation",
      description:
        "Mark shot boundaries, phases, or critical intervals.",
    },
    {
      title: "Keypoint & Pose Annotation",
      description:
        "Capture human motion for sports, safety, and ergonomics models.",
    },
    {
      title: "Multi-Label Attributes",
      description:
        "Add states such as speed, activity type, or risk level to each instance.",
    },
  ],

  speech: [
    {
      title: "Speaker Diarization",
      description:
        "Identify and label speakers in multi-party audio.",
    },
    {
      title: "Transcription Alignment",
      description:
        "Map spoken content with timestamps and word-level alignment.",
    },
    {
      title: "Intent & Entity Tagging",
      description:
        "Structure conversational data for chatbot, IVR, and NLP models.",
    },
    {
      title: "Acoustic Event Labeling",
      description:
        "Annotate background sounds, noise types, or environmental cues.",
    },
    {
      title: "Emotion & Sentiment Annotation",
      description:
        "Enrich speech data with tonal and affective context.",
    },
  ],

  text: [
    {
      title: "Named Entity Recognition (NER)",
      description:
        "Identify people, locations, organizations, and domain-specific terms.",
    },
    {
      title: "Part-of-Speech Tagging",
      description:
        "Grammar-based tokenization for syntactic parsing models.",
    },
    {
      title: "Text Classification",
      description:
        "Categorize documents, comments, or product data by topic or tone.",
    },
    {
      title: "Sentiment & Emotion Analysis",
      description:
        "Detect polarity and emotional gradients.",
    },
    {
      title: "Intent & Context Annotation",
      description:
        "Map user intents for chatbots and support systems.",
    },
    {
      title: "Content Moderation Tags",
      description:
        "Identify harmful, restricted, or policy-sensitive language.",
    },
  ],
};

function ServiceCard({
  className,
  icon,
  title,
  subtitle,
  number,
  items,
}) {
  return (
    <article
      className={`robot-info-card ${className}`}
      tabIndex={0}
    >
      <span className="robot-card-icon">{icon}</span>

      <div className="robot-card-copy">
        <h3>{title}</h3>
        <p>{subtitle}</p>

        <div className="card-expanded-content">
          {items.map((item) => (
            <div className="service-item" key={item.title}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <span className="robot-card-number">{number}</span>
    </article>
  );
}

export default function RobotFace() {
  const faceRef = useRef(null);

  useEffect(() => {
    const face = faceRef.current;
    if (!face) return;

    const moveEyes = (event) => {
      const rect = face.getBoundingClientRect();

      const dx =
        (event.clientX - (rect.left + rect.width / 2)) /
        (window.innerWidth / 2);

      const dy =
        (event.clientY - (rect.top + rect.height / 2)) /
        (window.innerHeight / 2);

      face.style.setProperty(
        "--eye-x",
        `${Math.max(-1, Math.min(1, dx)) * 7}px`
      );

      face.style.setProperty(
        "--eye-y",
        `${Math.max(-1, Math.min(1, dy)) * 5}px`
      );
    };

    const resetEyes = () => {
      face.style.setProperty("--eye-x", "0px");
      face.style.setProperty("--eye-y", "0px");
    };

    window.addEventListener("pointermove", moveEyes);
    window.addEventListener("blur", resetEyes);

    return () => {
      window.removeEventListener("pointermove", moveEyes);
      window.removeEventListener("blur", resetEyes);
    };
  }, []);

  return (
    <section className="robot-showcase">
      {/* Left card 1: Image */}
      <ServiceCard
        className="card-ai"
        icon="✳"
        title="Image"
        subtitle="Scalable, model-assisted image annotation workflows for computer vision training and model development."
        number="01"
        items={services.image}
      />

      {/* Left card 2: Video */}
      <ServiceCard
        className="card-data"
        icon="◈"
        title="Video"
        subtitle="Temporal, model-assisted video annotation for advanced computer vision and behavioral AI."
        number="02"
        items={services.video}
      />

      {/* Center robot */}
      <div className="robot-center">
        <div className="robot-scene">
          <div className="robot-head">
            <div className="robot-ear robot-ear-left" />
            <div className="robot-ear robot-ear-right" />

            <div className="robot-face" ref={faceRef}>
              <div className="robot-brow robot-brow-left" />
              <div className="robot-brow robot-brow-right" />

              <div className="robot-eye robot-eye-left">
                <div className="robot-pupil">
                  <span className="robot-eye-glint" />
                </div>
              </div>

              <div className="robot-eye robot-eye-right">
                <div className="robot-pupil">
                  <span className="robot-eye-glint" />
                </div>
              </div>

              {/* Optional smile */}
              {/*
              <div className="robot-smile">
                <span className="robot-smile-highlight" />
              </div>
              */}
            </div>

            <div className="robot-head-highlight" />
            <div className="robot-head-dot robot-dot-one" />
            <div className="robot-head-dot robot-dot-two" />
          </div>
        </div>

        <div className="robot-status">
          <span className="robot-status-dot" />
          YOUR AI COMPANION
        </div>
      </div>

      {/* Right card 1: Speech */}
      <ServiceCard
        className="card-automation"
        icon="↗"
        title="Speech"
        subtitle="Managed, model-assisted annotation for speech, audio, and conversational AI training."
        number="03"
        items={services.speech}
      />

      {/* Right card 2: Text */}
      <ServiceCard
        className="card-products"
        icon="▧"
        title="Text"
        subtitle="Scalable, model-assisted workflows for NLP training, classification, and entity extraction."
        number="04"
        items={services.text}
      />
    </section>
  );
}
