import { Float, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { WatchModel } from "./WatchModel";

function GoldParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 300;

  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    sizes[i] = Math.random() * 0.05 + 0.01;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const material = new THREE.PointsMaterial({
    color: new THREE.Color(0xc9a84c),
    size: 0.035,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  });

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.04;
      particlesRef.current.rotation.x =
        Math.sin(clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return <points ref={particlesRef} geometry={geometry} material={material} />;
}

function CloudParticles() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.01;
      meshRef.current.position.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -4]}>
      <sphereGeometry args={[4, 16, 16]} />
      <meshStandardMaterial
        color={new THREE.Color(0x1a1020)}
        transparent
        opacity={0.3}
        side={THREE.BackSide}
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

function HeroScene() {
  return (
    <>
      <ambientLight intensity={0.3} color={new THREE.Color(0x4a3010)} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color={new THREE.Color(0xffd070)}
      />
      <directionalLight
        position={[-5, -2, 3]}
        intensity={0.5}
        color={new THREE.Color(0x203050)}
      />
      <pointLight
        position={[0, 0, 3]}
        intensity={2}
        color={new THREE.Color(0xffa020)}
        distance={8}
      />
      <pointLight
        position={[3, -2, 2]}
        intensity={0.8}
        color={new THREE.Color(0x204060)}
        distance={6}
      />

      <Stars
        radius={80}
        depth={50}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={1}
      />
      <GoldParticles />
      <CloudParticles />

      <fog attach="fog" args={[0x060608, 8, 20]} />

      <Float
        speed={1.2}
        rotationIntensity={0.3}
        floatIntensity={0.4}
        floatingRange={[-0.1, 0.1]}
      >
        <WatchModel scale={1.4} autoRotate={false} showTime={true} />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 2.5}
        rotateSpeed={0.4}
      />
    </>
  );
}

export function HeroSection() {
  const canvasRef = useRef<HTMLDivElement>(null);

  // Scroll handler for parallax
  useEffect(() => {
    const handleScroll = () => {
      if (canvasRef.current) {
        const scrollY = window.scrollY;
        canvasRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollDown = () => {
    const el = document.querySelector("#collections");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* 3D Canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
          }}
          style={{ background: "#060608" }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Atmospheric gradient overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, rgba(6,6,8,0.5) 60%, rgba(6,6,8,0.85) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{
            background: "linear-gradient(to top, #060608 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 left-0 right-0 h-32"
          style={{
            background:
              "linear-gradient(to bottom, rgba(6,6,8,0.6) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 text-center pointer-events-none">
        {/* Tagline above */}
        <motion.p
          initial={{ opacity: 0, y: 20, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, y: 0, letterSpacing: "0.6em" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-body text-xs md:text-sm text-gold-DEFAULT/70 tracking-[0.6em] mb-6 uppercase"
        >
          Since 1870
        </motion.p>

        {/* Main Title */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-[12vw] md:text-[11rem] lg:text-[13rem] leading-none tracking-[-0.02em] gradient-gold-text glow-gold-text select-none"
          >
            DIXM
          </motion.h1>
        </div>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-gold-DEFAULT to-transparent mb-6"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="font-body text-base md:text-xl text-white/60 tracking-[0.3em] uppercase mb-10"
        >
          Precision in Every Second
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="pointer-events-auto"
        >
          <motion.button
            onClick={handleScrollDown}
            className="font-body text-sm tracking-[0.3em] px-10 py-4 border border-gold-DEFAULT/60 text-gold-bright relative overflow-hidden group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10 uppercase">Explore Collection</span>
            <motion.div
              className="absolute inset-0 bg-gold-DEFAULT/10"
              initial={{ scaleX: 0, originX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
            />
          </motion.button>
        </motion.div>

        {/* Hint: interact */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-6 font-body text-xs text-white/40 tracking-widest uppercase"
        >
          Drag to rotate
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer"
        onClick={handleScrollDown}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className="text-gold-DEFAULT/60"
        >
          <ChevronDown size={24} />
        </motion.div>
        <div className="w-px h-10 bg-gradient-to-b from-gold-DEFAULT/40 to-transparent" />
      </motion.div>

      {/* Decorative corner marks */}
      <div className="absolute top-20 left-8 z-20 pointer-events-none hidden md:block">
        <div className="w-8 h-8 border-t border-l border-gold-DEFAULT/30" />
      </div>
      <div className="absolute top-20 right-8 z-20 pointer-events-none hidden md:block">
        <div className="w-8 h-8 border-t border-r border-gold-DEFAULT/30" />
      </div>
      <div className="absolute bottom-20 left-8 z-20 pointer-events-none hidden md:block">
        <div className="w-8 h-8 border-b border-l border-gold-DEFAULT/30" />
      </div>
      <div className="absolute bottom-20 right-8 z-20 pointer-events-none hidden md:block">
        <div className="w-8 h-8 border-b border-r border-gold-DEFAULT/30" />
      </div>
    </section>
  );
}
