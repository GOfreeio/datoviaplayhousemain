import React from "react";
import { Link, useParams } from "react-router-dom";

const blogPosts = [
  {
    slug: "datoviaplayhouse-powers-ai-through-high-quality-data",
    category: "Data & AI",
    title: "How DatoviaPlayHouse Powers Artificial Intelligence Through High-Quality Data Collection",
    subtitle:
      "Building Smarter AI Through Human Intelligence, Multilingual Data, and Reliable Data Solutions",
    image: "/images_blog/first_blog.jpeg",
    imageAlt: "A woman using her phone beside audio, image, video, and text data for AI training",
    excerpt:
      "Discover how DatoviaPlayHouse supports AI development with multilingual data collection, annotation, and quality-focused project delivery.",
    introduction: [
      "Artificial Intelligence is transforming the world, from voice assistants and chatbots to autonomous systems, machine translation, and advanced machine learning models. However, behind every intelligent AI system is something essential: high-quality data.",
      "AI models cannot learn, understand languages, recognize objects, or respond accurately without properly collected, structured, and annotated datasets.",
      "At DatoviaPlayHouse LLP, we help businesses, AI developers, technology companies, and research organizations build better AI systems through reliable, scalable, and multilingual data collection and data annotation services.",
      "Our mission is simple: to bridge the gap between human knowledge and artificial intelligence by providing the data that helps machines learn, understand, and improve.",
    ],
    sections: [
      {
        title: "1. How We Collect Data for AI Training",
        paragraphs: [
          "Data collection is the foundation of every successful AI project. At DatoviaPlayHouse, we follow a structured approach to collect relevant, diverse, and high-quality datasets according to each project’s requirements.",
          "Our data collection process includes:",
        ],
        subsections: [
          {
            title: "Audio and Speech Data Collection",
            paragraphs: [
              "We collect natural human speech recordings from speakers across different regions, languages, accents, and backgrounds. These recordings help AI systems understand human speech and improve voice recognition capabilities.",
              "Our audio collection services include:",
            ],
            items: [
              "Speech and conversational audio recording",
              "Wake-word and voice command recording",
              "Multilingual speech datasets",
              "Accent and dialect-specific recordings",
              "Natural dialogue and conversational speech",
              "Text-to-speech (TTS) recording datasets",
              "Automatic Speech Recognition (ASR) training data",
            ],
          },
          {
            title: "Image and Video Data Collection",
            paragraphs: [
              "Visual data plays an important role in computer vision and image recognition systems. We support image and video collection projects based on specific dataset requirements.",
              "Examples include:",
            ],
            items: [
              "Object and product image collection",
              "Real-world environment images",
              "Human activity and gesture datasets",
              "Video recording for AI model development",
              "Document and OCR image datasets",
            ],
          },
          {
            title: "Text and Language Data Collection",
            paragraphs: [
              "Language is one of the most important elements of modern AI. We support multilingual text collection to help AI models understand different languages, writing styles, and regional expressions.",
              "Our services include:",
            ],
            items: [
              "Text corpus collection",
              "Multilingual sentence collection",
              "Conversational text datasets",
              "Domain-specific content collection",
              "Translation and localization datasets",
              "Language and dialect-specific datasets",
            ],
          },
        ],
      },
      {
        title: "2. Supporting AI Through 300+ Languages and Dialects",
        paragraphs: [
          "AI should not be limited to a handful of widely spoken languages. It should understand people regardless of their geographical location or language.",
          "DatoviaPlayHouse supports multilingual data projects across Indian and international languages, with capabilities covering more than 300 languages and dialects, subject to project-specific resource availability.",
          "Our language network includes Hindi, Assamese, Bengali, Tamil, Telugu, Kannada, Marathi, Gujarati, Punjabi, Urdu, Odia, Nepali, Sanskrit, and many international languages.",
          "We also support specialized language requirements, including Arabic, Chinese, Japanese, Korean, Turkish, Thai, Polish, Portuguese, Spanish, French, and many others.",
          "Through our multilingual speaker and linguist network, we help AI companies develop datasets that represent different accents, cultures, and language variations.",
        ],
      },
      {
        title: "3. Data Annotation: Teaching AI What It Sees and Hears",
        paragraphs: [
          "Collecting data is only the beginning. AI models also need accurately labeled datasets to identify patterns and make meaningful predictions.",
          "Our annotation teams help transform raw data into structured, machine-readable training datasets.",
          "Our annotation capabilities include:",
        ],
        items: [
          "Image annotation and bounding boxes",
          "Object detection and classification",
          "Image segmentation",
          "Audio annotation and transcription",
          "Speaker identification and diarization",
          "Text classification and labeling",
          "Named Entity Recognition (NER)",
          "Sentiment and intent annotation",
          "Video annotation",
          "OCR annotation and document labeling",
          "Large Language Model (LLM) data annotation",
        ],
        closing:
          "We follow project-specific guidelines and quality-control procedures to maintain consistency and accuracy throughout the annotation process.",
      },
      {
        title: "4. How We Help Train AI Models",
        paragraphs: ["Our work supports different stages of the AI development lifecycle."],
        steps: [
          {
            title: "Understanding Project Requirements",
            description:
              "We work with clients to understand their AI training objectives, target languages, data formats, recording requirements, annotation guidelines, and delivery expectations.",
          },
          {
            title: "Data Collection",
            description:
              "We recruit suitable participants, native speakers, linguists, and domain-specific contributors to collect the required datasets.",
          },
          {
            title: "Data Processing",
            description:
              "Collected data is organized, checked, formatted, and prepared according to the client’s technical specifications.",
          },
          {
            title: "Data Annotation and Labeling",
            description:
              "Our trained teams annotate audio, images, videos, and text datasets using the required tools and guidelines.",
          },
          {
            title: "Quality Assurance",
            description:
              "We conduct quality checks, review samples, identify inconsistencies, and coordinate corrections to improve dataset reliability.",
          },
          {
            title: "Final Dataset Delivery",
            description:
              "After the required checks, datasets are delivered in the requested formats and according to the agreed project specifications.",
          },
        ],
      },
      {
        title: "5. Supporting the Next Generation of AI Technologies",
        paragraphs: [
          "DatoviaPlayHouse contributes to multiple AI development areas through data collection, localization, annotation, and language services.",
          "Our solutions support:",
        ],
        items: [
          "Artificial Intelligence (AI)",
          "Machine Learning (ML)",
          "Large Language Models (LLMs)",
          "Automatic Speech Recognition (ASR)",
          "Natural Language Processing (NLP)",
          "Computer Vision",
          "Text-to-Speech (TTS)",
          "Generative AI",
          "Voice AI and Conversational AI",
        ],
        closing:
          "By providing human-generated and human-validated datasets, we help organizations develop AI systems that are more capable of understanding real-world information.",
      },
      {
        title: "6. Why Choose DatoviaPlayHouse?",
        paragraphs: [
          "We understand that AI projects require more than just data. They require reliable execution, scalable resources, linguistic expertise, and consistent project management.",
          "What makes DatoviaPlayHouse a valuable data partner:",
        ],
        items: [
          "Multilingual Expertise: Access to a broad network of language professionals and native speakers.",
          "Scalable Workforce: Ability to coordinate large freelancer and vendor networks for high-volume projects.",
          "End-to-End Solutions: Support from data collection and transcription to annotation, localization, and quality control.",
          "Project Management: Dedicated coordination, recruitment, contributor onboarding, and delivery management.",
          "Quality-Focused Operations: Project-specific guidelines, review processes, and quality assurance.",
          "Global Language Coverage: Support for Indian and international language requirements.",
        ],
      },
      {
        title: "7. Our Vision: Building Better AI Through Better Data",
        paragraphs: [
          "The future of artificial intelligence depends on the quality, diversity, and accuracy of the data used to train it.",
          "At DatoviaPlayHouse LLP, we believe every language, voice, image, and human interaction can contribute to building more inclusive and intelligent AI technologies.",
          "We aim to become a trusted data solutions partner for AI companies, technology providers, research organizations, and enterprises worldwide.",
          "Whether you need multilingual speech datasets, conversational recordings, image annotation, LLM data labeling, or large-scale data collection, our team is ready to support your requirements.",
        ],
      },
      {
        title: "Let’s Build the Future of AI Together",
        paragraphs: [
          "Are you looking for a reliable partner for your next AI data collection or annotation project?",
          "Partner with DatoviaPlayHouse and turn real-world human data into valuable AI training resources.",
        ],
        website: "https://datoviaplayhouse.com",
        closing:
          "DatoviaPlayHouse LLP — Powering AI with Human Intelligence and Quality Data.",
      },
    ],
  },
];

function formatBlogTitle(title) {
  const [before, after] = title.split("PlayHouse");
  if (after === undefined) return title;
  return (
    <>
      {before}
      <span className="blog-title-highlight">PlayHouse</span>
      {after}
    </>
  );
}

function BlogArticleContent({ post }) {
  return (
    <div className="blog-article-body">
      <p className="blog-article-subtitle">{post.subtitle}</p>
      {post.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {post.sections.map((section) => (
        <section key={section.title}>
          <h2>{section.title}</h2>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.subsections?.map((subsection) => (
            <section key={subsection.title}>
              <h3>{subsection.title}</h3>
              {subsection.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <ul>{subsection.items.map((item) => <li key={item}>{item}</li>)}</ul>
            </section>
          ))}
          {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
          {section.steps && (
            <ol>
              {section.steps.map((step) => (
                <li key={step.title}><strong>{step.title}:</strong> {step.description}</li>
              ))}
            </ol>
          )}
          {section.website && (
            <p>
              Website: <a href={section.website}>{section.website}</a>
            </p>
          )}
          {section.closing && <p>{section.closing}</p>}
        </section>
      ))}
    </div>
  );
}

export default function BlogPage() {
  const { slug } = useParams();
  const selectedPost = blogPosts.find((post) => post.slug === slug);

  if (slug) {
    if (!selectedPost?.sections) {
      return (
        <main className="inner-page content-page">
          <section className="section-wrap blog-article-not-found">
            <h1>Article not found</h1>
            <Link to="/blog">Back to blog</Link>
          </section>
        </main>
      );
    }

    return (
      <main className="inner-page content-page">
        <section className="inner-hero section-wrap blog-article-hero">
          <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / IDEAS</div>
          <p className="blog-article-category">{selectedPost.category}</p>
          <h1>{formatBlogTitle(selectedPost.title)}</h1>
          <p>{selectedPost.subtitle}</p>
        </section>
        <article className="section-wrap blog-article-content">
          <img className="blog-article-image" src={selectedPost.image} alt={selectedPost.imageAlt} />
          <BlogArticleContent post={selectedPost} />
          <Link className="application-back-link" to="/blog">Back to blog</Link>
        </article>
      </main>
    );
  }

  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / IDEAS</div>
        <h1>Datovia <span className="blog-title-highlight">Playhouse</span> Blog</h1>
        <p>Notes and perspectives on data, AI, technology, and the people who make them useful.</p>
      </section>
      <section className="section-wrap content-page-body">
        <div className="blog-post-grid">
          {blogPosts.map((post) => post.sections ? (
            <Link
              className="blog-post-card blog-post-card-featured"
              key={post.slug}
              to={`/blog/${post.slug}`}
              aria-label={`Read article: ${post.title}`}
            >
              <img className="blog-post-image" src={post.image} alt={post.imageAlt} loading="lazy" />
              <div className="blog-post-meta"><span>{post.category}</span></div>
              <h2>{formatBlogTitle(post.title)}</h2>
              <p>{post.excerpt}</p>
              <span className="blog-post-read-more">Read article</span>
            </Link>
          ) : (
            <article className="blog-post-card" key={post.slug}>
              <img className="blog-post-image" src={post.image} alt={post.imageAlt} loading="lazy" />
              <div className="blog-post-meta"><span>{post.category}</span></div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
