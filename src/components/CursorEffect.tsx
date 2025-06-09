import React, { useEffect, useState } from "react";

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    const enter = () => setLinkHovered(true);
    const leave = () => setLinkHovered(false);

    const updateListeners = () => {
      document.querySelectorAll("a, button, .interactive").forEach((el) => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseleave", onMouseLeave);

    updateListeners();

    const observer = new MutationObserver(updateListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseleave", onMouseLeave);
      observer.disconnect();
    };
  }, []);

  const cursorStyle: React.CSSProperties = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1,
    transform: `translate(-50%, -50%) scale(${linkHovered ? 0.5 : 1})`,
    transition: "transform 200ms ease, opacity 200ms ease",
    position: "fixed",
    pointerEvents: "none",
    zIndex: 9999,
    width: "12px",
    height: "12px",
    backgroundColor: "black",
    borderRadius: "50%",
  };

  return <div style={cursorStyle} />;
};

export default CursorEffect;
