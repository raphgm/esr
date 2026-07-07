import React from "react";

interface Doodle {
  id: string;
  top: string;
  left?: string;
  right?: string;
  rotate: string;
  scale: string;
  colorClass: string;
  path: string;
  viewBox?: string;
}

const doodlesList: Doodle[] = [
  // Top region
  {
    id: "rocket-1",
    top: "3%",
    left: "4%",
    rotate: "rotate-12",
    scale: "scale-100",
    colorClass: "text-purple-500/15",
    path: "M50,15 C40,30 40,65 30,80 L70,80 C60,65 60,30 50,15 Z M35,80 C32,85 25,85 20,80 L25,65"
  },
  {
    id: "lightbulb-1",
    top: "7%",
    right: "3%",
    rotate: "-rotate-12",
    scale: "scale-90",
    colorClass: "text-amber-500/15",
    path: "M50,15 C35,15 25,25 25,40 C25,52 33,60 38,65 L38,78 C38,80 40,82 42,82 L58,82 C60,82 62,80 62,78 L62,65 C67,60 75,52 75,40 C75,25 65,15 50,15 Z M42,87 H58"
  },
  {
    id: "star-1",
    top: "11%",
    left: "15%",
    rotate: "rotate-45",
    scale: "scale-75",
    colorClass: "text-fuchsia-500/15",
    path: "M50,10 L58,38 L86,38 L64,56 L72,84 L50,66 L28,84 L36,56 L14,38 L42,38 Z"
  },
  {
    id: "heart-1",
    top: "15%",
    right: "12%",
    rotate: "-rotate-6",
    scale: "scale-95",
    colorClass: "text-rose-500/15",
    path: "M50,30 C50,30 40,15 25,15 C10,15 10,32.5 10,32.5 C10,50 32.5,67.5 50,85 C67.5,67.5 90,50 90,32.5 C90,32.5 90,15 75,15 C60,15 50,30 50,30 Z"
  },
  // Upper middle region
  {
    id: "grad-1",
    top: "21%",
    left: "2%",
    rotate: "rotate-6",
    scale: "scale-110",
    colorClass: "text-indigo-500/15",
    path: "M50,15 L90,35 L50,55 L10,35 Z M25,43 V65 C25,75 50,80 50,80 C50,80 75,75 75,65 V43 M80,40 V65 L85,75 V40"
  },
  {
    id: "briefcase-1",
    top: "26%",
    right: "4%",
    rotate: "-rotate-12",
    scale: "scale-100",
    colorClass: "text-blue-500/15",
    path: "M20,35 H80 V80 H20 Z M35,35 V20 H65 V35 M50,50 V60"
  },
  {
    id: "arrow-1",
    top: "31%",
    left: "10%",
    rotate: "rotate-12",
    scale: "scale-90",
    colorClass: "text-emerald-500/15",
    path: "M10,80 Q30,40 60,60 T90,20 M75,20 H90 V35"
  },
  {
    id: "smile-1",
    top: "36%",
    right: "15%",
    rotate: "rotate-[15deg]",
    scale: "scale-90",
    colorClass: "text-amber-500/15",
    path: "M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C72.1,90 90,72.1 90,50 C90,27.9 72.1,10 50,10 Z M35,40 A5,5 0 1,1 35,40.1 M65,40 A5,5 0 1,1 65,40.1 M30,60 Q50,75 70,60"
  },
  // Middle region
  {
    id: "code-1",
    top: "41%",
    left: "3%",
    rotate: "-rotate-6",
    scale: "scale-100",
    colorClass: "text-purple-500/15",
    path: "M30,25 L10,50 L30,75 M70,25 L90,50 L70,75 M55,15 L45,85"
  },
  {
    id: "globe-1",
    top: "46%",
    right: "3%",
    rotate: "rotate-45",
    scale: "scale-110",
    colorClass: "text-blue-500/15",
    path: "M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C72.1,90 90,72.1 90,50 C90,27.9 72.1,10 50,10 Z M10,50 H90 M50,10 V90"
  },
  {
    id: "paperplane-1",
    top: "52%",
    left: "12%",
    rotate: "rotate-[30deg]",
    scale: "scale-95",
    colorClass: "text-sky-500/15",
    path: "M10,50 L90,10 L60,90 L45,55 Z M45,55 L90,10"
  },
  {
    id: "crown-1",
    top: "57%",
    right: "10%",
    rotate: "-rotate-12",
    scale: "scale-105",
    colorClass: "text-yellow-500/15",
    path: "M10,80 L20,30 L40,55 L50,20 L60,55 L80,30 L90,80 Z"
  },
  // Lower middle region
  {
    id: "music-1",
    top: "62%",
    left: "2%",
    rotate: "rotate-12",
    scale: "scale-90",
    colorClass: "text-pink-500/15",
    path: "M35,75 A12,12 0 1,1 23,63 V20 L75,10 V55 A12,12 0 1,1 63,43 M23,35 L75,25"
  },
  {
    id: "cloud-1",
    top: "67%",
    right: "2%",
    rotate: "rotate-6",
    scale: "scale-115",
    colorClass: "text-teal-500/15",
    path: "M25,65 C15,65 10,55 15,45 C15,30 30,20 45,25 C55,15 75,20 75,35 C85,35 90,45 85,55 C85,65 75,65 70,65 H25 Z"
  },
  {
    id: "shield-1",
    top: "72%",
    left: "14%",
    rotate: "-rotate-6",
    scale: "scale-100",
    colorClass: "text-emerald-500/15",
    path: "M15,20 C40,10 60,10 85,20 V50 C85,75 50,90 50,90 C50,90 15,75 15,50 Z"
  },
  {
    id: "star-2",
    top: "77%",
    right: "15%",
    rotate: "rotate-12",
    scale: "scale-100",
    colorClass: "text-purple-500/15",
    path: "M50,10 L58,38 L86,38 L64,56 L72,84 L50,66 L28,84 L36,56 L14,38 L42,38 Z"
  },
  // Lower region
  {
    id: "cursor-1",
    top: "82%",
    left: "4%",
    rotate: "rotate-[25deg]",
    scale: "scale-90",
    colorClass: "text-indigo-500/15",
    path: "M20,20 L40,80 L52,55 L80,60 Z M52,55 L75,75"
  },
  {
    id: "compass-1",
    top: "87%",
    right: "4%",
    rotate: "rotate-45",
    scale: "scale-100",
    colorClass: "text-cyan-500/15",
    path: "M50,10 C27.9,10 10,27.9 10,50 C10,72.1 27.9,90 50,90 C72.1,90 90,72.1 90,50 C90,27.9 72.1,10 50,10 Z M50,25 L60,50 L50,75 L40,50 Z"
  },
  {
    id: "heart-2",
    top: "92%",
    left: "12%",
    rotate: "-rotate-12",
    scale: "scale-95",
    colorClass: "text-rose-500/15",
    path: "M50,30 C50,30 40,15 25,15 C10,15 10,32.5 10,32.5 C10,50 32.5,67.5 50,85 C67.5,67.5 90,50 90,32.5 C90,32.5 90,15 75,15 C60,15 50,30 50,30 Z"
  },
  {
    id: "lightbulb-2",
    top: "96%",
    right: "3%",
    rotate: "rotate-12",
    scale: "scale-100",
    colorClass: "text-amber-500/15",
    path: "M50,15 C35,15 25,25 25,40 C25,52 33,60 38,65 L38,78 C38,80 40,82 42,82 L58,82 C60,82 62,80 62,78 L62,65 C67,60 75,52 75,40 C75,25 65,15 50,15 Z M42,87 H58"
  }
];

export function BackgroundDoodles() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {doodlesList.map((doodle) => (
        <div
          key={doodle.id}
          className={`absolute ${doodle.rotate} ${doodle.scale} transition-all duration-1000 ease-in-out`}
          style={{
            top: doodle.top,
            ...(doodle.left ? { left: doodle.left } : {}),
            ...(doodle.right ? { right: doodle.right } : {})
          }}
        >
          <svg
            width="60"
            height="60"
            viewBox={doodle.viewBox || "0 0 100 100"}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${doodle.colorClass} hover:scale-110 transition-transform duration-350`}
          >
            <path d={doodle.path} />
          </svg>
        </div>
      ))}
    </div>
  );
}
