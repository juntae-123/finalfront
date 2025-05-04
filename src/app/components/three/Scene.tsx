"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Text3D, Center, Environment } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ThreeEvent } from "@react-three/fiber";

const AnimatedText = ({
  children,
  position,
  delay = 0,
  size = 0.4,
}: {
  children: React.ReactNode;
  position: [number, number, number];
  delay: number;
  size?: number;
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [opacity, setOpacity] = useState(0);
  const [hovered, setHovered] = useState(false);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (meshRef.current) {
      if (opacity < 1) {
        setOpacity((prev) => Math.min(prev + 0.01, 1));
      }

      if (hovered) {
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.1;
      } else {
        meshRef.current.rotation.y = 0;
      }

      if (materialRef.current) {
        materialRef.current.color.setRGB(1, 1, 1);
        materialRef.current.emissive.setRGB(0.2, 0.2, 0.2);
        materialRef.current.metalness = 0.2;
        materialRef.current.roughness = 0.3;
      }
    }
  });

  const handlePointerMove = (event: ThreeEvent<PointerEvent>) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    if (materialRef.current) {
      gsap.to(materialRef.current.color, {
        r: hovered ? 0.4 : 1,
        g: hovered ? 1 : 1,
        b: hovered ? 0.85 : 1,
        duration: 1,
        ease: "power2.inOut",
      });
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
    >
      <Text3D
        font="/fonts/helvetiker_regular.typeface.json"
        size={size}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={5}
      >
        {children}
        <meshStandardMaterial
          ref={materialRef}
          metalness={0.4}
          roughness={0.3}
          transparent
          opacity={opacity}
          envMapIntensity={0.5}
        />
      </Text3D>
    </mesh>
  );
};

const Scene = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMouseMove = (event: React.MouseEvent) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;
    setMousePosition({ x, y });
  };

  const getTextSize = () => {
    if (windowSize.width < 480) return 0.18; // xs
    if (windowSize.width < 640) return 0.2; // sm
    if (windowSize.width < 768) return 0.22; // md
    return 0.25; // lg and above
  };

  const getCameraPosition = (): [number, number, number] => {
    if (windowSize.width < 480) return [0, 0, 5.5]; // xs
    if (windowSize.width < 640) return [0, 0, 5.2]; // sm
    if (windowSize.width < 768) return [0, 0, 5]; // md
    return [0, 0, 4.5]; // lg and above
  };

  return (
    <div className="w-full h-full" onMouseMove={handleMouseMove}>
      <Canvas
        camera={{ position: getCameraPosition(), fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Environment preset="city" />
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          castShadow
        />
        <Center>
          <group rotation={[mousePosition.y * 0.05, mousePosition.x * 0.05, 0]} position={[0.1, 0, 0]}>
            <AnimatedText position={[0, 0.6, 0]} delay={0} size={getTextSize()}>
              FULL STACK
            </AnimatedText>
            <AnimatedText position={[0, 0, 0]} delay={1} size={getTextSize()}>
              DEVELOPER
            </AnimatedText>
            <AnimatedText
              position={[0, -0.6, 0]}
              delay={2}
              size={getTextSize()}
            >
              JUNTAE
            </AnimatedText>
          </group>
        </Center>
      </Canvas>
    </div>
  );
};

export default Scene;
