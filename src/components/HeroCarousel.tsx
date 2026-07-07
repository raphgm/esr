import React, { useState, useEffect } from "react";

export function HeroCarousel() {
  const slides = [
    {
      title: (
        <>
          Learn
          <br />
          <span className="text-purple-500">To</span> Earning.
        </>
      ),
      desc: "Africa's leading digital ecosystem where practical skills transform into sustainable professional growth.",
    },
    {
      title: (
        <>
          Connect &<br />
          <span className="text-purple-500">Showcase</span>.
        </>
      ),
      desc: "Build your professional portfolio, connect with peers, and verify your credentials on-chain.",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0 animate-fade-in">
            <h1 className="text-5xl md:text-7xl leading-none font-bold tracking-tight mb-4 text-slate-900">
              {slide.title}
            </h1>
            <p className="max-w-md text-base md:text-lg leading-snug text-slate-500 text-slate-700">
              {slide.desc}
            </p>
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-6">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-1.5 transition-all ${current === index ? "w-8 bg-purple-500" : "w-4 bg-slate-300"}`}
          />
        ))}
      </div>
    </div>
  );
}
