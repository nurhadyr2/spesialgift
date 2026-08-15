import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { TIMELINE } from "../data/content";

export default function Layer4Timeline() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start 75%", "end 70%"] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 24 });

  return (
    <section ref={sectionRef} className="section" style={{ minHeight: "auto", padding: "14vh 6vw" }}>
      <div className="section-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Perjalanan
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          style={{
            fontFamily: "var(--font-display)",
            textAlign: "center",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            marginBottom: "8vh",
          }}
        >
          Sejauh ini
        </motion.h2>

        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "1px",
              background: "linear-gradient(180deg, var(--gold), var(--line))",
            }}
          />
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "2px",
              background: "linear-gradient(180deg, var(--gold-soft), var(--gold))",
              scaleY: lineProgress,
              transformOrigin: "top",
              boxShadow: "0 0 14px rgba(201,162,75,0.45)",
            }}
          />
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -28 : 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              style={{ position: "relative", paddingBottom: "5rem" }}
            >
              <motion.span
                aria-hidden="true"
                initial={{ scale: 0.45, opacity: 0.35 }}
                whileInView={{ scale: [0.45, 1.45, 1], opacity: 1 }}
                viewport={{ once: false, amount: 0.8 }}
                transition={{ duration: 0.65 }}
                style={{
                  position: "absolute",
                  left: "-2rem",
                  top: "0.35rem",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "var(--gold)",
                  boxShadow: "0 0 12px 2px rgba(201,162,75,0.5)",
                  x: "-50%",
                }}
              />
              <div className="eyebrow" style={{ marginBottom: "0.5rem" }}>{item.date}</div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 500,
                  fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                  marginBottom: "0.5rem",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "var(--muted)", fontSize: "0.95rem", maxWidth: "520px", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
