import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "motion/react";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { WatchModel } from "./WatchModel";

function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
}: { target: number; prefix?: string; suffix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 2.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplayed(Math.round(v)),
    });
    return controls.stop;
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="font-display text-4xl md:text-5xl gradient-gold-text"
    >
      {prefix}
      {displayed.toLocaleString()}
      {suffix}
    </span>
  );
}

function FeaturedWatchScene() {
  return (
    <>
      <ambientLight intensity={0.4} color={new THREE.Color(0x4a3010)} />
      <directionalLight
        position={[8, 6, 5]}
        intensity={2}
        color={new THREE.Color(0xffd060)}
      />
      <directionalLight
        position={[-6, -3, 4]}
        intensity={0.6}
        color={new THREE.Color(0x304060)}
      />
      <pointLight
        position={[0, 0, 4]}
        intensity={3}
        color={new THREE.Color(0xffa020)}
        distance={10}
      />
      <Environment preset="night" />

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <WatchModel scale={2.0} autoRotate={true} showTime={true} />
      </Float>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={true}
        autoRotateSpeed={0.8}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 2.8}
      />
    </>
  );
}

export function FeaturedSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="featured"
      ref={ref}
      className="relative py-0 overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Top edge gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, #060608 0%, transparent 100%)",
        }}
      />

      <div className="grid md:grid-cols-2 min-h-screen items-center">
        {/* Left side — 3D watch */}
        <div className="relative h-[50vh] md:h-screen">
          <Canvas
            camera={{ position: [0, 0, 6], fov: 40 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
            style={{ background: "#060608", width: "100%", height: "100%" }}
          >
            <Suspense fallback={null}>
              <FeaturedWatchScene />
            </Suspense>
          </Canvas>

          {/* Gradient overlay on right edge */}
          <div
            className="absolute top-0 right-0 bottom-0 w-32 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, transparent 0%, #060608 100%)",
            }}
          />
        </div>

        {/* Right side — Details */}
        <div className="px-8 md:px-12 py-16 md:py-0 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-body text-xs tracking-[0.5em] text-gold-DEFAULT/60 uppercase mb-4">
              Featured Timepiece
            </p>

            <div className="w-12 h-px bg-gold-DEFAULT/40 mb-6" />

            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-2">
              Heritage
            </h2>
            <h3 className="font-display text-3xl md:text-4xl gradient-gold-text font-bold mb-6">
              Masterpiece
            </h3>

            <p className="font-body text-base text-white/50 leading-relaxed mb-8 max-w-sm">
              Crafted over 800 hours by a single master watchmaker. The Heritage
              Masterpiece represents the pinnacle of DIXM's watchmaking
              philosophy — where every component is a work of art.
            </p>

            {/* Specs */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Movement", value: "Manufacture Cal. DX-01" },
                { label: "Case Material", value: "18K Rose Gold" },
                { label: "Water Resistance", value: "300 meters" },
                { label: "Power Reserve", value: "72 Hours" },
              ].map((spec) => (
                <div
                  key={spec.label}
                  className="border border-gold-DEFAULT/10 p-3"
                >
                  <p className="font-body text-xs text-gold-DEFAULT/50 tracking-widest uppercase mb-1">
                    {spec.label}
                  </p>
                  <p className="font-body text-sm text-white/80">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8">
              <p className="font-body text-xs text-white/40 tracking-widest uppercase">
                Starting from
              </p>
              <AnimatedCounter target={48500} prefix="$" />
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(201,168,76,0.3)",
              }}
              whileTap={{ scale: 0.98 }}
              className="font-body text-sm tracking-[0.25em] uppercase px-10 py-4 bg-gold-DEFAULT text-dixm-dark font-semibold hover:bg-gold-bright transition-colors duration-300"
            >
              Request Viewing
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Bottom edge gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #060608 0%, transparent 100%)",
        }}
      />
    </section>
  );
}
