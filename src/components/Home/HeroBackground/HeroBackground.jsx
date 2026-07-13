import { motion } from "framer-motion";
import "./HeroBackground.css";

/**
 * Purely decorative background layer for the hero section:
 * animated gradient blobs, floating particles and a subtle grid.
 * Renders behind hero content (z-index handled in CSS) and has
 * no effect on layout, routes or functionality.
 *
 * Particle positions are fixed (not Math.random) so the component
 * stays pure/idempotent across re-renders.
 */
const PARTICLES = [
  { id: 0, left: 6, top: 18, size: 5, duration: 14, delay: 0 },
  { id: 1, left: 14, top: 62, size: 4, duration: 18, delay: 1.2 },
  { id: 2, left: 22, top: 34, size: 6, duration: 12, delay: 2.4 },
  { id: 3, left: 30, top: 82, size: 3, duration: 20, delay: 0.6 },
  { id: 4, left: 38, top: 12, size: 5, duration: 16, delay: 3.1 },
  { id: 5, left: 46, top: 70, size: 4, duration: 22, delay: 1.8 },
  { id: 6, left: 54, top: 26, size: 7, duration: 13, delay: 4.2 },
  { id: 7, left: 62, top: 58, size: 3, duration: 19, delay: 0.3 },
  { id: 8, left: 70, top: 16, size: 5, duration: 15, delay: 2.9 },
  { id: 9, left: 78, top: 76, size: 4, duration: 21, delay: 1.1 },
  { id: 10, left: 86, top: 40, size: 6, duration: 11, delay: 3.7 },
  { id: 11, left: 92, top: 66, size: 3, duration: 17, delay: 0.9 },
  { id: 12, left: 10, top: 46, size: 4, duration: 20, delay: 5.1 },
  { id: 13, left: 58, top: 90, size: 5, duration: 14, delay: 2.2 },
  { id: 14, left: 34, top: 54, size: 3, duration: 16, delay: 4.6 },
  { id: 15, left: 80, top: 92, size: 4, duration: 18, delay: 3.3 },
];

const HeroBackground = () => {

  const particles = PARTICLES;

  return (
    <div className="hero-bg" aria-hidden="true">

      {/* subtle grid */}
      <div className="hero-bg-grid" />

      {/* animated gradient blobs */}
      <motion.div
        className="hero-blob hero-blob-one"
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.08, 0.96, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="hero-blob hero-blob-two"
        animate={{
          x: [0, -35, 25, 0],
          y: [0, 25, -15, 0],
          scale: [1, 0.94, 1.06, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="hero-blob hero-blob-three"
        animate={{
          x: [0, 20, -30, 0],
          y: [0, -20, 15, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="hero-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}

    </div>
  );
};

export default HeroBackground;
