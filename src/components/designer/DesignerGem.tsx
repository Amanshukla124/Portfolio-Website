"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const COLOR_TO_HUE: Record<string, string> = {
  "#a855f7": "246deg", // Purple
  "#ec4899": "305deg", // Pink
  "#3b82f6": "192deg", // Blue
  "#f97316": "0deg",   // Orange (Base Lottie color)
  "#8b5cf6": "233deg", // Violet
};

export default function DesignerGem({ color }: { color?: string }) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch("/Cube-loop.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie animation", err));
  }, []);

  // Determine the hue rotation required to shift the orange cube to the target color
  const fallbackColor = "#a855f7";
  const hueRotate = COLOR_TO_HUE[color || fallbackColor] || "0deg";

  return (
    <div className="relative flex items-center justify-center w-full h-full select-none transition-colors duration-700">
      {/* Soft radial bloom behind the lottie animation that matches the current color */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse 60% 55% at 50% 50%, ${color}25 0%, ${color}10 45%, transparent 70%)`,
          filter: "blur(30px)",
        }}
      />

      {animationData ? (
        <div
          className="w-full h-full max-w-[600px]"
          // Apply hue-rotate using CSS filters. This allows the animation 
          // to continue running completely seamlessly while beautifully shifting colors!
          style={{
            filter: `hue-rotate(${hueRotate})`,
            transition: "filter 0.5s ease",
          }}
        >
          <Lottie
            animationData={animationData}
            loop={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div
            className="w-8 h-8 rounded-full border-2 border-transparent animate-spin"
            style={{
              borderTopColor: color || fallbackColor,
              borderRightColor: `${color}40` || "rgba(168,85,247,0.2)",
            }}
          />
        </div>
      )}
    </div>
  );
}
