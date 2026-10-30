import React, { useState } from "react";
import { Link } from "react-router-dom";

export function ArrowIcon({ diagonal = false }) {
  return <span className="arrow" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

function Brand({ light = false, logo = false }) {
  return (
    <Link className={`brand${light ? " brand-light" : ""}`} to="/" aria-label="Datovia Playhouse home">
      {logo ? (
        <span className="brand-logo-crop" aria-hidden="true">
          <img src="/logos/datoviaplayhouselogo.png" alt="" />
        </span>
      ) : (
        <>
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-name">
            datovia<span>playhouse</span>
          </span>
        </>
      )}
    </Link>
  );
}

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand logo />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-navigation" className={menuOpen ? "nav-links nav-open" : "nav-links"} aria-label="Main navigation">
          <a href="/#work" onClick={closeMenu}>Our work</a>
          <a href="/#services" onClick={closeMenu}>Capabilities</a>
          <Link to="/about" onClick={closeMenu}>About</Link>
          <Link to="/careers" onClick={closeMenu}>Careers</Link>
          <Link className="nav-contact" to="/contact" onClick={closeMenu}>Contact <ArrowIcon diagonal /></Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-wrap footer-main">
        <div className="footer-brand-col">
          <Brand light logo />
        </div>
        <div className="footer-links-col">
          <span className="footer-label">EXPLORE</span>
          <a href="/#work">Our work</a><Link to="/about">About</Link><Link to="/careers">Careers</Link>
        </div>
        <div className="footer-links-col">
          <span className="footer-label">SOLUTIONS</span>
          <a href="/#services">Capabilities</a><Link to="/solutions">Our solutions</Link>
        </div>
        <div className="footer-links-col">
          <span className="footer-label">RESOURCES</span>
          <Link to="/blog">Blog</Link><Link to="/case-studies">Case studies</Link><Link to="/faq">FAQ</Link>
        </div>
        <div className="footer-links-col">
          <span className="footer-label">SAY HELLO</span>
          <Link to="/contact">Contact us</Link>
          <a href="mailto:hello@datoviaplayhouse.com">hello@datoviaplayhouse.com</a>
          <a href="tel:+916000034322">(+91) 6000-034-322</a>
          <address className="footer-address">NRRD Office: House No. 210, Ashraful House, 2nd Floor, Shernagar, Dhubri, Assam – 783335, India</address>
        </div>
        <div className="footer-links-col footer-legal">
          <span className="footer-label">THE DETAILS</span>
          <Link to="/privacy-policy">Privacy policy</Link>
          <Link to="/terms-and-conditions">Terms & conditions</Link>
          <Link to="/supplier-code-of-conduct">Supplier code of conduct</Link>
          <Link to="/data-governance-and-compliance-policy">Data governance and compliance policy</Link>
          <Link to="/remote-work-device-security-agreement">Remote work device security agreement</Link>
        </div>
      </div>
      <div className="section-wrap footer-bottom">
        <span>© {new Date().getFullYear()} Datovia Playhouse. All rights reserved.</span>
      </div>
    </footer>
  );
}
