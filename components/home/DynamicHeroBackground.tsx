"use client";

import {
  useEffect,
  useState,
} from "react";

const backgrounds = [
  "https://images5.alphacoders.com/133/1338701.png",

  "https://images4.alphacoders.com/135/1351070.jpeg",

  "https://images3.alphacoders.com/134/1342308.png",

  "https://images8.alphacoders.com/100/1003220.jpg",
];

export default function DynamicHeroBackground() {

  const [current, setCurrent] =
    useState(0);

  useEffect(() => {

    const interval =
      setInterval(() => {

        setCurrent(
          (prev) =>
            (prev + 1) %
            backgrounds.length
        );

      }, 8000);

    return () =>
      clearInterval(interval);

  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">

      {backgrounds.map(
        (
          bg,
          index
        ) => (

        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ${
            current === index
              ? "opacity-100"
              : "opacity-0"
          }`}
        >

          <div
            className="w-full h-full bg-cover bg-center scale-110"
            style={{
              backgroundImage:
                `url(${bg})`,
            }}
          />

        </div>

      ))}

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black" />

    </div>
  );
}