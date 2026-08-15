import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROLOGUE_LINES } from "../data/content";

function PrologueLine({ line, index, total, progress }) {
  const center = total === 1 ? 0.5 : 0.2 + (index / (total - 1)) * 0.6;
  const opacity = useTransform(progress, [Math.max(0, center - 0.22), center, Math.min(1, center + 0.25)], [0.18, 1, 0.28]);
  const y = useTransform(progress, [Math.max(0, center - 0.22), center, Math.min(1, center + 0.25)], [30, 0, -16]);

  return (
    <motion.p
      style={{
        opacity,
        y,
        fontFamily: "var(--font-display)",
        fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)",
        fontWeight: 400,
        color: index === total - 1 ? "var(--gold-soft)" : "var(--text)",
        fontStyle: index === total - 1 ? "italic" : "normal",
        lineHeight: 1.4,
        marginBottom: "0.4rem",
      }}
    >
      {line}
    </motion.p>
  );
}

export default function Layer2Prologue() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  return (
    <section ref={sectionRef} className="section">
      <div className="section-inner" style={{ textAlign: "center" }}>
        {PROLOGUE_LINES.map((line, i) => (
          <PrologueLine
            key={i}
            line={line}
            index={i}
            total={PROLOGUE_LINES.length}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
