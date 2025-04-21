import React, { useState } from "react";

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

const BottomBar = ({ onReset }: { onReset?: () => void }) => {
  const [leftText, setLeftText] = useState("AC");
  const [rightText, setRightText] = useState("PONTO");

  const handleHoverLeft = () => {
    scramble("AC", setLeftText);
  };

  const handleHoverRight = () => {
    scramble("PONTO", setRightText);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-40 px-8 md:px-12 py-8 transition-all duration-700 flex justify-between items-center bg-transparent">
      {/* Esquerda */}
      <div
        className="interactive z-50 cursor-pointer"
        onMouseEnter={handleHoverLeft}
        onClick={onReset}
      >
        <h1 className="text-lg md:text-xl font-display logo-text tracking-[0.3em]">
          {leftText}
        </h1>
      </div>

      {/* Direita */}
      <div
        className="interactive z-50 cursor-pointer"
        onMouseEnter={handleHoverRight}
        onClick={onReset}
      >
        <h1 className="text-lg md:text-xl font-display logo-text tracking-[0.3em]">
          {rightText}
        </h1>
      </div>
    </div>
  );
};

export default BottomBar;
