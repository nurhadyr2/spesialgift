import { motion } from "framer-motion";
import { HER_NAME, CLOSING_MESSAGE, CLOSING_SIGNATURE, CLOSING_CTA } from "../data/content";

export default function Layer7Closing() {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="section-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ marginBottom: "1.5rem" }}
        >
          Penutup
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
            lineHeight: 1.4,
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {CLOSING_MESSAGE}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 1 }}
          style={{
            marginTop: "2rem",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--muted)",
            letterSpacing: "0.05em",
          }}
        >
          &mdash; {CLOSING_SIGNATURE}, untuk {HER_NAME}
        </motion.p>

        {CLOSING_CTA.href && (
          <motion.a
            href={CLOSING_CTA.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.8 }}
            style={{
              display: "inline-block",
              marginTop: "3rem",
              padding: "0.9rem 2.2rem",
              border: "1px solid var(--gold)",
              color: "var(--gold-soft)",
              textDecoration: "none",
              fontFamily: "var(--font-mono)",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              transition: "background 0.3s, color 0.3s",
            }}
          >
            {CLOSING_CTA.label}
          </motion.a>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 1 }}
          style={{ marginTop: "5rem", color: "var(--muted)", fontSize: "0.7rem", letterSpacing: "0.15em" }}
        >
          Nur Hady Ramadhan, Suami dari Masa Depan
        </motion.div>
      </div>
    </section>
  );
}
