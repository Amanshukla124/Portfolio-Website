"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function DeveloperCursor() {
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const springConfig = { damping: 28, stiffness: 400, mass: 0.2 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);
  
  // Terminal block lags a tiny bit
  const followerX = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });
  const followerY = useSpring(0, { damping: 20, stiffness: 200, mass: 0.5 });

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
      if (target.closest("a, button, [role='button'], [data-hover='true'], input, textarea")) {
        setHovering(true);
      }
    };
    const onLeave = (e: MouseEvent) => {
      const related = e.relatedTarget as HTMLElement | null;
      if (!related?.closest("a, button, [role='button'], [data-hover='true'], input, textarea")) {
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
      {/* Exact pinpoint crosshair */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          className="relative flex items-center justify-center w-4 h-4"
          animate={{ scale: clicking ? 0.7 : 1, opacity: hovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute w-full h-[1px] bg-green-400" />
          <div className="absolute h-full w-[1px] bg-green-400" />
        </motion.div>
      </motion.div>

      {/* Terminal block follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{ x: followerX, y: followerY, translateY: "4px", translateX: "4px" }}
      >
        <motion.div
          className="bg-green-500/80 shadow-[0_0_12px_rgba(57,255,20,0.4)]"
          animate={{
            width: hovering ? 12 : 8,
            height: hovering ? 20 : 14,
            opacity: clicking ? 0.4 : hovering ? 0.9 : 0.6,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
      </motion.div>
    </>
  );
}
