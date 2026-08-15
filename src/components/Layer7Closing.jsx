import { motion } from "framer-motion";
import { HER_NAME, CLOSING_MESSAGE, CLOSING_SIGNATURE, CLOSING_CTA } from "../data/content";
import useScrollDirection from "../hooks/useScrollDirection";

export default function Layer7Closing() {
  const scrollDirection = useScrollDirection();
  const closingWords = CLOSING_MESSAGE.split(" ");
  const sequenceDelay = (rank) => (scrollDirection === "down" ? rank : 5 - rank) * 0.14;

  return (
    <section className="section" style={{ textAlign: "center", overflow: "hidden" }}>
      <div className="section-inner">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: sequenceDelay(0), duration: 0.7 }}
          style={{ marginBottom: "1.5rem" }}
        >
          Penutup
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: sequenceDelay(1) }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3.2rem)",
            lineHeight: 1.4,
            maxWidth: "760px",
            margin: "0 auto",
          }}
        >
          {closingWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{
                delay: sequenceDelay(1) + Math.min((scrollDirection === "down" ? index : closingWords.length - 1 - index) * 0.035, 0.55),
                duration: 0.55,
              }}
              style={{ display: "inline-block", marginRight: "0.25em" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: sequenceDelay(2), duration: 1 }}
          style={{ margin: "2.2rem auto 0", maxWidth: "620px", color: "var(--gold-soft)", fontFamily: "var(--font-display)", fontStyle: "italic", fontSize: "clamp(1.05rem, 2.5vw, 1.35rem)", lineHeight: 1.7 }}
        >
          Di antara begitu banyak kemungkinan, aku tetap bersyukur semesta mempertemukan aku dengan kamu.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: sequenceDelay(3), duration: 1 }}
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
            viewport={{ once: false }}
            transition={{ delay: sequenceDelay(4), duration: 0.8 }}
            whileHover={{ backgroundColor: "var(--gold)", color: "var(--bg)", y: -3 }}
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
          viewport={{ once: false }}
          transition={{ delay: sequenceDelay(5), duration: 1 }}
          style={{ marginTop: "5rem", color: "var(--muted)", fontSize: "0.7rem", letterSpacing: "0.15em" }}
        >
          Nur Hady Ramadhan, Suami dari Masa Depan
        </motion.div>
      </div>
    </section>
  );
}
