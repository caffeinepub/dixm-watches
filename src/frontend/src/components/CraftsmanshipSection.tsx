import { motion, useInView, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const stats = [
  {
    value: "150+",
    label: "Years of Heritage",
    desc: "Founded in the Swiss Alps, 1870",
  },
  {
    value: "10,000",
    label: "Components per Watch",
    desc: "Every one hand-finished",
  },
  {
    value: "18",
    label: "Patents Held",
    desc: "Innovations that changed horology",
  },
  {
    value: "800hrs",
    label: "Per Masterpiece",
    desc: "Time dedicated to a single watch",
  },
];

function BrushReveal({ delay = 0 }: { delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="relative my-8 pointer-events-none">
      <svg
        viewBox="0 0 600 60"
        className="w-full opacity-25"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <motion.path
          d="M-10 30 Q60 8 150 32 Q240 52 320 28 Q400 8 480 35 Q540 52 610 25"
          stroke="url(#brushRevealGrad)"
          strokeWidth="3.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.4, delay, ease: "easeOut" }}
        />
        <motion.path
          d="M-10 38 Q80 55 180 35 Q280 15 380 40 Q460 58 610 34"
          stroke="url(#brushRevealGrad2)"
          strokeWidth="1.5"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.6, delay: delay + 0.2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="brushRevealGrad" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="rgba(201,168,76,0)" />
            <stop offset="20%" stopColor="#c9a84c" />
            <stop offset="80%" stopColor="#f0d060" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </linearGradient>
          <linearGradient id="brushRevealGrad2" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="rgba(201,168,76,0)" />
            <stop offset="40%" stopColor="rgba(201,168,76,0.5)" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function StatCard({
  value,
  label,
  desc,
  index,
}: { value: string; label: string; desc: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative p-6 group cursor-default"
      style={{ border: "1px solid rgba(201,168,76,0.12)" }}
    >
      {/* Hover glow */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="font-display text-4xl md:text-5xl gradient-gold-text font-bold mb-2">
        {value}
      </div>
      <div className="font-body text-sm text-white/80 tracking-wide mb-1">
        {label}
      </div>
      <div className="font-body text-xs text-white/35">{desc}</div>

      {/* Corner accent */}
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold-DEFAULT/20" />
    </motion.div>
  );
}

export function CraftsmanshipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imageX = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const textY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section
      id="craftsmanship"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #060608 0%, #08080f 50%, #060608 100%)",
      }}
    >
      {/* Large decorative text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <p className="font-display font-black text-[20vw] text-white/[0.015] select-none whitespace-nowrap">
          CRAFT
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
            Our Process
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white"
          >
            The Art of <span className="gradient-gold-text">Craftsmanship</span>
          </motion.h2>
          <BrushReveal delay={0.4} />
        </div>

        {/* Split layout */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
          {/* Left — Text */}
          <motion.div style={{ y: textY }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
            >
              <div className="w-12 h-px bg-gold-DEFAULT/40 mb-8" />
              <h3 className="font-display text-3xl text-white font-bold mb-6 leading-tight">
                Every watch begins
                <br />
                <span className="gradient-gold-text">with a dream</span>
              </h3>
              <p className="font-body text-base text-white/50 leading-relaxed mb-6">
                Our Geneva atelier employs 47 master watchmakers, each with over
                20 years of dedicated practice. The hands that build a DIXM
                watch have built nothing but DIXM watches — their skill is
                singular, their devotion absolute.
              </p>
              <p className="font-body text-base text-white/50 leading-relaxed mb-8">
                From the raw alloy casting to the final dial lacquering, every
                step of production occurs under one roof. We control every
                variable. We accept no compromise.
              </p>

              {/* Brush strokes */}
              <BrushReveal delay={0.6} />

              <div className="flex gap-4 mt-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 p-4 border border-gold-DEFAULT/20 text-center"
                >
                  <p className="font-body text-xs text-gold-DEFAULT/60 tracking-widest uppercase mb-2">
                    Atelier
                  </p>
                  <p className="font-display text-lg text-white">Geneva, CH</p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="flex-1 p-4 border border-gold-DEFAULT/20 text-center"
                >
                  <p className="font-body text-xs text-gold-DEFAULT/60 tracking-widest uppercase mb-2">
                    Craftsmen
                  </p>
                  <p className="font-display text-lg text-white">47 Masters</p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — Visual */}
          <motion.div style={{ x: imageX }} className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <img
                src="/assets/generated/dixm-heritage-watch.dim_800x900.jpg"
                alt="DIXM Craftsmanship"
                className="w-full h-auto"
                style={{ filter: "brightness(0.85) contrast(1.1)" }}
              />

              {/* Brush stroke overlay SVG */}
              <div className="absolute inset-0 pointer-events-none">
                <svg
                  viewBox="0 0 400 500"
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M-20 80 Q100 40 200 70 Q300 100 420 60"
                    stroke="rgba(201,168,76,0.15)"
                    strokeWidth="40"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M-20 420 Q80 440 200 410 Q320 380 420 420"
                    stroke="rgba(201,168,76,0.08)"
                    strokeWidth="50"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
              </div>

              {/* Gold frame lines */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-gold-DEFAULT/50" />
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-gold-DEFAULT/50" />
            </motion.div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <BrushReveal delay={0.0} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
