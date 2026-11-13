import React from "react";
import { Link } from "react-router-dom";
import { ArrowIcon } from "./layout/SiteLayout.jsx";

const blogPosts = [];

export default function BlogPage() {
  return (
    <main className="inner-page content-page">
      <section className="inner-hero section-wrap">
        <div className="eyebrow"><span className="status-dot" /> DATOVIA PLAYHOUSE / IDEAS</div>
        <h1>Blog</h1>
        <p>Notes and perspectives on data, AI, technology, and the people who make them useful.</p>
      </section>
      <section className="section-wrap content-page-body">
        {blogPosts.length === 0 ? (
          <article className="content-notice">
            <span className="eyebrow">COMING SOON</span>
            <h2>We’re working on our first stories.</h2>
            <p>There aren’t any articles published yet. In the meantime, tell us what you’re working on and what you’d like to learn about.</p>
            <Link className="text-link" to="/contact">Talk with our team <ArrowIcon /></Link>
          </article>
        ) : (
          <div className="blog-post-grid">
            {blogPosts.map((post) => (
              <article className="blog-post-card" key={post.slug}>
                <div className="blog-post-meta">
                  <span>{post.category}</span>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
