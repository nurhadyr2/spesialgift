import { motion } from "framer-motion";
import { TIMELINE } from "../data/content";

export default function Layer4Timeline() {
  return (
    <section className="section" style={{ minHeight: "auto", padding: "14vh 6vw" }}>
      <div className="section-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginBottom: "1rem" }}
        >
          Perjalanan
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
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              style={{ position: "relative", paddingBottom: "5rem" }}
            >
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "-2rem",
                  top: "0.35rem",
                  width: "9px",
                  height: "9px",
                  borderRadius: "50%",
                  background: "var(--gold)",
                  boxShadow: "0 0 12px 2px rgba(201,162,75,0.5)",
                  transform: "translateX(-50%)",
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
