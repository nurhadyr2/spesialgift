import { useState, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { VAULT_MESSAGE } from "../data/content";

const HOLD_DURATION = 1.4; // seconds to hold before it unlocks

export default function Layer6Vault() {
  const [opened, setOpened] = useState(false);
  const [holding, setHolding] = useState(false);
  const progress = useMotionValue(0);
  const dialRotate = useTransform(progress, [0, 1], [0, 180]);
  const glow = useTransform(progress, [0, 1], [0, 1]);
  const controls = useRef(null);

  const startHold = () => {
    if (opened) return;
    setHolding(true);
    controls.current = animate(progress, 1, {
      duration: HOLD_DURATION,
      ease: "linear",
      onComplete: () => setOpened(true),
    });
  };

  const cancelHold = () => {
    if (opened) return;
    setHolding(false);
    controls.current?.stop();
    animate(progress, 0, { duration: 0.5 });
  };

  return (
    <section className="section">
      <div className="section-inner" style={{ textAlign: "center" }}>
        <p className="eyebrow" style={{ marginBottom: "1rem" }}>Sesuatu untukmu</p>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            marginBottom: "1rem",
          }}
        >
          {opened ? "Terbuka." : "Tekan dan tahan untuk membuka"}
        </h2>
        {!opened && (
          <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "4rem" }}>
            ada sesuatu yang aku simpan di sini, khusus untuk kamu
          </p>
        )}

        {!opened ? (
          <motion.button
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            aria-label="Tahan untuk membuka pesan"
            style={{
              position: "relative",
              width: "min(240px, 60vw)",
              height: "min(240px, 60vw)",
              borderRadius: "50%",
              border: "1px solid var(--line)",
              background: "radial-gradient(circle at 30% 30%, #1c1a17, #0c0b0a)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto",
            }}
          >
            <motion.div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                border: "1px solid var(--gold)",
                opacity: glow,
              }}
            />
            <motion.div
              aria-hidden="true"
              style={{
                width: "62%",
                height: "62%",
                borderRadius: "50%",
                border: "1px solid var(--gold)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                rotate: dialRotate,
              }}
            >
              <div style={{ width: "2px", height: "34%", background: "var(--gold)" }} />
            </motion.div>
            <span
              style={{
                position: "absolute",
                bottom: "-2.4rem",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: "var(--muted)",
                letterSpacing: "0.1em",
              }}
            >
              {holding ? "membuka..." : "tahan di sini"}
            </span>
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: "620px",
              margin: "0 auto",
              padding: "3rem 2.4rem",
              border: "1px solid var(--gold)",
              background: "var(--surface)",
              boxShadow: "0 0 60px -10px rgba(201,162,75,0.25)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                lineHeight: 1.7,
                whiteSpace: "pre-line",
              }}
            >
              {VAULT_MESSAGE}
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
