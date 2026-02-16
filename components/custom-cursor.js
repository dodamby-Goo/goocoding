"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(max-width: 900px)").matches) {
      return undefined;
    }

    let rafId;
    let ringX = -100;
    let ringY = -100;
    let pointerX = -100;
    let pointerY = -100;

    const animate = () => {
      ringX += (pointerX - ringX) * 0.15;
      ringY += (pointerY - ringY) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${ringX}px`;
        cursorRef.current.style.top = `${ringY}px`;
      }
      if (dotRef.current) {
        dotRef.current.style.left = `${pointerX}px`;
        dotRef.current.style.top = `${pointerY}px`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const move = (event) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
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
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseout", onOut);
      window.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`cursor-ring ${active ? "active" : ""}`}
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 0.95 : 0
        }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className={`cursor-dot ${active ? "active" : ""}`}
        style={{
          left: pos.x,
          top: pos.y,
          opacity: visible ? 1 : 0
        }}
        aria-hidden
      />
    </>
  );
}
