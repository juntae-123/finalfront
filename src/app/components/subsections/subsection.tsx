"use client";
import Link from "next/link";
import { button } from "framer-motion/client";

const Subsection = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/185726-876210695_small.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <span className="absolute top-8 left-1/2 -translate-x-1/2 z-50 font-bold text-2xl tracking-widest text-white">
        PROJECT
      </span>

      <div className="relative z-10 w-full h-full flex items-center justify-center mt-16">
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-10 overflow-y-auto max-h-[90vh]">
          {[...Array(6)].map((_, i) => {
            let href = `https://your-site-${i + 1}.com`;
            let title = `Project ${i + 1}`;
            let desc = "준비중";
            let logo = null;

            if (i === 0) {
              href = "https://project-twosome2.vercel.app/";
              title = "투썸 프로젝트";
              desc = "투썸 플레이스 클론";
              logo = "/logo/Bi_img_logo.svg.png";
            }

            if (i === 1) {
              href = "https://juntae-123.github.io/toss/";
              title = "토스 클론";
              desc = "TOSS 페이지 클론";
              logo = "/logo/EhEElRcoy4v5Y9uyUj3XkTWg.avif";
            }
            if (i === 2) {
              href = "https://khj3535.github.io/airbnb/";
              title = "에어비엔비 클론";
              desc = "airbnb 페이지 클론";
              logo = "/logo/airbnb-logo-logo.png";
            }
            if (i === 3) {
              href = "https://juntae-123.github.io/todolist/";
              title = "ToDo List";
              desc = "React를 사용한 할 일 관리 애플리케이션";
              logo =
                "/logo/144573050-할-일-목록-템플릿-아이콘입니다-로고-벡터-일러스트-레이-션.jpg";
            }
            if (i === 4) {
              href = "https://khj3535.github.io/team_portfolio/index.html";
              title = "강남언니";
              desc = "강남언니 클론 코딩";
              logo = "/logo/강남언니-로고-510x350.png";
            }

            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group w-[240px] xs:w-[280px] sm:w-[300px] lg:w-[340px] h-[180px] xs:h-[200px] sm:h-[220px] lg:h-[260px] bg-white/80 backdrop-blur-md border border-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-all duration-500"
              >
                {logo && (
                  <img
                    src={logo}
                    alt="logo"
                    className="absolute inset-0 w-full h-full object-cover opacity-100 group-hover:opacity-0 scale-100 group-hover:scale-110 transition-all duration-500 z-10"
                    loading="lazy"
                  />
                )}

                <div className="relative z-20 flex flex-col items-center justify-center w-full h-full text-center px-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100">
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold">
                    {title}
                  </p>
                  <p className="text-xs sm:text-sm lg:text-base mt-1 sm:mt-2">
                    {desc}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Subsection;
