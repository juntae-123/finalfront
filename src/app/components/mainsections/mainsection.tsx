"use client";

import Scene from "../three/Scene";

const Mainsection = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/27794-365891117_small.mp4"
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />

      <div className="relative z-10 h-screen">
        <Scene />
      </div>
    </section>
  );
};

export default Mainsection;
