import { motion } from "framer-motion";
import { REASONS } from "../data/content";

export default function Layer5Reasons() {
  return (
    <section className="section" style={{ minHeight: "auto", padding: "16vh 6vw" }}>
      <div className="section-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Kenapa kamu
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            fontFamily: "var(--font-display)",
            textAlign: "center",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            marginBottom: "8vh",
          }}
        >
          Beberapa dari banyak alasan
        </motion.h2>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {REASONS.map((reason, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "1.5rem",
                padding: "1.6rem 0",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--gold)",
                  fontSize: "0.85rem",
                  flexShrink: 0,
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.15rem, 2.6vw, 1.6rem)",
                  fontWeight: 400,
                  lineHeight: 1.5,
                }}
              >
                {reason}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
