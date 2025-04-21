import React, { useEffect, useState } from "react";
import "./TypewriterPonto.css";

const variants = [
  "PONTO",
  ".",
  "•",
  "*",
  "...",
];

type Phase = "typing" | "waiting" | "deleting" | "switching";

const TypewriterPonto = () => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVariant = variants[currentIndex];

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayText.length < currentVariant.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentVariant.slice(0, displayText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => setPhase("waiting"), 1000);
      }
    }

    if (phase === "waiting") {
      timeout = setTimeout(() => setPhase("deleting"), 1000);
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentVariant.slice(0, displayText.length - 1));
        }, 100);
      } else {
        setPhase("switching");
      }
    }

    if (phase === "switching") {
      const nextIndex = (currentIndex + 1) % variants.length;
      setCurrentIndex(nextIndex);
      setPhase("typing");
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, currentIndex]);

  return (
    <h1 className="text-5xl md:text-7xl font-display tracking-[0.3em] flex items-center gap-2">
      {displayText}
      <span className="typewriter-cursor">|</span>
    </h1>
  );
};

export default TypewriterPonto;
