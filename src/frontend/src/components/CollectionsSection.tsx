import type { WatchProduct } from "@/backend.d";
import { useActor } from "@/hooks/useActor";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";

const collectionImages: Record<string, string> = {
  Heritage: "/assets/generated/dixm-heritage-watch.dim_800x900.jpg",
  Precision: "/assets/generated/dixm-precision-watch.dim_800x900.jpg",
  "Avant-Garde": "/assets/generated/dixm-avantgarde-watch.dim_800x900.jpg",
};

const collectionDescriptions: Record<string, string> = {
  Heritage:
    "Born from 150 years of watchmaking mastery. Each Heritage piece carries the spirit of DIXM's founding atelier.",
  Precision:
    "Engineered to atomic-clock accuracy. The Precision collection defines the cutting edge of horological science.",
  "Avant-Garde":
    "Where tradition meets tomorrow. Bold architectural forms that challenge every convention of watchmaking.",
};

interface CollectionCardProps {
  title: string;
  product?: WatchProduct;
  index: number;
}

function CollectionCard({ title, product, index }: CollectionCardProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 20;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative overflow-hidden cursor-pointer group"
        style={{
          transformStyle: "preserve-3d",
          background: "rgba(14,14,18,0.9)",
          border: hovered
            ? "1px solid rgba(201,168,76,0.6)"
            : "1px solid rgba(201,168,76,0.15)",
          transition: "border-color 0.3s",
        }}
      >
        {/* Image */}
        <div className="relative h-72 md:h-80 overflow-hidden">
          <motion.img
            src={collectionImages[title] || collectionImages.Heritage}
            alt={`${title} Collection`}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 40%, rgba(14,14,18,0.95) 100%)",
            }}
          />

          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{
              opacity: hovered ? 0.15 : 0,
              background: `linear-gradient(${135 + tilt.y * 2}deg, rgba(255,255,255,0.3) 0%, transparent 60%)`,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Collection badge */}
          <div className="absolute top-4 left-4">
            <span className="font-body text-xs tracking-[0.3em] uppercase text-gold-DEFAULT border border-gold-DEFAULT/40 px-3 py-1 bg-dixm-dark/60 backdrop-blur-sm">
              {title}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display text-2xl font-bold text-white mb-2">
            {title} <span className="gradient-gold-text">Collection</span>
          </h3>

          {product && (
            <p className="font-body text-sm text-gold-DEFAULT/80 mb-2 tracking-wider">
              {product.name}
            </p>
          )}

          <p className="font-body text-sm text-white/50 leading-relaxed mb-4">
            {collectionDescriptions[title]}
          </p>

          {product && (
            <p className="font-display text-xl text-gold-bright mb-4">
              ${product.price.toLocaleString()}
            </p>
          )}

          <motion.div
            className="flex items-center gap-2 text-gold-DEFAULT font-body text-xs tracking-widest uppercase"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <span>Discover</span>
            <ArrowRight size={14} />
          </motion.div>
        </div>

        {/* Bottom gold line */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gold-DEFAULT"
          animate={{ width: hovered ? "100%" : "0%" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

function BrushStroke() {
  return (
    <div className="flex justify-center my-6 pointer-events-none">
      <svg
        viewBox="0 0 400 30"
        className="w-64 md:w-96 opacity-40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 15 Q50 5 100 15 Q150 25 200 15 Q250 5 300 15 Q350 25 390 12"
          stroke="url(#brushGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <defs>
          <linearGradient id="brushGrad" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor="rgba(201,168,76,0)" />
            <stop offset="30%" stopColor="#c9a84c" />
            <stop offset="70%" stopColor="#f0d060" />
            <stop offset="100%" stopColor="rgba(201,168,76,0)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function CollectionsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { actor, isFetching } = useActor();

  const { data: heritageProducts } = useQuery<WatchProduct[]>({
    queryKey: ["products", "Heritage"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCollection("Heritage");
    },
    enabled: !!actor && !isFetching,
  });

  const { data: precisionProducts } = useQuery<WatchProduct[]>({
    queryKey: ["products", "Precision"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCollection("Precision");
    },
    enabled: !!actor && !isFetching,
  });

  const { data: avantGardeProducts } = useQuery<WatchProduct[]>({
    queryKey: ["products", "Avant-Garde"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCollection("Avant-Garde");
    },
    enabled: !!actor && !isFetching,
  });

  const collections = [
    { title: "Heritage", product: heritageProducts?.[0] },
    { title: "Precision", product: precisionProducts?.[0] },
    { title: "Avant-Garde", product: avantGardeProducts?.[0] },
  ];

  return (
    <section
      id="collections"
      ref={ref}
      className="relative py-28 px-6"
      style={{
        background:
          "linear-gradient(180deg, #060608 0%, #080810 30%, #060608 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-[0.03]"
          style={{
            background: "radial-gradient(circle, #c9a84c 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-body text-xs tracking-[0.5em] text-gold-DEFAULT/60 uppercase mb-4"
          >
            Collections
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl md:text-6xl font-bold text-white mb-4"
          >
            Our <span className="gradient-gold-text">Collections</span>
          </motion.h2>

          <BrushStroke />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="font-body text-base text-white/50 max-w-xl mx-auto"
          >
            Three distinct philosophies. One unwavering commitment to
            excellence.
          </motion.p>
        </div>

        {/* Collections grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {collections.map((col, i) => (
            <CollectionCard
              key={col.title}
              title={col.title}
              product={col.product}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
