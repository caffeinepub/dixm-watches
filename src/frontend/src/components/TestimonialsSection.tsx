import { motion, useInView } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

const quotes = [
  {
    text: "DIXM doesn't make watches. They engineer time itself. The Heritage Masterpiece on my wrist is as much sculpture as instrument.",
    author: "Alessandro Ferraro",
    role: "Collector, Milan",
  },
  {
    text: "In forty years of covering haute horlogerie, no watchmaker has moved me quite like DIXM. Their precision is not technical — it is spiritual.",
    author: "Marie-Claire Duchamp",
    role: "Watch Critic, Geneva",
  },
  {
    text: "The Avant-Garde is the most audacious timepiece of the decade. I wear it like armor.",
    author: "James Blackwood",
    role: "Entrepreneur, New York",
  },
];

const pressLogos = [
  { name: "The Hour", style: "font-display" },
  { name: "WatchTime", style: "font-body" },
  { name: "Revolution", style: "font-display" },
  { name: "Hodinkee", style: "font-body" },
  { name: "A Collected Man", style: "font-body" },
];

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  const initParticles = useCallback((width: number, height: number) => {
    return Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      size: Math.random() * 1.5 + 0.3,
      opacity: Math.random() * 0.4 + 0.05,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement?.clientWidth || 800;
    let height = canvas.parentElement?.clientHeight || 600;
    canvas.width = width;
    canvas.height = height;

    let particles = initParticles(width, height);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(render);
    };
    render();

    const handleResize = () => {
      width = canvas.parentElement?.clientWidth || 800;
      height = canvas.parentElement?.clientHeight || 600;
      canvas.width = width;
      canvas.height = height;
      particles = initParticles(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

function QuoteCard({
  quote,
  index,
}: {
  quote: (typeof quotes)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative p-8 md:p-10"
      style={{
        background: "rgba(14,14,18,0.7)",
        border: "1px solid rgba(201,168,76,0.12)",
        backdropFilter: "blur(10px)",
      }}
    >
      {/* Large quote mark */}
      <div
        className="absolute top-4 left-6 font-display text-8xl leading-none gradient-gold-text opacity-20 pointer-events-none select-none"
        aria-hidden
      >
        "
      </div>

      <p className="font-display text-xl md:text-2xl text-white/80 leading-relaxed italic mb-8 relative z-10">
        "{quote.text}"
      </p>

      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-DEFAULT/30 to-gold-muted/30 border border-gold-DEFAULT/40 flex items-center justify-center">
          <span className="font-display text-gold-DEFAULT font-bold text-sm">
            {quote.author[0]}
          </span>
        </div>
        <div>
          <p className="font-body text-sm text-white font-semibold">
            {quote.author}
          </p>
          <p className="font-body text-xs text-gold-DEFAULT/60">{quote.role}</p>
        </div>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gold-DEFAULT/30 transition-all duration-500" />
    </motion.div>
  );
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-28 overflow-hidden"
      style={{ background: "#060608" }}
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
      </div>

      {/* Atmospheric overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.03) 0%, rgba(6,6,8,0.6) 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.5em] text-gold-DEFAULT/60 uppercase mb-4"
          >
            Voices
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white"
          >
            What They <span className="gradient-gold-text">Say</span>
          </motion.h2>
          <div className="section-divider mt-6" />
        </div>

        {/* Quotes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {quotes.map((q, i) => (
            <QuoteCard key={q.author} quote={q} index={i} />
          ))}
        </div>

        {/* Press */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-gold-DEFAULT/10 pt-12"
        >
          <p className="font-body text-xs tracking-[0.4em] text-white/30 uppercase text-center mb-8">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {pressLogos.map((logo, i) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${logo.style} text-lg md:text-xl text-white/25 hover:text-gold-DEFAULT/60 transition-colors duration-300 cursor-default tracking-wider`}
              >
                {logo.name}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
