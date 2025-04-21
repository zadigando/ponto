import React, { useState, useEffect } from "react";

const scramble = (
  target: string,
  setText: (val: string) => void,
  duration = 800
) => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const frameInterval = 30;
  const steps = Math.floor(duration / frameInterval);
  let frame = 0;

  const interval = setInterval(() => {
    const updated = target.split("").map((char, i) => {
      if (frame < steps - 5) {
        return Math.random() < 0.5
          ? chars[Math.floor(Math.random() * chars.length)]
          : char;
      }
      return char;
    });

    setText(updated.join(""));
    frame++;

    if (frame >= steps) {
      clearInterval(interval);
      setText(target);
    }
  }, frameInterval);
};

const Navigation = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [leftText, setLeftText] = useState("PONTO");
  const [rightText, setRightText] = useState("PONTO");

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHoverLeft = () => {
    scramble("PONTO", setLeftText);
  };

  const handleHoverRight = () => {
    scramble("PONTO", setRightText);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-40 px-8 md:px-12 py-8 transition-all duration-700 flex justify-between items-center ${
        scrollPosition > 100 ? "bg-white/80 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      {/* Esquerda */}
      <div
        className="interactive z-50 cursor-pointer"
        onMouseEnter={handleHoverLeft}
      >
        <h1 className="text-lg md:text-xl font-display logo-text tracking-[0.3em]">
          {leftText}
        </h1>
      </div>

      {/* Direita */}
      <div
        className="interactive z-50 cursor-pointer"
        onMouseEnter={handleHoverRight}
      >
        <h1 className="text-lg md:text-xl font-display logo-text tracking-[0.3em]">
          {rightText}
        </h1>
      </div>
    </header>
  );
};

export default Navigation;
