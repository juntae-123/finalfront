"use client";

import { useEffect, useRef, useState } from "react";
import { FaGithub } from "react-icons/fa";

const LastSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 px-4 sm:px-6 md:px-8 ${
        isVisible ? "bg-black" : "bg-white"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto text-center space-y-6 py-8">
        <p
          className={`text-xl sm:text-2xl md:text-3xl font-bold transition-colors duration-500 break-words ${
            isVisible ? "text-white" : "text-black"
          }`}
        >
          I will always learn new things and try my best.
        </p>

        {isVisible && (
          <div className="space-y-4 text-base sm:text-lg md:text-xl text-white">
            <p className="font-semibold">박준태</p>
            <p>010-3160-8787</p>
            <p>qkrwnsxo9@naver.com</p>
            <a
              href="https://github.com/juntae-123"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center hover:text-gray-300 transition-colors"
            >
              <FaGithub size={28} className="sm:size-8 md:size-10" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default LastSection;
