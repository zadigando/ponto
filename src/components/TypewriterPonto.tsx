import React, { useEffect, useState } from "react";
import "./TypewriterPonto.css"; // Vamos criar esse CSS também

const TypewriterPonto = () => {
  const fullText = "PONTO";
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Delay antes de começar (1s)
    const delay = setTimeout(() => {
      setStarted(true);
    }, 1000);

    return () => clearTimeout(delay);
  }, []);

  useEffect(() => {
    if (!started || index >= fullText.length) return;

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, 200);

    return () => clearTimeout(timeout);
  }, [index, started]);

  return (
    <h1 className="text-5xl md:text-7xl font-display tracking-[0.3em] flex items-center gap-2">
      {fullText.slice(0, index)}
      <span className="typewriter-cursor">|</span>
    </h1>
  );
};

export default TypewriterPonto;
