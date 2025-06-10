import React, { useEffect, useState, useRef } from "react";
import "./TypewriterPonto.css";

type Phase = "typing" | "waiting" | "deleting" | "done";

const defaultVariants = ["PONTO.", "ac.", "ponto.ac."];
const enzoVariants = ["enzo.", "enzo, the dude.", "the dude."];
const zadigVariants = ["zadig.", "z."];

const TypewriterPonto = ({
  overrideText,
  animate = true,
  loop = true,
}: {
  overrideText?: string | null;
  animate?: boolean;
  loop?: boolean;
}) => {
  const isDynamic = overrideText === "enzo" || overrideText === "zadig";
  const variants =
    overrideText === "enzo"
      ? enzoVariants
      : overrideText === "zadig"
      ? zadigVariants
      : defaultVariants;

  const [displayText, setDisplayText] = useState("");
  const [phase, setPhase] = useState<Phase>("typing");
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentText = isDynamic
    ? variants[currentIndex]
    : overrideText ?? variants[currentIndex];

  useEffect(() => {
    if (!animate) {
      setDisplayText(currentText);
      return;
    }

    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (displayText.length < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 150);
      } else {
        setPhase(loop ? "waiting" : "done");
      }
    }

    if (phase === "waiting" && animate && loop) {
      timeout = setTimeout(() => setPhase("deleting"), 1000);
    }

    if (phase === "done") {
      // Do nothing, animation finished
    }

    if (phase === "deleting") {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 100); // velocidade de apagar
      } else {
        if (isDynamic || !overrideText) {
          const next = (currentIndex + 1) % variants.length;
          setCurrentIndex(next);
        }
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [
    phase,
    displayText,
    currentText,
    currentIndex,
    overrideText,
    variants,
    animate,
    loop,
    isDynamic,
  ]);

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    setCurrentIndex(0);
    setPhase("deleting");
  }, [overrideText, animate, loop]);

  return (
    <h1 className="text-5xl md:text-7xl font-display tracking-[0.3em] relative text-center">
      <span className="invisible">PONTO</span>
      <span className="absolute inset-0 flex justify-center whitespace-nowrap">
        <span className="flex items-center gap-2">
          {displayText}
          {animate && <span className="typewriter-cursor">|</span>}
        </span>
      </span>
    </h1>
  );
};

export default TypewriterPonto;
