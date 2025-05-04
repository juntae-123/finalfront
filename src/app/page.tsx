"use client";

import Header from "./components/headers/header";
import Mainsection from "./components/mainsections/mainsection";
import LastSection from "./components/lastsections/lastsection";
import Subsection from "./components/subsections/subsection";
import GuestbookPreview from "./components/subsections/guestbookPreview";
import SkillsSection from "./components/subsections/skillsSection";

import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel } from "swiper/modules";
import { gsap } from "gsap";
import "swiper/css";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Header />

      <Swiper
        direction="vertical"
        slidesPerView={1}
        mousewheel
        modules={[Mousewheel]}
        className="h-screen"
        style={{ height: "100dvh" }}
        speed={800}
        onSlideChange={(swiper) => {
          if (swiper.activeIndex === 3) {
            gsap.to("#last-section", {
              backgroundColor: "#000",
              duration: 0.5,
            });
            gsap.to("#last-section p", {
              color: "#fff",
              duration: 0.5,
            });
            gsap.to("#contact", {
              opacity: 1,
              y: 0,
              duration: 0.5,
            });
          } else {
            gsap.to("#last-section", {
              backgroundColor: "#fff",
              duration: 0.5,
            });
            gsap.to("#last-section p", {
              color: "#000",
              duration: 0.5,
            });
            gsap.to("#contact", {
              opacity: 0,
              y: 30,
              duration: 0.5,
            });
          }
        }}
      >
        <SwiperSlide>
          <div className="h-screen overflow-auto">
            <Mainsection />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-screen overflow-auto">
            <SkillsSection />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-screen overflow-auto">
            <Subsection />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-screen overflow-auto">
            <GuestbookPreview />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="h-screen overflow-auto">
            <LastSection />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
