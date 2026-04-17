"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  const followerX = useSpring(0, { damping: 18, stiffness: 120, mass: 0.6 });
  const followerY = useSpring(0, { damping: 18, stiffness: 120, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      followerX.set(e.clientX);
      followerY.set(e.clientY);
    };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], [data-hover='true']")) {
        setHovering(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest("a, button, [role='button'], [data-hover='true']")) {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, [cursorX, cursorY, followerX, followerY]);

  return (
    <>
      {/* Dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999] mix-blend-difference"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-white"
          animate={{ scale: clicking ? 0.5 : 1 }}
          transition={{ duration: 0.1 }}
        />
      </motion.div>

      {/* Ring follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: followerX, y: followerY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="rounded-full border border-white/30"
          animate={{
            width: hovering ? 48 : 28,
            height: hovering ? 48 : 28,
            opacity: hovering ? 0.8 : 0.4,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        />
      </motion.div>
    </>
  );
}
