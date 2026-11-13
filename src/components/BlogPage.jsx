import React from "react";

const blogPosts = [
  {
    slug: "building-trustworthy-ai-data",
    category: "Data & AI",
    title: "Building trustworthy AI starts with better data",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=960&q=80",
    imageAlt: "Abstract visualization representing artificial intelligence",
    excerpt:
      "AI systems are shaped by the examples they learn from. Thoughtful data collection, clear annotation guidelines, and consistent review help teams build datasets that better reflect real-world needs.",
  },
  {
    slug: "why-human-review-matters",
    category: "Quality",
    title: "Why human review still matters in an automated world",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=960&q=80",
    imageAlt: "People collaborating around a laptop",
    excerpt:
      "Automation can help teams move faster, but context and nuance still matter. Human review helps identify ambiguity, catch edge cases, and keep quality standards aligned with the purpose of a project.",
  },
  {
    slug: "working-across-languages",
    category: "Language",
    title: "Working across languages means understanding context",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=960&q=80",
    imageAlt: "Digital globe illustrating connections across languages and regions",
    excerpt:
      "Language work is about more than replacing words. Cultural context, regional usage, and local expressions all contribute to content that feels clear and natural to the people it is meant for.",
  },
  {
    slug: "designing-better-data-collection",
    category: "Data Collection",
    title: "A thoughtful approach to data collection",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=960&q=80",
    imageAlt: "Team members working together at a table",
    excerpt:
      "Successful data collection begins with a clear purpose and a respectful process. Good planning helps participants understand what is expected and supports reliable, useful project outcomes.",
  },
  {
    slug: "consistency-in-data-annotation",
    category: "Data Operations",
    title: "How clear guidelines support consistent annotation",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=960&q=80",
    imageAlt: "Rows of data servers in a technology facility",
    excerpt:
      "Shared examples, practical instructions, and regular quality checks help annotation teams make consistent decisions, even when tasks involve complex or subjective material.",
  },
];

export default function BlogPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / IDEAS</div>
        <h1>Datovia <span className="blog-title-highlight">Playhouse</span> Blog</h1>
        <p>Notes and perspectives on data, AI, technology, and the people who make them useful.</p>
      </section>
      <section className="section-wrap content-page-body">
        <div className="blog-post-grid">
          {blogPosts.map((post) => (
            <article className="blog-post-card" key={post.slug}>
              <img className="blog-post-image" src={post.image} alt={post.imageAlt} loading="lazy" />
              <div className="blog-post-meta">
                <span>{post.category}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
