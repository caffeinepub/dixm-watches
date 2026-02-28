import { Float, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion, useInView } from "motion/react";
import { Suspense, useRef } from "react";
import * as THREE from "three";

const techFeatures = [
  {
    icon: "⚙️",
    title: "Swiss Movement",
    desc: "DIXM Manufacture Caliber DX-01. 350 components. Certified to COSC standards, then exceeded.",
    stat: "±0.1 sec/day",
  },
  {
    icon: "💎",
    title: "Sapphire Crystal",
    desc: "Anti-reflective coated sapphire crystal rated 9 on the Mohs scale. Virtually scratch-proof.",
    stat: "9 Mohs",
  },
  {
    icon: "🌊",
    title: "Water Resistant",
    desc: "Helium escape valve and triple-sealed crown. Engineered for professional divers.",
    stat: "300m depth",
  },
  {
    icon: "🔩",
    title: "Titanium Case",
    desc: "Grade 5 titanium alloy — 40% lighter than steel, 3× more resistant to saltwater corrosion.",
    stat: "Grade 5 Ti",
  },
  {
    icon: "🔋",
    title: "Power Reserve",
    desc: "Double-barrel mainspring system delivering 72 hours of uninterrupted precision.",
    stat: "72 Hours",
  },
  {
    icon: "🛡️",
    title: "Anti-Magnetic",
    desc: "Soft iron cage protecting the escapement from fields up to 1,500 Gauss.",
    stat: "1,500 Gauss",
  },
];

function FloatingComponents() {
  const groupRef = useRef<THREE.Group>(null);

  const components = [
    {
      id: "c1",
      pos: [1.5, 0.8, 0.5] as [number, number, number],
      geometry: "box",
      size: [0.25, 0.05, 0.25] as [number, number, number],
      color: 0xc9a84c,
      speed: 0.3,
    },
    {
      id: "c2",
      pos: [-1.6, -0.5, 0.3] as [number, number, number],
      geometry: "cylinder",
      size: [0.18, 0.18, 0.08] as [number, number, number],
      color: 0xe8d070,
      speed: -0.25,
    },
    {
      id: "c3",
      pos: [0.8, -1.4, 0.8] as [number, number, number],
      geometry: "torus",
      size: [0.22, 0.04, 8, 24] as [number, number, number, number],
      color: 0xa07030,
      speed: 0.4,
    },
    {
      id: "c4",
      pos: [-0.9, 1.3, 0.4] as [number, number, number],
      geometry: "sphere",
      size: [0.14, 16, 16] as [number, number, number],
      color: 0xf0e0a0,
      speed: -0.35,
    },
    {
      id: "c5",
      pos: [1.9, -1.0, 0.2] as [number, number, number],
      geometry: "box",
      size: [0.08, 0.3, 0.06] as [number, number, number],
      color: 0xc9a84c,
      speed: 0.2,
    },
    {
      id: "c6",
      pos: [-2.0, 0.8, 0.6] as [number, number, number],
      geometry: "cylinder",
      size: [0.1, 0.1, 0.3] as [number, number, number],
      color: 0xd4b060,
      speed: 0.45,
    },
    {
      id: "c7",
      pos: [0.2, 2.0, 0.3] as [number, number, number],
      geometry: "torus",
      size: [0.3, 0.03, 6, 20] as [number, number, number, number],
      color: 0xe0c870,
      speed: -0.15,
    },
    {
      id: "c8",
      pos: [-1.4, -1.6, 0.4] as [number, number, number],
      geometry: "box",
      size: [0.15, 0.15, 0.04] as [number, number, number],
      color: 0xb09040,
      speed: 0.3,
    },
  ];

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central watch face */}
      <Float speed={0.8} floatIntensity={0.3}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.06, 64]} />
          <meshStandardMaterial
            color={new THREE.Color(0x050508)}
            metalness={0.3}
            roughness={0.8}
          />
        </mesh>
        <mesh>
          <torusGeometry args={[0.92, 0.05, 16, 64]} />
          <meshStandardMaterial
            color={new THREE.Color(0xc9a84c)}
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>
      </Float>

      {/* Floating components */}
      {components.map((comp) => (
        <Float
          key={comp.id}
          speed={comp.speed}
          floatIntensity={0.6}
          rotationIntensity={0.5}
        >
          <mesh position={comp.pos}>
            {comp.geometry === "box" && (
              <boxGeometry args={comp.size as [number, number, number]} />
            )}
            {comp.geometry === "cylinder" && (
              <cylinderGeometry
                args={comp.size as [number, number, number, number]}
              />
            )}
            {comp.geometry === "torus" && (
              <torusGeometry
                args={comp.size as [number, number, number, number]}
              />
            )}
            {comp.geometry === "sphere" && (
              <sphereGeometry args={comp.size as [number, number, number]} />
            )}
            <meshStandardMaterial
              color={new THREE.Color(comp.color)}
              metalness={0.85}
              roughness={0.2}
            />
          </mesh>
        </Float>
      ))}

      {/* Lights */}
      <ambientLight intensity={0.4} color={new THREE.Color(0x4a3010)} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color={new THREE.Color(0xffd060)}
      />
      <directionalLight
        position={[-4, -2, 3]}
        intensity={0.5}
        color={new THREE.Color(0x203050)}
      />
      <pointLight
        position={[0, 0, 3]}
        intensity={2}
        color={new THREE.Color(0xffa020)}
        distance={8}
      />
    </group>
  );
}

export function TechnologySection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="technology"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #060608 0%, #0a080e 50%, #060608 100%)",
      }}
    >
      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <p className="font-display font-black text-[18vw] text-white/[0.015] select-none whitespace-nowrap">
          PRECISION
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.5em] text-gold-DEFAULT/60 uppercase mb-4"
          >
            Innovation
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white"
          >
            The Art of <span className="gradient-gold-text">Engineering</span>
          </motion.h2>
          <div className="section-divider mt-6" />
        </div>

        {/* 3D + Features grid */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* 3D exploded view */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-[400px] md:h-[500px] relative"
          >
            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 50 }}
              dpr={[1, 2]}
              gl={{ antialias: true, alpha: false }}
              style={{ background: "#060608", width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <FloatingComponents />
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate={true}
                  autoRotateSpeed={1.5}
                  maxPolarAngle={Math.PI / 1.6}
                  minPolarAngle={Math.PI / 2.4}
                />
              </Suspense>
            </Canvas>

            {/* Label */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <p className="font-body text-xs text-gold-DEFAULT/50 tracking-widest uppercase">
                Caliber DX-01 — Exploded View
              </p>
            </div>
          </motion.div>

          {/* Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {techFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{
                  borderColor: "rgba(201,168,76,0.5)",
                  y: -4,
                }}
                className="p-5 cursor-default transition-all duration-300"
                style={{
                  background: "rgba(14,14,18,0.8)",
                  border: "1px solid rgba(201,168,76,0.12)",
                }}
              >
                <div className="text-2xl mb-2">{feature.icon}</div>
                <h4 className="font-body text-sm font-semibold text-white mb-1 tracking-wide">
                  {feature.title}
                </h4>
                <p className="font-body text-xs text-white/40 leading-relaxed mb-3">
                  {feature.desc}
                </p>
                <span className="font-body text-xs text-gold-DEFAULT tracking-widest border border-gold-DEFAULT/30 px-2 py-0.5">
                  {feature.stat}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
