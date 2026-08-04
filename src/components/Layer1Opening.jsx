import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HER_NAME, BIRTHDAY_DATE } from "../data/content";

function getTimeLeft() {
  const diff = new Date(BIRTHDAY_DATE).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Layer1Opening({ locked }) {
  const [time, setTime] = useState(getTimeLeft());
  const [curtainOpen, setCurtainOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    const curtainTimer = setTimeout(() => setCurtainOpen(true), 400);
    return () => {
      clearInterval(t);
      clearTimeout(curtainTimer);
    };
  }, []);

  return (
    <section className="section" style={{ overflow: "hidden" }}>
      {/* curtain halves that part on load */}
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: curtainOpen ? "-100%" : 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "50%",
          height: "100%",
          background: "linear-gradient(120deg, #0a0a0a, #1a1210)",
          zIndex: 5,
          borderRight: "1px solid var(--line)",
        }}
      />
      <motion.div
        initial={{ x: 0 }}
        animate={{ x: curtainOpen ? "100%" : 0 }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "50%",
          height: "100%",
          background: "linear-gradient(240deg, #0a0a0a, #1a1210)",
          zIndex: 5,
          borderLeft: "1px solid var(--line)",
        }}
      />

      <div className="section-inner" style={{ textAlign: "center" }}>
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          10 Agustus &middot; Sebuah persembahan
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 1 }}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(2.6rem, 8vw, 6rem)",
            lineHeight: 1.05,
            marginTop: "1rem",
            color: "var(--text)",
          }}
        >
          Untuk <span style={{ fontStyle: "italic", color: "var(--gold-soft)" }}>{HER_NAME}</span>
        </motion.h1>

        {time && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.4, duration: 1 }}
            style={{
              marginTop: "3.5rem",
              display: "flex",
              gap: "clamp(1rem, 4vw, 2.5rem)",
              justifyContent: "center",
              fontFamily: "var(--font-mono)",
            }}
          >
            {[
              ["Hari", time.days],
              ["Jam", time.hours],
              ["Menit", time.minutes],
              ["Detik", time.seconds],
            ].map(([label, value]) => (
              <div key={label} style={{ minWidth: "3.2rem" }}>
                <div style={{ fontSize: "clamp(1.4rem, 4vw, 2.2rem)", color: "var(--gold)" }}>
                  {String(value).padStart(2, "0")}
                </div>
                <div style={{ fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "0.3rem" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          style={{ marginTop: "3.5rem", color: "var(--muted)", fontSize: "0.85rem", letterSpacing: "0.05em" }}
        >
          {locked ? "halaman ini akan terbuka penuh begitu waktunya tiba" : "gulir ke bawah ↓"}
        </motion.p>
      </div>
    </section>
  );
}
