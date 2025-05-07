import React, { useState } from "react";
import "./CopyLinkBox.css";

export const CopyLinkBox = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Ошибка при копировании:", err);
    }
  };

  return (
    <div className="copy-link-box">
      <input
        type="text"
        value={link}
        readOnly
        className="copy-input"
        onClick={(e) => e.target.select()}
      />
      <button onClick={handleCopy} className="copy-button">
        {copied ? "Скопировано!" : "Скопировать"}
      </button>
    </div>
  );
};
