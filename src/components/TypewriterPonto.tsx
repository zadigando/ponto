import React, { useEffect, useState } from "react";
import "./TypewriterPonto.css";

type Phase = "typing" | "waiting" | "deleting" | "switching";

const variants = ["PONTO", "ac", "ponto.ac"];

const TypewriterPonto = ({ overrideText }: { overrideText?: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentVariant = overrideText || variants[currentIndex];

  // Controla o ciclo normal (sem overrideText)
  useEffect(() => {
    if (overrideText) return;

    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayText.length < currentVariant.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentVariant.slice(0, displayText.length + 1));
        }, 150);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), 1000);
      }
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100);
      } else {
        const nextIndex = (currentIndex + 1) % variants.length;
        setCurrentIndex(nextIndex);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phase, currentIndex, currentVariant, overrideText]);

  useEffect(() => {
    if (!overrideText) return;

    setPhase("deleting");

    const deleteInterval = setInterval(() => {
      setDisplayText((prev) => {
        if (prev.length === 0) {
          clearInterval(deleteInterval);
          let i = 0;
          const typeInterval = setInterval(() => {
            setDisplayText((prevText) => {
              i++;
              const newText = overrideText.slice(0, i);
              if (i === overrideText.length) {
                clearInterval(typeInterval);
              }
              return newText;
            });
          }, 150);
          return "";
        }
        return prev.slice(0, -1);
      });
    }, 100);

    return () => clearInterval(deleteInterval);
  }, [overrideText]);

  return (
    <h1 className="text-5xl md:text-7xl font-display tracking-[0.3em] relative text-center">
      <span className="invisible">PONTO</span>
      <span className="absolute inset-0 flex justify-center">
        <span className="flex items-center gap-2">
          {displayText}
          <span className="typewriter-cursor">|</span>
        </span>
      </span>
    </h1>
  );
};

export default TypewriterPonto;
