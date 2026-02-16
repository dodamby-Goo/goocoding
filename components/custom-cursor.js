"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      return undefined;
    }

    const move = (event) => {
      setPos({ x: event.clientX, y: event.clientY });
      setVisible(true);
    };

    const onOver = (event) => {
      if (event.target.closest("a, button, input, textarea, select")) {
        setActive(true);
      }
    };

    const onOut = () => setActive(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseout", onOut);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className={`cursor-cross ${active ? "active" : ""}`}
      style={{
        left: pos.x,
        top: pos.y,
        opacity: visible ? 0.95 : 0
      }}
      aria-hidden
    />
  );
}
