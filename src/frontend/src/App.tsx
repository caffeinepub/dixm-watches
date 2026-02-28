import { Toaster } from "@/components/ui/sonner";
import { useEffect, useRef } from "react";
import { AboutSection } from "./components/AboutSection";
import { CollectionsSection } from "./components/CollectionsSection";
import { ContactSection } from "./components/ContactSection";
import { CraftsmanshipSection } from "./components/CraftsmanshipSection";
import { FeaturedSection } from "./components/FeaturedSection";
import { HeroSection } from "./components/HeroSection";
import { Navbar } from "./components/Navbar";
import { TechnologySection } from "./components/TechnologySection";
import { TestimonialsSection } from "./components/TestimonialsSection";
import { useActor } from "./hooks/useActor";

function SeedDataInitializer() {
  const { actor, isFetching } = useActor();
  const seededRef = useRef(false);

  useEffect(() => {
    if (!actor || isFetching || seededRef.current) return;
    seededRef.current = true;

    // Seed all collections in parallel, suppress errors (data may already exist)
    Promise.all([
      actor.addSeedDataHeritage().catch(() => {}),
      actor.addSeedDataPrecision().catch(() => {}),
      actor.addSeedDataAvantGarde().catch(() => {}),
    ]).catch(() => {});
  }, [actor, isFetching]);

  return null;
}

function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "dixm.watch";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="relative py-12 px-6 border-t border-gold-DEFAULT/10"
      style={{ background: "#060608" }}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <div className="font-display text-2xl font-bold tracking-[0.35em] gradient-gold-text">
          DIXM
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 font-body text-xs text-white/30 tracking-widest">
          {[
            "Collections",
            "Craftsmanship",
            "About",
            "Technology",
            "Contact",
          ].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => {
                const el = document.querySelector(`#${item.toLowerCase()}`);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-gold-DEFAULT transition-colors"
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Attribution */}
        <p className="font-body text-xs text-white/20">
          © {year}. Built with ❤️ using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-DEFAULT/50 hover:text-gold-DEFAULT transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </div>

      {/* Bottom separator */}
      <div className="mt-8 flex justify-center">
        <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold-DEFAULT/20 to-transparent" />
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#060608", color: "#f5f3ef" }}
    >
      <SeedDataInitializer />
      <Navbar />

      <main>
        <HeroSection />
        <CollectionsSection />
        <FeaturedSection />
        <CraftsmanshipSection />
        <AboutSection />
        <TechnologySection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <Footer />

      <Toaster
        theme="dark"
        toastOptions={{
          style: {
            background: "#0e0e12",
            border: "1px solid rgba(201,168,76,0.25)",
            color: "#f5f3ef",
            fontFamily: "Outfit, sans-serif",
          },
        }}
      />
    </div>
  );
}
