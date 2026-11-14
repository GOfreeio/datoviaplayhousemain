import React, { useState } from "react";

export default function ShareActions({ title, text, url, label = "Share" }) {
  const [message, setMessage] = useState("");
  const shareUrl = url ? new URL(url, window.location.origin).href : window.location.href;

  async function copyLink() {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard access is unavailable.");
      }

      await navigator.clipboard.writeText(shareUrl);
      setMessage("Link copied.");
    } catch {
      setMessage("Could not copy the link. Copy it from your browser address bar.");
    }
  }

  async function shareLink() {
    setMessage("");

    if (typeof navigator.share !== "function") {
      await copyLink();
      return;
    }

    try {
      await navigator.share({ title, text, url: shareUrl });
    } catch (error) {
      if (error.name !== "AbortError") {
        setMessage("Could not open share options.");
      }
    }
  }

  return (
    <div className="share-actions">
      <button className="share-action" type="button" onClick={shareLink}>{label}</button>
      <button className="share-action" type="button" onClick={copyLink}>Copy link</button>
      {message && <span className="share-feedback" role="status">{message}</span>}
    </div>
  );
}
