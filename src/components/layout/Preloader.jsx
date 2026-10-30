import React, { useEffect, useState } from "react";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = window.setTimeout(() => setExiting(true), 850);
    const removeTimer = window.setTimeout(() => setVisible(false), 1300);
    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`site-preloader${exiting ? " is-exiting" : ""}`} role="status" aria-label="Loading Datovia Playhouse">
      <div className="preloader-inner">
        <span className="preloader-symbol" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="preloader-wordmark">datovia<span>playhouse</span></span>
        <span className="preloader-track"><i /></span>
        <span className="preloader-caption">MAKING DATA MOVE</span>
      </div>
    </div>
  );
}

