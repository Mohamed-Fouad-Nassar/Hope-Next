"use client";

import { useState } from "react";

function TextExpander({
  children,
  className,
}: {
  children: string;
  className: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayText = isExpanded
    ? children
    : children.split(" ").slice(0, 60).join(" ") + "...";

  return (
    <p className={className}>
      {displayText}{" "}
      {children.split(" ").length > 60 && (
        <button
          className="text-main-700 border-b border-main-700 leading-3 pb-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show less" : "Show more"}
        </button>
      )}
    </p>
  );
}

export default TextExpander;
