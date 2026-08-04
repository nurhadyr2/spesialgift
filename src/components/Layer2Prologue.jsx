import { motion } from "framer-motion";
import { PROLOGUE_LINES } from "../data/content";

export default function Layer2Prologue() {
  return (
    <section className="section">
      <div className="section-inner" style={{ textAlign: "center" }}>
        {PROLOGUE_LINES.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: "easeOut" }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 4.5vw, 2.8rem)",
              fontWeight: 400,
              color: i === PROLOGUE_LINES.length - 1 ? "var(--gold-soft)" : "var(--text)",
              fontStyle: i === PROLOGUE_LINES.length - 1 ? "italic" : "normal",
              lineHeight: 1.4,
              marginBottom: "0.4rem",
            }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    </section>
  );
}
