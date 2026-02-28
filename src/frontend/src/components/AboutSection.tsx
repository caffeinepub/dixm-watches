import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

const milestones = [
  {
    year: "1870",
    title: "Founded",
    desc: "Jacques DIXM establishes his atelier in the valleys of Le Brassus, Switzerland.",
  },
  {
    year: "1920",
    title: "The Golden Era",
    desc: "Introduction of the first self-winding movement, revolutionizing the industry.",
  },
  {
    year: "1960",
    title: "Space Age",
    desc: "DIXM Precision becomes the official timekeeper of three Olympic Games.",
  },
  {
    year: "2000",
    title: "Digital Dawn",
    desc: "Launch of the iconic Avant-Garde collection, redefining luxury for a new century.",
  },
  {
    year: "2024",
    title: "DIXM Today",
    desc: "Celebrating 154 years with our most ambitious collection, the DIXM Perpetual.",
  },
];

function CloudCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  const drawCloud = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      radius: number,
      opacity: number,
    ) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, `rgba(201, 168, 76, ${opacity * 0.08})`);
      gradient.addColorStop(0.5, `rgba(30, 20, 10, ${opacity * 0.15})`);
      gradient.addColorStop(1, "rgba(6, 6, 8, 0)");
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.parentElement?.clientHeight || 600;
    canvas.width = width;
    canvas.height = height;

    const clouds = Array.from({ length: 8 }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 120 + Math.random() * 200,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.15,
      opacity: 0.3 + Math.random() * 0.5,
      phase: (i / 8) * Math.PI * 2,
    }));

    let t = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark base
      ctx.fillStyle = "#060608";
      ctx.fillRect(0, 0, width, height);

      // Draw clouds
      for (const cloud of clouds) {
        const pulsedOpacity =
          cloud.opacity * (0.7 + 0.3 * Math.sin(t * 0.01 + cloud.phase));
        drawCloud(ctx, cloud.x, cloud.y, cloud.radius, pulsedOpacity);

        cloud.x += cloud.speedX;
        cloud.y += cloud.speedY;

        if (cloud.x > width + cloud.radius) cloud.x = -cloud.radius;
        if (cloud.x < -cloud.radius) cloud.x = width + cloud.radius;
        if (cloud.y > height + cloud.radius) cloud.y = -cloud.radius;
        if (cloud.y < -cloud.radius) cloud.y = height + cloud.radius;
      }

      // Smoke wisps
      for (let i = 0; i < 5; i++) {
        const x = (width / 5) * i + Math.sin(t * 0.008 + i) * 60;
        const y = height * 0.3 + Math.cos(t * 0.006 + i) * 40;
        const smokeGrad = ctx.createRadialGradient(x, y, 0, x, y, 100);
        smokeGrad.addColorStop(
          0,
          `rgba(201,168,76,${0.03 + 0.02 * Math.sin(t * 0.01 + i)})`,
        );
        smokeGrad.addColorStop(1, "rgba(6,6,8,0)");
        ctx.beginPath();
        ctx.arc(x, y, 100, 0, Math.PI * 2);
        ctx.fillStyle = smokeGrad;
        ctx.fill();
      }

      t++;
      animationRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || 800;
      height = canvas.parentElement?.clientHeight || 600;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [drawCloud]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}

export function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Animated cloud/smoke background */}
      <div className="absolute inset-0 z-0">
        <CloudCanvas />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.5em] text-gold-DEFAULT/60 uppercase mb-4"
          >
            Our Story
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white mb-6"
          >
            About <span className="gradient-gold-text">DIXM</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-body text-lg text-white/50 max-w-2xl mx-auto leading-relaxed"
          >
            For over 150 years, DIXM has stood as a testament to what becomes
            possible when obsession meets mastery. We do not simply make
            watches. We forge instruments of time that outlive their owners,
            passing through generations as heirlooms.
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold-DEFAULT/40 to-transparent origin-top hidden md:block"
          />

          <div className="space-y-12 md:space-y-0">
            {milestones.map((milestone, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.8,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={`
                    relative md:grid md:grid-cols-2 gap-8 items-center
                    ${!isLeft ? "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1" : ""}
                    mb-10 md:mb-0
                  `}
                >
                  {/* Content side */}
                  <div
                    className={`p-6 ${isLeft ? "md:text-right" : "md:text-left"}`}
                  >
                    <div
                      className={`inline-block border border-gold-DEFAULT/30 px-3 py-1 mb-3 ${
                        isLeft ? "md:ml-auto md:block" : ""
                      }`}
                    >
                      <span className="font-display text-gold-DEFAULT text-sm tracking-widest">
                        {milestone.year}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl text-white font-bold mb-2">
                      {milestone.title}
                    </h3>
                    <p className="font-body text-sm text-white/50 leading-relaxed max-w-xs ml-auto">
                      {milestone.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="w-4 h-4 rounded-full border-2 border-gold-DEFAULT bg-dixm-dark shadow-gold-sm"
                    />
                  </div>

                  {/* Empty side */}
                  <div />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
